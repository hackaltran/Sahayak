package main

import (
	"flag"
	"github.com/gin-gonic/gin"
	"log"
	"fmt"
	"net/http"
	"encoding/json"


	// "io/ioutil"

	"../models"
	"../dao"
	)

var (
	// flagPort is the open port the application listens on
	flagPort = flag.String("port", "9000", "Port to listen on")
)

var results []string
var gotraining []string
// GetHandler handles the index route
func getQuestionsHandler(c *gin.Context) {
  
}

func getContentHandler(c *gin.Context) {
	
	resp := dao.GetAllContent()
	c.JSON(http.StatusOK, resp)
}

// PostHandler converts post request body to string
func postContentHandler(c *gin.Context) {
	var content models.Content
	_ = json.NewDecoder(c.Request.Body).Decode(&content)
	fmt.Printf("Pradeep 1 : %+v\n",content)

	count := dao.GetTotalDoc();
	content.ContentID = count + 1
	fmt.Printf("Pradeep : %+v\n",content)
	dao.InsertDoc(content)
	var response models.Response

	response.Status = "Success"
	response.StatusCode = 200
	response.DocId = count + 1
	c.JSON(http.StatusOK, response)
	// fmt.Fprint(w, result)

	
}

func init() {
	log.SetFlags(log.Lmicroseconds | log.Lshortfile)
	flag.Parse()
}

func addRoutes(router *gin.RouterGroup){
	router.GET("/questions:Id", getQuestionsHandler)
	router.GET("/content", getContentHandler)
	router.POST("/content", postContentHandler)
}

func main() {
	engine, endpointGrp := newEngine()
	group := endpointGrp.Group("/services")
	addRoutes(group)
	err := engine.Run(fmt.Sprintf(":%s", "9000"))
	if err != nil {
		log.Printf("Fatal: Service failed to start.")
	}

	log.Printf("listening on port %s", *flagPort)
	
}

func newEngine() (*gin.Engine, *gin.RouterGroup) {
	eng := gin.Default()
	endpointGrp := eng.Group("");
	return eng, endpointGrp
}

