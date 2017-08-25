"use strict";

var requestURL = "https://talaikis.com/api/quotes/random/";

var dom = {
  id: function(id) {
    return document.getElementById(id);
  }
};

function getRequest(url, functionName) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      functionName(this.response);
    }
  };
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
}

function randomMachine(objectQuote) {
  dom.id("quote_message").innerText = objectQuote.quote;
  dom.id("author_name").innerText = objectQuote.author;
  var twitterUrl = 'https://twitter.com/intent/tweet?text="'
  + objectQuote.quote + '" ' + objectQuote.author + '&hashtags=quotes';
  dom.id("twitter").href = twitterUrl;
};

var getRequestFunction = function() {
  getRequest(requestURL, randomMachine);
}

window.onload = function () {
  getRequestFunction();
  dom.id("new_quote").onclick = getRequestFunction;
}