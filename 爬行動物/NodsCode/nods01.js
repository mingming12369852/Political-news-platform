//年月日


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
    result.push($(titles[i]).text());
  }
  
  console.log("自由時報");
  fs.writeFileSync("result.json", JSON.stringify(result));
});




// var request = require("request");
// var cheerio = require("cheerio");
// var js = rquire("fs");
//
// var weather = function() {
//   request({
//     url: "https://www.cwb.gov.tw/V7/forecast/",
//     method: "GET"
//   }, function(error, response, body) {
//     if (error || !body) {
//       return;
//     } else {
//       console.log(body);
//     }
//
//   });
//
// };
