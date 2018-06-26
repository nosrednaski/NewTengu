$(document).ready(function() {
    $(".resultsDisplay").hide();
    $(".topicResults").hide();
    // $(".hero").hide(1000);
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

    //google API for current news onLoad/
    
    var currentNewsAPI = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=d3b35953079847e18ee6d70f0c5ef14a'
    $.ajax({
      url: currentNewsAPI,
      method: "GET",
    }).then(function(data) {
      console.log("current news" + data);
      var resTop = data.articles;

      for(var i=0; i < 5; i++) {
        var currentDiv= $("<div>");
        var currentTitle= $("<button>").text(resTop[i].title);
        var currentBrk= $("<br>");
        currentDiv.append(currentTitle);
        currentDiv.append(currentBrk);
        currentTitle.attr("input", resTop[i].url)
        currentTitle.attr("id", "URL");
        console.log("displayed current" + currentDiv);
        $("#topCurrent").prepend(currentDiv);
        //I want each of the current news to be a link, but it somehow runs through the url
        //summary and emotion stuff when you click it.
      }
    })
    
    //********************topic search on click******************* */
    $(document).on("click", "#topicSearch", function() {
      var inputURL=$("input").val();
      $(".currentNews").hide(1000);
      $(".topicResults").show(1000);

      var queryTopic = inputURL;

      var queryUrl = 'https://newsapi.org/v2/everything?' +
                'q=' + queryTopic +'&' +
                'sortBy=popularity&' +
                'apiKey=d3b35953079847e18ee6d70f0c5ef14a';
      
      $.ajax({
        url: queryUrl,
        method: "GET",
      }).then(function(response) {
        console.log(response);

        var results = response.articles;

        for (var i = 0; i < 10; i++) {
          //this needs to be cleaned up some.
          //probably use similar code to above to turn titles to links, that go through the url button
          var articleDiv = $("<div>");
          var titleDiv = $("<button>").text(results[i].title);
          var titleBrk = $("<br");

          articleDiv.append(titleDiv);
          articleDiv.append(titleBrk);
          titleDiv.attr("input", results[i].url);
          titleDiv.attr("id", "URL");      
          
          console.log("display" + articleDiv);
          $("#topResults").prepend(articleDiv);
        }
      });
    });
  
      //summarizer, searcher button isn't working
    $(document).on("click", "#searcher", function() {
      console.log("url clicked");
      $(".hero").hide(1000);
      $(".currentNews").hide(1000);
      $(".resultsDisplay").show(1000);
      var articleToSummarize=$("input").val();
      /*var queryUrl = "https://cors-anywhere.herokuapp.com/" + "api.smmry.com/SM_API_KEY=CB55D94259&SM_URL=" + articleToSummarize + "&SM_IGNORE_LENGTH";
 
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

      $("#URL").on("click", function() {
        window.open(articleToSummarize,  "_blank");
      })
    })
*/
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
          'threshold': 0.0
        })
      ).then(function(res) { 
        console.log(res);
        var emotionObject = JSON.parse(res);
        console.log(emotionObject);

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
      var data = new google.visualization.arrayToDataTable([
        ['Emotion', 'Percent', { role: 'style' }],
        ['Anger', Number(emotionObject.results.anger.toFixed(2)*100), 'color: red; opacity: 0.7'],
        ['Joy', Number(emotionObject.results.joy.toFixed(2)*100), 'color: yellow; opacity: 0.7'],
        ['Fear', Number(emotionObject.results.fear.toFixed(2)*100), 'color: black; opacity: 0.7'], 
        ['Sadness', Number(emotionObject.results.sadness.toFixed(2)*100), 'color: blue; opacity: 0.7'],
        ['Surprise', Number(emotionObject.results.surprise.toFixed(2)*100), 'color: purple; opacity: 0.7']
      ]);
      var options = {
                      animation: {
                        startup: true,
                        duration: 1000,
                        easing: 'in'
                      },
                      chart: {
                        'width':500,
                        'height':400, 
                      }
                    };
      var chart = new google.visualization.BarChart($('#emotion-chart')[0]);
      chart.draw(data, options);
    };
      });

    //obtains political output for article input

      $.post(
        'https://apiv2.indico.io/political',
        JSON.stringify({
          'api_key': "4f4722e7847cae008684275f830abf12",
          'data': articleToSummarize,
          'threshold': 0.0
        })
      ).then(function(res2) { 
        console.log(res2);
        var politicalObject = JSON.parse(res2);
        console.log(politicalObject);

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
      var data = new google.visualization.arrayToDataTable([
        ['Politcal Affiliation', 'Percent', {role: 'style'}],
        ['Liberal', Number(politicalObject.results.Liberal.toFixed(2)*100), 'color: blue; opacity: 0.7'],
        ['Conservative', Number(politicalObject.results.Conservative.toFixed(2)*100), 'color: red; opacity: 0.7'],
        ['Libertarian', Number(politicalObject.results.Libertarian.toFixed(2)*100), 'color: yellow; opacity: 0.7'], 
        ['Green', Number(politicalObject.results.Green.toFixed(2)*100), 'color: green; opacity: 0.7'],
      ]);
      var options = {
                      animation: {
                      startup: true,
                      duration: 1000,
                      easing: 'in'
                      },
                     'width':400,
                     'height':300};
      var chart = new google.visualization.BarChart($('#political-chart')[0]);
      chart.draw(data, options);
    };
      
      });
    });
 

     //************************** Data Display *************************
      
      
   
  });
