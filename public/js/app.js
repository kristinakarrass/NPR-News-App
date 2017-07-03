$(document).ready(function() {

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
    $(document).on("click", "#note", function() {
    	//open modal to add note
        $("#noteModal").modal("open");
        //empty content
        $("#noteContent").val("");
        var id = $(this).data("id");
        $("#saveNote").attr("data-id", id);
        $("#deleteNote").attr("data-id", id);
        $.ajax({
            method: "GET",
            url: "/articles/" + id
        }).done(function(data) {
        	console.log(data);
            if (!data) {
                $("#noteContent").append("<p>There are no saved notes for this article.</p>");
            } else {
                $("#noteContent").val("");
                $("#noteContent").append("<p>Title: " + data.title + "<br>Note: " + data.body + "</p><br><hr/>");
            }
        });
    });
    
    //save note of specific article
    $(document).on("click", "#saveNote", function() {
        event.preventDefault();
        var id = $(this).data("id");
        var note = $(".materialize-textarea").val().trim();
        var title = $("#noteTitle").val().trim();

        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
            	title: title,
                body: note
            }
        });
        $(".materialize-textarea").val("");
        $("#noteTitle").val("");        
    });


});
