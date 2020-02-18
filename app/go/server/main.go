package main

import (
	"context"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path"
	"regexp"
)

var (
	ctx     context.Context
	qRegexp = regexp.MustCompile(`^/[a-zA-Z0-9]+$`)
	tmplt   = template.Must(template.ParseFiles(`templates/index.tmpl`))
)

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
	Content string
}

func retrieveHandler(w http.ResponseWriter, r *http.Request) {
	if qRegexp.MatchString(r.URL.Path) {
		tmplt.Execute(w, Entry{
			Content: path.Base(r.URL.Path),
		})
	} else if r.URL.Path == `/` {
		tmplt.Execute(w, Entry{
			Content: defaultContent,
		})
	} else {
		http.Error(w, fmt.Sprintf("Ní thuigtear %s", r.URL.Path), http.StatusBadRequest)
	}
}

func main() {
	http.HandleFunc("/", retrieveHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
