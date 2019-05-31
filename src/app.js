"use strict";

var dom = {
  id: function(id) {
    return document.getElementById(id);
  }
};

var ajaxFunction = function (object) {
  var problemMessage = function (message) {
    console.error(message);
  };
  if (!Array.isArray(object) && typeof object == "object") {
    object.method = object.method || "GET"; // Default Value for method
    object.type = object.type || "text"; // Default Value for type
    if(!object.url) { // Check URL
      delete object.url;
      problemMessage("'url:' is required in the ajaxFunction().");
    }
    if(typeof object.callback !== 'function') { // Check Function
      problemMessage("'callback:' is required in the ajaxFunction().");
    }
    if(object.url && typeof object.callback == 'function') { // Check url and function
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          object.callback(this.response);
        }
      };
      request.open(object.method, object.url);
      request.responseType = object.type;
      request.send();
    }
  } else {
    problemMessage("{} is required in the ajaxFunction().");
  }
}

var randomMachine = function() {
  ajaxFunction({
    method: "GET",
    url: "https://talaikis.com/api/quotes/random/",
    type: "json",
    callback: function (objectQuote) {
      dom.id("quote_message").innerText = objectQuote.quote;
      dom.id("author_name").innerText = objectQuote.author;
      var twitterUrl = 'https://twitter.com/intent/tweet?text="'
      + objectQuote.quote + '" ' + objectQuote.author + '&hashtags=quotes';
      dom.id("twitter").href = twitterUrl;
    }
  });
};

window.onload = function () {
  randomMachine();
  dom.id("new_quote").onclick = randomMachine;
}