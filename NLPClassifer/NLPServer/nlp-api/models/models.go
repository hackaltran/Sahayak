package models

import (
	"io"
)

//import "go.mongodb.org/mongo-driver/bson"

// type Question struct {
// 	ID          string `json:"id,omitempty"`
// 	ContentID   string `json:"contentid,omitempty"`
// 	Question   string `json:"question,omitempty"`
// 	Answer    string `json:"answer,omitempty"`
// };

type Content struct {
	ContentData string 
	ContentID int 
	Subject string
        Questions []Quest
}

type Quest struct {
        Question string
        Confidence string
        Answer string

}

type Response struct {
	Status	   		string 
	StatusCode		int 
	DocId       	int
}

//JSONReader -
type JSONReader struct {
	JsonFile io.Reader
}
