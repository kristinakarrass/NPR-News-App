//Grab articles as a json
$.getJSON("/articles", function(data) {
 res.send(data);
})