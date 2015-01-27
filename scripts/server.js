var http = require("http");
var url = require("url");



http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  var params = url.parse(request.url,true).query;
  console.log(params);
  console.log(url);
  response.write('test');
  response.end();
}).listen(8888);

// connect()
//     .use(connect.static(directory))
//     .listen(8888);

// console.log('Listening on port 80.');

