let http = require('http')
let data = {
  name: '陈年往事',
  age: 28
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
}).listen(9527, () => {
  console.log('端口在9527运行');
})

console.log('服务开启')