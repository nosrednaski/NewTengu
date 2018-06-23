$(document).ready(function() {
    $(".resultsDisplay").hide();

    //********************SMMRY API on click******************* */
    $(document).on("click", "#searcher", function() {
      var inputURL=$("input").val();
      console.log(inputURL);
      $(".hero").hide(1000);
      $(".resultsDisplay").show(1000);
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

    //***************Indico API************************ */
    // batch example
      $.post(
        'https://apiv2.indico.io/emotion/batch',
        JSON.stringify({
          'api_key': "52ab40ad3535532ada2f2b567ddb900e",
          'data': ["I did it. I got into Grad School. Not just any program, but a GREAT program. :-)", "Like seriously my life is bleak, I have been unemployed for almost a year."],
          'threshold': 0.1
        })
      ).then(function(res) { console.log(res) });

    // batch example
      $.post(
       'https://apiv2.indico.io/political/batch',
       JSON.stringify({
         'api_key': "52ab40ad3535532ada2f2b567ddb900e",
         'data': [
           "I have a constitutional right to bear arms!",
           "I wish more candidates cared about the environment."
         ],
         'threshold': 0.25
        })
       ).then(function(res) { console.log(res) });



    //************************** Display *************************

});
