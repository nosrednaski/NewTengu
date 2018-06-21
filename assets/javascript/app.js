$(document).ready(function() {

  var apiTest = "In the recent case by CNN, they made up their own numbers by using a very broad definition of school shooting,” David Katz, CEO of Global Security and a former special agent with the DEA, told Fox News.In the case of all those school shootings, Katz, who says this sort of study produces a false impression through “deceptive inclusion,” notes CNN’s report includes things such as BB guns. And it’s not necessarily the kind of gun violence that the headlines conjure up. According to Katz, the numbers include any shooting “that just happens to be on school property after hours with no real connection to the type of shootings we are all horrified at."

  var queryURL = "https://proxy.api.deepaffects.com/text/generic/apisearch?q=" +
        apiTest + "&api_key=bUzQX7myGQFCTinByXbdoKwq9BpYnRd7";

  $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
        });

});