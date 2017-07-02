//dependencies
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var express = require("express");
var router = express.Router();

//import Note and Article models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get("/", function(req, res) {
    res.render("index");
});

//A GET request to scrape the NPR.org website for newsarticles
router.get("/scrape", function(req, res) {
	//First, we grab the body of the html with request
    request("http://www.npr.org/sections/news/", function(error, response, html) {
    	//Then we load it into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        var num = 0;
        //array to hold articles and send them back to browser
        var articles = [];
        //Grab every item.has-image and get their title, link, teaser text and image link
        $(".item.has-image").each(function(i, element) {
            num = (i);
        	//save and empty result object
        	var result = {};
            //add selected information for each article as properties of the results object
            result.title = $(this).children(".item-info").find("h2.title").text();
            result.link = $(this).children(".item-info").find("h2.title").find("a").attr("href");
            result.teaser = $(this).children(".item-info").find("p.teaser").text();
            result.imgLink = $(this).children(".item-image").find("a").find("img").attr("src");
            //if we get valid result push object into array
            if (result.title && result.link && result.teaser && result.imgLink) {
                articles.push(result);
            }
        });
        var hbsObject = {article:articles, num: num};
        //redirect to articles page and display results
        res.render("index", hbsObject);
    });

});

//route to save an article
router.post("/save", function(req, res){
    var newArticle = new Article(req.body);
    newArticle.save(function(error, doc){
        if (error) {
            console.log(error);
        } else {
            res.send("Article has been saved");
        }
    })
});

//route to display articles
// This will get the articles we scraped from the mongoDB
router.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // console.log(doc);
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      var hbsObject = {
        savedArticle: doc
      };
      res.render("saved", hbsObject);
    }
  });
});

router.delete("/delete/:id", function(req, res) {
    Article.findByIdAndRemove(req.params.id, function(error, doc) {
        if (error) {
            console.log(error);
        }
        else {

        }
    });
});

//add a note to an article
router.post("/articles/:id", function(req, res) {
    console.log(req.body);
    //create a new note and pass the req.body to the entry
    var newNote = new Note(req.body);
    newNote.save(function(error, doc) {
        if (error) {
            console.log(error);
        }
        else {
            //use the article id to find and update it's note
            Article.findOneAndUpdate({ "_id" : req.params.id }, {"note": doc._id })
            //execute the above entry
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(doc);
                }
            });
        }
    });
});

//route to get note for specific article
router.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id})
    .populate("notes")
    .exec(function(error, doc) {
       if(error) {
        console.log(error);
       }
       else {
        res.json(doc);
       }
    });
});


//route to save notes
//route to delete notes
//route to delete articles?
module.exports = router;