package main

import (
	"cloud.google.com/go/datastore"
	"context"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path"
	"regexp"
)

var (
	qRegexp = regexp.MustCompile(`^/[a-zA-Z0-9-_]+$`)
	tmplt   = template.Must(template.ParseFiles(`templates/index.tmpl`))
	client  *datastore.Client
)

const projectID = "final-year-project-257911"
const kind = "Script"
const defaultContent = `>-- Fáilte go Setanta!

scríobh('Céad Míle Fáilte')

X := fadX@stáitse
Y := fadY@stáitse

x := 0
y := 0

dx := 1
dy := 1

ard := 50

dath@stáitse('dearg')

nuair-a fíor {
    má x + dx + ard > X | x + dx < 0
    	dx = -dx
    má y + dy + ard > Y | y + dy < 0
    	dy = -dy
    x = x + dx
    y = y + dy
    glan@stáitse()
    dron@stáitse(x, y, ard, ard)
  	coladh(1)
}
`

type Entry struct {
	Content string `datastore:",noindex"`
}

func retrieveHandler(w http.ResponseWriter, r *http.Request) {
	if qRegexp.MatchString(r.URL.Path) {
		keyEnc := path.Base(r.URL.Path)
		key, err := datastore.DecodeKey(keyEnc)
		if err != nil {
			http.Error(w, fmt.Sprintf("Ní eochar é %s: %v", keyEnc, err), http.StatusBadRequest)
			return
		}
		entry := &Entry{}
		if err := client.Get(r.Context(), key, entry); err != nil {
			http.Error(w, fmt.Sprintf("Níl aon cód le eochar %s: %v", keyEnc, err), http.StatusNotFound)
			return
		}
		tmplt.Execute(w, entry)
	} else if r.URL.Path == `/` {
		tmplt.Execute(w, Entry{
			Content: defaultContent,
		})
	} else {
		http.Error(w, fmt.Sprintf("Ní thuigtear %s", r.URL.Path), http.StatusBadRequest)
	}
}

func storeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != `/store` || r.Method != "POST" {
		http.Error(w, fmt.Sprintf("Ní thuigtear %s", r.URL.Path), http.StatusBadRequest)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var entry Entry
	if err := decoder.Decode(&entry); err != nil {
		http.Error(w, fmt.Sprintf("Ní thuigtear an achainí: %v", err), http.StatusBadRequest)
		return
	}
	key, err := client.Put(r.Context(), datastore.IncompleteKey(kind, nil), &entry)
	if err != nil {
		http.Error(w, fmt.Sprintf("Ní feidir an cód a shábháil: %v", err), http.StatusBadRequest)
		return
	}
	keyEnc := key.Encode()
	fmt.Fprint(w, keyEnc)
}

func main() {
	var err error
	client, err = datastore.NewClient(context.Background(), projectID)
	if err != nil {
		log.Fatalf("Failed to create datastore client: %v", err)
	}

	http.HandleFunc("/store", storeHandler)
	http.HandleFunc("/", retrieveHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
