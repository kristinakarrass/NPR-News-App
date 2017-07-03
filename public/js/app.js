$(document).ready(function() {
    $('.parallax').parallax();
    //save an article
    $(document).on("click", "#save", function() {
        $.ajax({
            method: "POST",
            url: "/save",
            data: {
                title: $(this).data("title"),
                link: $(this).data("link"),
                teaser: $(this).data("teaser"),
                imgLink: $(this).data("imglink")
            }
        });
    });

    //delete an article
    $(document).on("click", "#delete", function() {
        var id = $(this).data("id");
        console.log(id);
        $.ajax({
            method: "Delete",
            url: "/delete/" + id
        });
        location.href = "/articles";
    });


    //view notes of specific article
    // $(document).on("click", "#note", function() {
    //     var id = $(this).data("id");
    //     $("#saveNote").attr("data-id", id);
    //     $("#deleteNote").attr("data-id", id);
    //     $.ajax({
    //         method: "GET",
    //         url: "/articles/" + id
    //     })
    //     .done(function(data) {
    //     	console.log(data);
    //     });
    // });
    
    //save note of specific article
    $(document).on("click", "#saveNote", function() {
        event.preventDefault();
        var id = $(this).data("id");
         var baseURL = window.location.origin;
        var note = $(".materialize-textarea").val().trim();
        var title = $("#noteTitle").val().trim();

        $.ajax({
            method: "POST",
            url: baseURL + "/articles/" + id,
            data: {
            	title: title,
                body: note
            }
        }).done(function() {
        $(".materialize-textarea").val("");
        $("#noteTitle").val(""); 
        });
       
    });

    //delete note from article
    $(document).on("click", "#deleteNote", function() {
    	event.preventDefault();
    	var id = $(this).data("id");
    	var baseURL = window.location.origin;
    	console.log(id);
    	$.ajax({
    		method: "DELETE",
    		url: baseURL + "/delete/notes/" + id
    	});
    });

});
