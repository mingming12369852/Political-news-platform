const http = require("http");

const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  console.log("HI");

  exports.myDateTime = function() {
    return Date();
  };
  
  res.end("Hello World\n why>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.listen(port);
