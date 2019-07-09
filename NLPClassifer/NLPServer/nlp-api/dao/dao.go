package dao

import (
	"context"
	"fmt"
	"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
   // "go.mongodb.org/mongo-driver/bson"
   
   "../models"
)

// CONNECTIONSTRING DB connection string
const CONNECTIONSTRING = "mongodb://localhost:27017"

// DBNAME Database name
const DBNAME = "questionbank"

// COLLNAME Collection name
const COLLNAME = "data"

var db *mongo.Database

// Connect establish a connection to database
func init() {
	client, err := mongo.NewClient(options.Client().ApplyURI(CONNECTIONSTRING))
	if err != nil {
		log.Fatal(err)
	}
	err = client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	// Collection types can be used to access the database
	db = client.Database(DBNAME)
}

// InsertOneValue inserts one item from Person model
func InsertOneValue(content models.Content) (interface {}) {
	//fmt.Println(content)
	insertResult, err := db.Collection(COLLNAME).InsertOne(context.Background(), content)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document: ", insertResult.InsertedID)
	return insertResult.InsertedID

}

// InsertManyValues inserts many items from byte slice
func InsertManyValues(content []models.Content) {
	var ppl []interface{}
	for _, p := range content {
		ppl = append(ppl, p)
	}
	_, err := db.Collection(COLLNAME).InsertMany(context.Background(), ppl)
	if err != nil {
		log.Fatal(err)
	}
}