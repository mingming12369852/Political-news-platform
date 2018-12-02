var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var peopleData = [];

request({
  url: 'https://news.cts.com.tw/politics/',
  //https://news.ftv.com.tw/news/overview/POL
  method: "GET"
}, function(e, r, b) {
  if (e || !b) {
    return;
  }

  var $ = cheerio.load(b);
  var titles = $('.newstitle');

  for (var i = 0; i < 5; i++) {
    peopleData.push($(titles[i]).text());
  }
  console.log("華視");
  // console.log(b);
  console.log(titles.length);

  fs.writeFileSync("result2.json", JSON.stringify(peopleData));
  console.log(peopleData);

});
