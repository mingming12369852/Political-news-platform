const http = require("http");

const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;
var heelo = "fulllei iie is goodle";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  console.log("HI");


  res.end(heelo);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.listen(port);
