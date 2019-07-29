package main

import (
	"flag"
	"github.com/gin-gonic/gin"
	"log"
	"fmt"
	"net/http"
	"encoding/json"
        "os/exec"
        "strings"
        "os"
        "bufio"
        "github.com/gin-contrib/cors"
        "strconv"



	// "io/ioutil"

	"../models"
	"../dao"
	)

var (
	// flagPort is the open port the application listens on
	flagPort = flag.String("port", "8000", "Port to listen on")
)

var results []string
var gotraining []string
// GetHandler handles the index route
func getQuestionsHandler(c *gin.Context) {
    docId := c.Param("docId")
    i1, err := strconv.Atoi(docId)
    if err == nil {
        fmt.Println(i1)
    }
    resp :=dao.GetDoc(i1) 
    c.JSON(http.StatusOK, resp)
}

func getContentHandler(c *gin.Context) {

	resp := dao.GetAllContent()
	c.JSON(http.StatusOK, resp)
}

func arrayToString(a []string, delim string) string {
    return strings.Trim(strings.Replace(fmt.Sprint(a), " ", delim, -1), "[]")
    //return strings.Trim(strings.Join(strings.Split(fmt.Sprint(a), " "), delim), "[]")
    //return strings.Trim(strings.Join(strings.Fields(fmt.Sprint(a)), delim), "[]")
}

func readLines(path string) ([]string, error) {
    file, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    var lines []string
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }
    return lines, scanner.Err()
}

func replaceAbusiveQuestions(Questions []models.Quest)([]models.Quest){

    NewQuestions := []models.Quest{}
    keywords, _ :=  readLines("./abusive.txt")
    for _, line := range keywords {
        fmt.Println(line)
    }
    isKeywordContain := false
    for _,quest := range Questions{
        isKeywordContain = false
        //     fmt.Println("1--------------1",quest)
        for _, key := range keywords {
            if strings.Contains(quest.Question, key) || strings.Contains(quest.Answer, key){
                isKeywordContain = true
                //                    fmt.Println("22contains--------------2\n",key)
                continue
            }
        }
        if !isKeywordContain {

            NewQuestions = append(NewQuestions,quest)
        }
    }

    return NewQuestions
}

// PostHandler converts post request body to string
func postContentHandler(c *gin.Context) {
	var content models.Content
	_ = json.NewDecoder(c.Request.Body).Decode(&content)

	count := dao.GetTotalDoc();
	content.ContentID = count + 1


        command := fmt.Sprintf("python3 /home/pradeep/scripts/conversion.py '%s' | python3 /home/pradeep/scripts/generate_questions.py", content.ContentData)
        fmt.Println(command)
        out, err := exec.Command("bash","-c",command).Output();
        if err != nil {
            fmt.Println(err)
        }

        lineSeperatedQuestn := strings.Split(string(out),"newline")


        questnArray := []models.Quest{}
        for _,element := range lineSeperatedQuestn{
            fmt.Println(element)
            var quest models.Quest
            fmt.Println(element)        
            newtext := strings.Split(element, "pradeep")
            if len(newtext) > 0 {
                quest.Question = newtext[0]
            }
            if len(newtext) > 1{

                quest.Answer = newtext[1]
            }
            if len(newtext) > 2 {

                quest.Confidence = newtext[2]

                s, _ := strconv.Atoi(string(quest.Confidence[2]))
                fmt.Println("Pradeep float: ",string(quest.Confidence[2])) // 3.14159265
                //fmt.Println("Pradeep float:",s) // 3.14159265
                                
                if s <= 3 {
                       fmt.Println("11")
                }
            }
            /*for _, abc := range newtext{
                quest.

                fmt.Println("\n",abc)        
            }*/
            questnArray = append(questnArray,quest)
        }

        questnArray = replaceAbusiveQuestions(questnArray)

        resp, err := json.Marshal(questnArray)
        if err != nil {
            log.Fatal("Cannot encode to JSON ", err)
        }
        fmt.Fprintf(os.Stdout, "Pradeep  json questions :%s", resp)



       // resp := arrayToString(lineSeperatedQuestn, "\n\n")


        content.Questions =  questnArray



	fmt.Printf("Pradeep : %+v\n\n",content)
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
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"*"},
        AllowHeaders:     []string{"*"},
        ExposeHeaders:    []string{"*"},
    //    AllowCredentials: true,
      //  AllowOriginFunc: func(origin string) bool {
        //    return origin == "https://github.com"
        //},
        //MaxAge: 12 * time.Hour,
    }))
    router.GET("/questions/:docId", getQuestionsHandler)
	router.GET("/content", getContentHandler)
	router.POST("/content", postContentHandler)
}

func main() {
	engine, endpointGrp := newEngine()
	group := endpointGrp.Group("/services")
	addRoutes(group)
	err := engine.Run(fmt.Sprintf(":%s", "8000"))
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

