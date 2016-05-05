package main

import (
	"fmt"
	"os"
)

func main() {
    fmt.Println("hello world")
    var port = os.Getenv("PORT")
	fmt.Println(port)
	var ipAdd = os.Getenv("IP")
	fmt.Println(ipAdd)
}

