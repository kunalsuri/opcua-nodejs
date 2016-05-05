package main

import (
	"io"
	"net/http"
	"os"
	"fmt"
)

func hello(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Hello world!")
}

func main() {
    var port = os.Getenv("PORT")
	fmt.Println(port)
	http.HandleFunc("/", hello)
	http.ListenAndServe(port, nil)
}