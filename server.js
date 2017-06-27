//Dependencies
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var express = require("express");
var exhbs = require("express-handlebars");
//scraping tools
var cheerio = require("cheerio");
var request = require("request");

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise=Promise;

//set port to 3000 or whichever one is used in environment variable
var PORT = process.env.PORT || 3000;

var app = express();

//Set the app up with body-parser and a static folder
app.use(bodyParser.urlencoded({
  extended: false
}));
//serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Simple index route
app.get("/", function(req, res) {
	res.send(index.html);
});

// Listen on PORT
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});