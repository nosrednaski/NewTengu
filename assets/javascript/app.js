$(document).ready(function() {
    $(".results-display").hide();
    $(".topic-results").hide();
    
    
    //########################### Function ###########################################
    function articleAnalyzer(articleToSummarize) {
      var queryUrl = "https://cors-anywhere.herokuapp.com/" + "api.smmry.com/SM_API_KEY=CB55D94259&SM_URL=" + articleToSummarize + "&SM_IGNORE_LENGTH";
      $.ajax({
        type: "GET",
        url: queryUrl,
        success: function(response) {
          $("#summary-output").text(response.sm_api_content);
          $("#article-title").text(response.sm_api_title);
        },
        error: function(response) {
          console.log(`summary Func Error: `+ response);
        }
      });
      //############################# Indico API (Summarize) ################################
      $.ajax({
        type: "POST",
        url: 'https://cors-anywhere.herokuapp.com/'+'https://apiv2.indico.io/summarization',
        data: JSON.stringify({
          'api_key': "4f4722e7847cae008684275f830abf12",
          'data': articleToSummarize,
          'top_n': 10,
          }),
        success: function(res) {
          let summaryObject = JSON.parse(res);
          console.log(summaryObject);
          let summaryDisplay = summaryObject.results.toString();
          summaryDisplay = summaryDisplay.replace(/\.,/g, ". ");
          summaryDisplay = summaryDisplay.replace(/\?,/g, ". ");
          summaryDisplay = summaryDisplay.replace(/Image copyright Getty Images/g,  "");
          $("#summary-output").text(summaryDisplay);   
          
          $("#url-button").on("click", function() {
            window.open(articleToSummarize,  "_blank");
          });
        },
        error: (err) => {
          console.log(err);
        }
      });

      //################################ Aylien API (Summarize/ Title) ##########################
      $.ajax({
        type: "POST",
        url: 'https://cors-anywhere.herokuapp.com/'+'https://api.aylien.com/api/v1/summarize',
        data: JSON.stringify({
          'X-AYLIEN-TextAPI-Application-Key': "541a5c8142013a14cc4dca1084b86c28",
          'data': articleToSummarize,
          "Accept": "application/json" 
          }),
        success: (res) => {
          var sumSomeMore = JSON.parse(res);
          console.log(sumSomeMore);
        },
        error: (err) => {
          console.log('aylien api err'+err);
        }
      });
      
      
    //############################## Indico Political/ Emotional Analysis #####################################

        $.post(
        'https://cors-anywhere.herokuapp.com/'+'https://apiv2.indico.io/emotion/',
        JSON.stringify({
          'api_key': "52ab40ad3535532ada2f2b567ddb900e",
          'data': articleToSummarize,
          'threshold': 0.0
        })
      ).then(function(res) { 
        var emotionObject = JSON.parse(res);
        // console.log(emotionObject);

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
                        duration: 1500,
                        easing: 'in'
                      },
                      'width':500,
                      'height':250,
                      legend: { position: 'none' },
                    };
      var chart = new google.visualization.BarChart($('#emotion-chart')[0]);
      chart.draw(data, options);
    };
      });

      $.post(
        'https://cors-anywhere.herokuapp.com/'+'https://apiv2.indico.io/political',
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
                      duration: 1500,
                      easing: 'in'
                      },
                     'width':600,
                     'height':300,
                      pieHole: 0.4
                    };
      var chart = new google.visualization.PieChart($('#political-chart')[0]);
      chart.draw(data, options);
    };
      
      });
      $("#navigate-to-article").on("click", function(){
        window.open(articleToSummarize, "_blank");
      });
    }; //###### Function
    //###################### Get Initial Articles ################################
    // d3b35953079847e18ee6d70f0c5ef14a, 4d3a091583ce48d58af7bbace180ad59, 0f850f65bd6f43aa9f761a8a12ad55af - api keys
    let newsUrl ="https://cors-anywhere.herokuapp.com/" +
                'https://newsapi.org/v2/top-headlines?country=us&apiKey=0f850f65bd6f43aa9f761a8a12ad55af'
    $.ajax({
      url: newsUrl,
      type: "GET",
      headers: {'Access-Control-Allow-Origin':'*'},
      contentType: "application/json; charset=utf-8",
      success: (result, status, xhr) => {

        console.log(result.articles);
        console.log(status, xhr);
        var resTop = result.articles;
        console.log(result);
        for(var i=0; i < 5; i++) {
          var currentDiv= $("<div>");
          var currentTitle= $("<button>").text(resTop[i].title);
          var currentBrk= $("<br>");
          currentDiv.append(currentTitle);
          currentDiv.append(currentBrk);
          currentTitle.attr("title", resTop[i].title);
          currentTitle.attr("input", resTop[i].url)
          currentTitle.attr("id", "headline-button");
          $("#top-current").prepend(currentDiv);
        }
      },
      error: (xhr, status, error) => {
        console.log("News Api Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
      }
    }),
    
    
    //############################# Topic Search on click ##############################
    $(document).on("click", "#topic-search-button", function() {
      var inputURL=$("input").val();
      $("#textinput").val("");
      $(".current-news").hide(1000);
      $(".topic-results").show(1000);

      var queryTopic = inputURL;

      var queryUrl = 'https://cors-anywhere.herokuapp.com/'+'https://newsapi.org/v2/everything?' +
                'q=' + queryTopic +'&' +
                'sortBy=popularity&pageSize=5&' +
                'apiKey=d3b35953079847e18ee6d70f0c5ef14a';
      
      $.ajax({
        url: queryUrl,
        method: "GET",
      }).then(function(response) {
        console.log(response);

        var results = response.articles;

        for (var i = 0; i < 5; i++) {

          var articleDiv = $("<div>");
          var titleDiv = $("<button>").text(results[i].title);
          var titleBrk = $("<br>");

          articleDiv.append(titleDiv);
          articleDiv.append(titleBrk);
          titleDiv.attr("input", results[i].url);
          titleDiv.attr("title", results[i].title);
          titleDiv.attr("id", "headline-button");      
          
          $("#news-results").prepend(articleDiv);
        };
      });
    });//############ Topic Search
  
  // ################################### Submit URL Button Click #################################
    $(document).on("click", "#submit-url-button", function() {
      $(".hero").hide(500);
      $(".current-news").hide(500);
      $(".topic-results").hide(500);
      $(".results-display").show(1400);
      var articleToSummarize=$("input").val();
      $("#textinput").val("");
      articleAnalyzer(articleToSummarize);
    }); //################## Submit URL button

//############################# Repeat Code for topics buttons (summarize) ###########################
    $(document).on("click", "#headline-button", function() {
      console.log("url clicked");
      $(".hero").hide(500);
      $(".current-news").hide(500);
      $(".topic-results").hide(500);
      $(".news-results").hide(500);
      $(".results-display").show(1000);
      $("#article-title").text($(this).attr("title"));
      var articleToSummarize = $(this).attr("input");
      articleAnalyzer(articleToSummarize);
    });//################ Headline Button End
    
    //################################ RESET ########################
    $("#reset-button").click(function(){
      $(".results-display").hide(500);
      $(".hero").show(1000);
      $(".topic-results").show(1000);
      $(".current-news").show(1000);
    }); //########### reset end

              

  }); //############### On load
