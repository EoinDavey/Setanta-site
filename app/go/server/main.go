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
	qRegexp = regexp.MustCompile(`^/editor/[a-zA-Z0-9-_]+$`)
	tmplt   = template.Must(template.ParseFiles(`editor.html`))
	client  *datastore.Client
)

const projectID = "final-year-project-257911"
const kind = "Script"
const defaultContent = `>-- ###########
>-- # Gaeilge #
>-- ###########

>-- Téigh go dtí https://docs.try-setanta.ie nó cliceáil "Foghlaim" chun Setanta a fhoghlaim

>-- Brúigh ar an cnaipe tosaigh chun an ríomhchlár sampla a tosnú

>-- ###########
>-- # English #
>-- ###########

>-- Go to https://docs.try-setanta.ie or click "Foghlaim" to learn Setanta

>-- Click on the start button to start the example program

Í := íos(fadX@stáitse, fadY@stáitse)*0.9
I := 0.85 * Í

dx := (fadX@stáitse - I)/2
dy := (fadY@stáitse - I)/2

lthd@stáitse(20)

r := I/2

t := [
    [r + r * sin@mata(pi@mata / 3) + dx, r - r * cos@mata(pi@mata / 3) + dy],
    [r - r * sin@mata(pi@mata / 3) + dx, r - r * cos@mata(pi@mata / 3) + dy],
    [r + dx, I + dy]
]
t += [t[0]]

le i idir (1, fad(t)) {
    dfx := t[i][0] - t[i-1][0]
    dfy := t[i][1] - t[i-1][1]
    le j idir (1, 51) {
    	líne@stáitse(t[i-1][0], t[i-1][1], t[i-1][0] + (j/50) * dfx, t[i-1][1] + (j/50) * dfy)
        codladh(10)
	}
}
cruth@stáitse(t)

rngs := [[1/2, 7/6], [11/6, 1/2], [7/6, 11/6]]

dath@stáitse('#651fff')

le i idir (0, 3) {
    le j idir (1, 51) {
		píosaCiorcal@stáitse(t[i][0], t[i][1], r, rngs[i][0]*pi@mata, (rngs[i][0] + (4*j/300))*pi@mata, bréag)
        codladh(10)
    }
}

le i idir (0, Í/2, 2) {
	dath@stáitse('#388E3C')
	ciorcalLán@stáitse(r + dx, r + dy, i)
    dath@stáitse('#651fff')
    le i idir (0, 3)
    	píosaCiorcal@stáitse(t[i][0], t[i][1], r, rngs[i][0]*pi@mata, rngs[i][1]*pi@mata, bréag)
    codladh(1)
}`

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
	} else if path.Clean(r.URL.Path) == `/editor` {
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
