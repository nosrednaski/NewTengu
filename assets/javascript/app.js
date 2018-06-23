$(document).ready(function() {
    $(".resultsDisplay").hide();

    //********************SMMRY API on click******************* */
    $(document).on("click", "#searcher", function() {
      var inputURL=$("input").val();
      $(".hero").hide(1000);
      $(".resultsDisplay").show(1000);
      var articleToSummarize = inputURL;
      var queryUrl = "https://cors-anywhere.herokuapp.com/" + "api.smmry.com/SM_API_KEY=CB55D94259&SM_URL=" + articleToSummarize + "&SM_IGNORE_LENGTH";
 
      $.ajax({
        url: queryUrl,
        method: "GET",
 
      }).then(function(response) {
        console.log(response);
        var sumDiv = $("<div>");
        var results = response.data;
        var p = $("<p>").text(response.sm_api_content);
        sumDiv.append(p);
        $("#summary-output").append(sumDiv);
      });
    //***************Indico API************************ */
    // batch example
      $.post(
        'https://apiv2.indico.io/emotion/',
        JSON.stringify({
          'api_key': "52ab40ad3535532ada2f2b567ddb900e",
          'data': articleToSummarize,
          'threshold': 0.1
        })
      ).then(function(res) { 
        console.log(res);
        var emotionObject = JSON.parse(res);
        console.log(emotionObject);
        
        $("#first-output").text(emotionObject.results.anger);
        $("#second-output").text(emotionObject.results.joy);
        $("#third-output").text(emotionObject.results.fear);
        $("#fourth-output").text(emotionObject.results.sadness);
        $("#fifth-output").text(emotionObject.results.surprise);
      });
    });



    //************************** Display *************************

});
