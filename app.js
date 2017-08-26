"use strict";

var dom = {
  id: function(id) {
    return document.getElementById(id);
  }
};

function ajaxFunction() {
  var args = Array.prototype.slice.call(arguments);
  var problemMessage = function (message) {
    console.error(message);
  };
  args = args[0];
  if (!Array.isArray(args) && typeof args == "object") {
    args.method = args.method || "GET"; // Default Value for method
    args.type = args.type || "text"; // Default Value for type
    if(!args.url) { // Check URL
      problemMessage("'url:' is required in the ajaxFunction().");
    }
    if(typeof args.callback !== 'function') { // Check Function
      problemMessage("'callback:' is required in the ajaxFunction().");
    }
    if(args.url && typeof args.callback == 'function') { // Check url and function
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          args.callback(this.response);
        }
      };
      request.open(args.method, args.url);
      request.responseType = args.type;
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