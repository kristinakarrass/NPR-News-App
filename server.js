var request = require("request");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var express = require("express");
var exhbs = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();

//Set the app up with body-parser and a static folder
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Simple index route
app.get("/", function(req, res) {
	res.send(index.html);
});