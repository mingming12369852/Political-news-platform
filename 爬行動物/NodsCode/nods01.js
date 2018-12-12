var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var freeUrl = "https://www.setn.com/Catalog.aspx?PageGroupID=6";

var result = []; //自由時報

request({
  url: freeUrl,
  method: "GET"
}, function(e, r, b) {
  if (e || !b) {
    return;
  }
  var $ = cheerio.load(b);
  var titles = $('.lazy').attr("src");
  // var img = $('.lazy').attr("src");


  for (var i = 0; i < 5; i++) {
    result.push($(titles[i]).text() );
    // result.push( $(img[i].text() ) );
  }

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
