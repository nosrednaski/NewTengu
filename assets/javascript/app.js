$(document).ready(function() {
    $(document).on("click", "#searcher", function() {
    var inputURL=$("input").val();
    console.log(inputURL);

    var articleToSummarize = inputURL;
    var queryUrl = "https://cors-anywhere.herokuapp.com/" + "api.smmry.com/SM_API_KEY=CB55D94259&SM_URL=" + articleToSummarize + "&SM_IGNORE_LENGTH&SM_WITH_BREAK";
 
    $.ajax({
        url: queryUrl,
        method: "GET",
 
    }).then(function(response) {
        console.log(response);
        var sumDiv = $("<div>");
        var results = response.data;
        var p = $("<p>").text(response.sm_api_content);
        sumDiv.append(p);
        $("#AIOutput").append(sumDiv);
    });
    });

});
