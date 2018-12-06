var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var Today = new Date();
var date = Today.getDate();
var setDat = (Today.getFullYear() + "" + (Today.getMonth() + 1) + "" + date);

var peopleData = [];
var allUrl = new Array(10); // 所有的鏈
allUrl[2] = "http://news.ltn.com.tw/list/newspaper/politics/" + setDat;
var getconition = new Array(10); //文字中的條件
getconition[2] = ".list p";

var json_Floor; //暫存　json的位置

if (date < 10) {
  date = "0" + date;
}
for (var x = 0; x < allUrl.length; x++) {
  if (allUrl[x] !== null) {
    getData(allUrl[x], "GET", getconition[x]);
  }
}

function getData(url, method, getname) {

  request({
    url: url,
    method: method
  }, function(e, r, b) {
    if (e || !b) {
      return;
    }

    var $ = cheerio.load(b);
    var titles = $(name);

    console.log("hi");
    console.log(name);

    peopleData.push($(titles).text());
    fs.writeFileSync("result3.json", JSON.stringify(peopleData));

  });

}



/*
０ 名視                      ０ null
１ 三立                      １ null
２ 自由時報                  ２ $('.list p');
３ 風媒端                    ３
４ 聯合                      ４
５ TVBS                     ５
６ 華視                     ６$('.newstitle');
７ 東森                     ７
８ 中天                     ８
*/
