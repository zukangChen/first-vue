let http = require('http')
let data = {
  name: 'czk',
  age: 27
}
http.createServer(function (request, response) {
  console.log('url:', request.url)
  if (request.url == '/chen') {
    response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
    return response.end(JSON.stringify(data))
  }
  // response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  // response.end(JSON.stringify(data))
  response.end(JSON.stringify(''))
}).listen(3002, () => {
  console.log('端口在3002运行');
})

console.log('服务开启')