"use strict";

var dom = {
  id: function(id) {
    return document.getElementById(id);
  }
};

function makeRequest() {
  var requestURL = "https://talaikis.com/api/quotes/random/";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        randomMachine(this.response);
    }
  };
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
};

var randomMachine = function (objectQuote) {
  dom.id("quote_message").innerText = objectQuote.quote;
  dom.id("author_name").innerText = objectQuote.author;
  var twitterUrl = 'https://twitter.com/intent/tweet?text="'
  + objectQuote.quote + '" ' + objectQuote.author + '&hashtags=quotes';
  dom.id("twitter").href = twitterUrl;
};

window.onload = function () {
  makeRequest();
  dom.id("new_quote").onclick = makeRequest;
}