var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var Today = new Date();
var date = Today.getDate();
var setDat;

if (date < 10) {
  date = "0" + date;
}

setDat = (Today.getFullYear() + "" + (Today.getMonth() + 1) + "" + date);
var freeUrl = "http://news.ltn.com.tw/list/newspaper/politics/" + setDat;

var result = []; //自由時報

request({
  url: freeUrl,
  method: "GET"
}, function(e, r, b) {
  if (e || !b) {
    return;
  }
  var $ = cheerio.load(b);
  var titles = $('.list p');

  for (var i = 0; i < titles.length; i++) {
    result.push( $(titles[i]).text() );
  }


  fs.writeFileSync("result.json", JSON.stringify(result));
});
