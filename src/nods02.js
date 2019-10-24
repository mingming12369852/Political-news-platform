var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
const delay = require('delay');
const http = require("http");



//=================================================server MOD

//=================================================

//=================================================Data URL
var all = {};
var allUrl = new Array(10); // 所有的鏈

allUrl[1] = "https://www.setn.com/Catalog.aspx?PageGroupID=6"; //三立新聞
allUrl[2] = "http://news.ltn.com.tw/list/breakingnews/politics"; //自由時報
allUrl[3] = "https://theinitium.com/"; //端媒傳
allUrl[4] = "https://udn.com/news/cate/2/6638"; //聯合新聞
allUrl[5] = "https://news.tvbs.com.tw/politics"; //tvbs
allUrl[6] = "https://news.cts.com.tw/politics/"; //華視
allUrl[7] = "https://www.ettoday.net/news/focus/%E6%94%BF%E6%B2%BB/"; //東森
allUrl[8] = "https://www.ttv.com.tw/news/catlist/A"; //台視
allUrl[9] = "http://gotv.ctitv.com.tw/category/politics-news" //中天

var getconition = new Array(10); //文字中的條件 .class title

getconition[1] = ".newsimg-area-text-2";
getconition[2] = ".list p";
getconition[3] = ".c-digest-lead";
getconition[4] = ".listing h2";
getconition[5] = ".content_center_contxt_real_news h2";
getconition[6] = ".newslist-container p";
getconition[7] = ".part_pictxt_3 h3";
getconition[8] = ".list_style_none a";
getconition[9] = ".post-title a";

var getIMG = new Array(10); //圖片中的條件 .class
//未完成
getIMG[1] = ".lazy";
getIMG[2] = ".list img";
getIMG[4] = ".ratio-container >img";
getIMG[5] = ".lazyimage";
getIMG[6] = ".newsimg-thumb img";
getIMG[7] = ".part_pictxt_3 img";
getIMG[9] = ".img src";

//圖片中的連結來源
var getIMGconition = new Array(10);
getIMGconition[1] = "data-original";
getIMGconition[2] = "src";
getIMGconition[4] = "data-src";
getIMGconition[5] = "data-original";
getIMGconition[6] = "src";
getIMGconition[7] = "src";





//=======================================================
//=================================================
var obj = [];
var objimg = [];
var all = {};
const finalResult = {}

var json_Floor = 0; //暫存　json的位置
var getdata_name_code = 0; //暫存 名子位置

var getdata_name_haha; //暫存 名子位置
var peopleData = [];
var name;
var status_time = true; //狀態


// in Start

for (var x = 0; x < allUrl.length; x++) {

  if (allUrl[x] !== null) {
    getdata_name(getdata_name_code); //建立 資料存放 的名稱
    getData(allUrl[x], "GET", getconition[x], getdata_name_haha, getIMG[x], getIMGconition[x]);
    //連結,連線方式,文字的class title,n的名稱{ n :Data} ,圖片的class,圖片中的連結來源 src
    getdata_name_code++;
  }

}

//================================================Function Code
var date;

//開啟server 127.0.0.1:5000
function startServer() {


  const hostname = "127.0.0.1";
  const port = process.env.PORT || 5000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    console.log("HI");
    var Alldata = date;
    // res.write();
    // console.log(date);
    res.end(JSON.stringify(date, "utf-8"));
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  server.listen(port);

}

function getData(url, method, getname, name, img, imgconition) {
  console.log(img);
  request({
    url: url,
    method: method
  }, function(e, r, b) {
    if (e || !b) {
      return;
    }
    var $ = cheerio.load(b);
    var titles = $(getname);
    var getimg_ = $(img);

    for (var i = 0; i < 5; i++) {
      json_Floor++;
      obj.push($(titles[i]).text().trim()); //抓取每個標題
      objimg.push($(getimg_[i]).attr(imgconition)); //抓取每個照片


      all[name] = obj;
      all[name + "img"] = objimg;
    }

    obj = [];
    objimg = [];
    fs.writeFileSync("build/Data01.json", JSON.stringify({
      all
    }));
    date = all;
    console.log(date);
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
      getdata_name_haha = "中天";
      break;
    default:
  }

}

startServer();
//=================================================
