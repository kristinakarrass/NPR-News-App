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
        $("#noteModal").modal("open");
        var id = $(this).data("id");
        $("#saveNote").attr("data-id", id);
        $("#deleteNote").attr("data-id", id);
        $.ajax({
            method: "GET",
            url: "/articles/" + id
        }).done(function(data) {
            console.log(data);
            if (!data.note) {
                $("#noteContent").append("<p>There are no saved notes for this article.</p>");
            } else {
                $("#noteContent").val("");
                for (var i = 0; i < data.length; i++) {
                    $("#noteContent").append("<p>Note " + i + ":\n" + data.note + "</p><br><hr/>");
                }
            }
        });
    });
    
    //save note of specific article
    $(document).on("click", "#saveNote", function() {
        event.preventDefault();
        var id = $(this).data("id");
        var note = $(".materialize-textarea").val().trim();

        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
                note: note
            }
        });
    });


});
