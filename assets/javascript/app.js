$(document).ready(function() {
    $(".resultsDisplay").hide();

    var modal = document.querySelector(".modal");
    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".modal-close");

    function toggleModal() {
      modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
      if (event.target === modal) {
        toggleModal();
      }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);



    //********************SMMRY API on click******************* */
    $(document).on("click", "#searcher", function() {
      var inputURL=$("input").val();
      //$(".hero").hide(1000);
      //$(".resultsDisplay").show(1000);
      var articleToSummarize = inputURL;

      var queryUrl = 'https://newsapi.org/v2/everything?' +
                'q=' + articleToSummarize +'&' +
                'sortBy=popularity&' +
                'apiKey=d3b35953079847e18ee6d70f0c5ef14a';
      
      $.ajax({
        url: queryUrl,
        method: "GET",
      }).then(function(response) {
        console.log(response);

        var results = response.articles;

        for (var i = 0; i < 10; i++) {
          var articleDiv = $("<div>");
          var titleDiv = $("<p>").text(results[i].title);
          var descriptionDiv = $("<p>").text(results[i].description);
          var urlDiv = $("<p>").text(results[i].url);

          articleDiv.append(titleDiv);
          articleDiv.append(descriptionDiv);
          articleDiv.append(urlDiv);

          console.log(articleDiv);
          $("#articles").prepend(articleDiv);
        }
      })
      
      $("#URL").on("click", function() {
        window.open(articleToSummarize,  "_blank");
      })
      

      $.post(
        'https://apiv2.indico.io/summarization',
        JSON.stringify({
          'api_key': "4f4722e7847cae008684275f830abf12",
          'data': articleToSummarize,
          'top_n': 10,
        })
      ).then(function(res1) { 
        console.log(res1) ;
        var summaryObject = JSON.parse(res1);
        console.log(summaryObject);
        $("#summary-output").text(summaryObject.results);     
      });

    //***************Indico API************************ */

    // Obtains sentiment output for article input

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
        
        $("#first-output").text(emotionObject.results.anger.toFixed(2));
        $("#second-output").text(emotionObject.results.joy.toFixed(2));
        $("#third-output").text(emotionObject.results.fear.toFixed(2));
        $("#fourth-output").text(emotionObject.results.sadness.toFixed(2));
        $("#fifth-output").text(emotionObject.results.surprise.toFixed(2));
      });

    //obtains political output for article input

      $.post(
        'https://apiv2.indico.io/political',
        JSON.stringify({
          'api_key': "4f4722e7847cae008684275f830abf12",
          'data': articleToSummarize,
          'threshold': 0.25
        })
      ).then(function(res2) { 
        console.log(res2);
        var politicalObject = JSON.parse(res2);
        console.log(politicalObject);
        $("#liberal-output").text(politicalObject.results.Liberal.toFixed(2));
        $("#conservative-output").text(politicalObject.results.Conservative.toFixed(2));
        $("#libertarian-output").text(politicalObject.results.Libertarian.toFixed(2));
        $("#green-output").text(politicalObject.results.Green.toFixed(2));
      
      });
    });
  });


    //************************** Display *************************
