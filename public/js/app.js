$(document).ready(function(){

// $("#scrape").on("click", function() {
// 	event.preventDefault();
//     location.href = "/scrape";
// });

//save an article
$(document).on("click", "#save", function(){
        $.ajax({
            method: "POST",
            url: "/save",
            data: {
                title: $(this).data("title"),
                link: $(this).data("link"),
                teaser: $(this).data("teaser"),
                imgLink: $(this).data("imglink")
            }
        })
    });

// $(document).on("click", "#savedArticles", function() {
// 	event.preventDefault();
// 	location.href = "/articles";
// });

});


