$(document).ready(function(){

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
$(document).on("click", "#delete", function() {
	var id = $(this).data("id");
	console.log(id);
	$.ajax({
		method: "Delete",
		url: "/delete/" + id
	});
	location.href = "/articles";
});

});


