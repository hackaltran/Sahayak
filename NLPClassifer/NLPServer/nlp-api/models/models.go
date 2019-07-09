package models

//import "go.mongodb.org/mongo-driver/bson"

type Question struct {
	ID          string `json:"id,omitempty"`
	ContentID   string `json:"contentid,omitempty"`
	Question   string `json:"question,omitempty"`
	Answer    string `json:"answer,omitempty"`
}

type Content struct {
	ID	   string `bson:"_id,omitempty"`
	Data   string `json:"data,omitempty"`
}