var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");


var json_Floor = 0; //暫存　json的位置


var Today = new Date();
var date = Today.getDate();
var setDat = (Today.getFullYear() + "" + (Today.getMonth() + 1) + "" + date);

if (date < 10) {
  date = "0" + date;
}


var peopleData = [];
var allUrl = new Array(10); // 所有的鏈

allUrl[1] = "https://www.setn.com/Catalog.aspx?PageGroupID=6" //三立新聞
allUrl[2] = "http://news.ltn.com.tw/list/newspaper/politics/" + setDat; //自由時報
allUrl[3] = "https://theinitium.com/" //灣煤船
allUrl[4] = "https://udn.com/news/cate/2/6638" //自由時報
allUrl[5] = "https://news.tvbs.com.tw/politics" //tvbs
allUrl[6] = "https://news.cts.com.tw/politics/" //華視
allUrl[7] = "https://www.ettoday.net/news/focus/%E6%94%BF%E6%B2%BB/"; //東森
allUrl[8] = "https://www.ttv.com.tw/news/catlist/A"; //台視

var getconition = new Array(10); //文字中的條件
getconition[1] = ".newsimg-area-text-2";
getconition[2] = ".list p";
getconition[3] = ".c-digest-headline";
getconition[4] = ".listing h2";
getconition[5] = ".listing h2";
getconition[6] = ".newstitle p";
getconition[7] = ".two_col h3"
getconition[8] = ".list_style_none a";



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
    var titles = $(getname);
    console.log("hi");

    for (var i = 0; i < 5; i++) {
      json_Floor++;
      peopleData.push($(titles[json_Floor]).text());
    }
    peopleData.push("hi");

    // peopleData.push($(titles).text());
    fs.writeFileSync("result32.json", JSON.stringify(peopleData));

  });

}


//計時工具


/*
０ 名視                      ０ null
１ 三立                      １ $ ('.newsimg-area-text-2');
２ 自由時報                  ２ $('.list p');
３ 風媒端                    ３ $('.c-digest-headline');
４ 聯合                      ４ $('.listing h2')
５ TVBS                     ５ $('.txt masterVision_box_img');
６ 華視                     ６ $('.newstitle');
７ 東森                     ７  $('.two_col h3')
８ 台視                     ８ $('.list_style_none a')
*/
