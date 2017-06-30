//Dependencies
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
//scraping tools
var cheerio = require("cheerio");
var request = require("request");

//require Article and Note models
var Article = require("./models/Article.js");
var Note = require("./models/Note.js");

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//set port to 3000 or whichever one is used in environment variable
var PORT = process.env.PORT || 3000;

//set up express
var app = express();

//Set the app up with body-parser and a static folder
app.use(bodyParser.urlencoded({
    extended: false
}));
//serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

//handlebars setup as view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Database configuration with mongoose
mongoose.connect("mongodb://localhost/NPRarticles");
var db = mongoose.connection;

//Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

//Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//Routes -- put them in a different folder and require them here
//=======================================================================================

//A GET request to scrape the NPR.org website for newsarticles
app.get("/scrape", function(req, res) {
	//First, we grab the body of the html with request
    request("http://www.npr.org/sections/news/", function(error, response, html) {
    	//Then we load it into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        //Grab every item.has-image and get their title, link, teaser text and image link
        $(".item.has-image").each(function(i, element) {
        	//save and empty result object
        	var result = {};
            //add selected information for each article as properties of the results object
            result.title = $(this).children(".item-info").find("h2.title").text();
            result.link = $(this).children(".item-info").find("h2.title").find("a").attr("href");
            result.teaser = $(this).children(".item-info").find("p.teaser").text();
            result.imgLink = $(this).children(".item-image").find("a").find("img").attr("src");
            //using our Article model, cerate a new entry
            //this passes the result object to the entry
            var entry = new Article(result);
            //save that entry to the db
            entry.save(function(err, doc) {
            	//log any errors
            	if (err) {
            		console.log(err);
            	}
            	//or log the doc
            	else {
                    // Materialize.toast(message, displayLength, className, completeCallback);
                    Materialize.toast('Your articles have been scraped!', 4000) // 4000 is the duration of the toast
            	}
            });
        });
    });
    //tell user scrape is completed
    res.redirect("/"); //make this a modal with handlebars and send it to HTML
});

//route to display articles
// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

//route to save articles
//route to save notes
//route to delete notes
//route to delete articles?

// Listen on PORT
app.listen(PORT, function() {
    console.log("App running on port 3000!");
});
