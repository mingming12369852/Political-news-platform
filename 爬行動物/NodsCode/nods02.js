var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var allUrl = new Array(10); // 所有的鏈

allUrl[1] = "https://www.setn.com/Catalog.aspx?PageGroupID=6"; //三立新聞
allUrl[2] = "http://news.ltn.com.tw/list/breakingnews/politics"; //自由時報
allUrl[3] = "https://theinitium.com/"; //端媒傳
allUrl[4] = "https://udn.com/news/cate/2/6638"; //聯合新聞
allUrl[5] = "https://news.tvbs.com.tw/politics"; //tvbs
allUrl[6] = "https://news.cts.com.tw/politics/"; //華視
allUrl[7] = "https://www.ettoday.net/news/focus/%E6%94%BF%E6%B2%BB/"; //東森
allUrl[8] = "https://www.ttv.com.tw/news/catlist/A"; //台視

var getconition = new Array(10); //文字中的條件
getconition[1] = ".newsimg-area-text-2";
getconition[2] = ".list p";
getconition[3] = ".c-digest-lead";
getconition[4] = ".listing h2";
getconition[5] = ".content_center_contxt_real_news h2";
getconition[6] = ".newslist-container p";
getconition[7] = ".part_pictxt_3 h3";
getconition[8] = ".list_style_none a";

var getIMG = new Array(10);
getIMG[1] = ".lazy"

var obj = [];
var hi = {};
const finalResult = {}


//=======================================================

var json_Floor = 0; //暫存　json的位置
var getdata_name_code = 0; //暫存 名子位置

var getdata_name_haha; //暫存 名子位置
var peopleData = [];
var name;
var status_time = true; //狀態
for (var x = 0; x < allUrl.length; x++) {
  if (allUrl[x] !== null) {
    getdata_name(getdata_name_code);
    getData(allUrl[x], "GET", getconition[x], getdata_name_haha);
    getdata_name_code++;

  }
}


function getData(url, method, getname, name) {
  request({
    url: url,
    method: method
  }, function(e, r, b) {
    if (e || !b) {
      return;
    }
    var $ = cheerio.load(b);
    var titles = $(getname);

    for (var i = 0; i < 5; i++) {
      json_Floor++;
      obj.push($(titles[i]).text().trim()); // 抓取每個標題
      hi[name] = obj;

    }
    obj = [];
    fs.writeFileSync("result32.json", JSON.stringify({
      hi
    }));

  });
}


function getdata_name(number) {

  switch (number) {
    case 1:
      getdata_name_haha = "三立新聞";
      break;
    case 2:
      getdata_name_haha = "自由時報";
      break;
    case 3:
      getdata_name_haha = "端媒傳";
      break;
    case 4:
      getdata_name_haha = "聯合新聞";
      break;
    case 5:
      getdata_name_haha = "tvbs";
      break;
    case 6:
      getdata_name_haha = "華視";
      break;
    case 7:
      getdata_name_haha = "東森";
      break;
    case 8:
      getdata_name_haha = "台視";
      break;
    case 9:
      getdata_name_haha = "自由時報";
      break;
    default:
  }

}
