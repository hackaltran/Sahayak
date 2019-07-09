package main

import (
	"encoding/json"
	"flag"
	"fmt"
	//"io/ioutil"
	"log"
	"net/http"

	"../models"
	"../dao"
	)

var (
	// flagPort is the open port the application listens on
	flagPort = flag.String("port", "9000", "Port to listen on")
)

var results []string

// GetHandler handles the index route
func GetHandler(w http.ResponseWriter, r *http.Request) {
  if len(results) == 0 {
    return 
  }
 	jsonBody, err := json.Marshal(results)
	if err != nil {
		http.Error(w, "Error converting results to json",
			http.StatusInternalServerError)
	}
	w.Write(jsonBody)
}

// PostHandler converts post request body to string
func PostHandler(w http.ResponseWriter, r *http.Request) {
	// if r.Method == "POST" {
	// 	body, err := ioutil.ReadAll(r.Body)
	// 	if err != nil {
	// 		http.Error(w, "Error reading request body",
	// 			http.StatusInternalServerError)
	// 	}
	// 	results = append(results, string(body))

	// 	fmt.Fprint(w, "POST done")
	// } else {
	// 	http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	// }

	var content models.Content
	_ = json.NewDecoder(r.Body).Decode(&content)
	result := dao.InsertOneValue(content)
	//json.NewEncoder(w).Encode(content)
	fmt.Fprint(w, result)
}

func init() {
	log.SetFlags(log.Lmicroseconds | log.Lshortfile)
	flag.Parse()
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", GetHandler)
	mux.HandleFunc("/post", PostHandler)

	log.Printf("listening on port %s", *flagPort)
	log.Fatal(http.ListenAndServe(":"+*flagPort, mux))

	
}