/*
 * @Description: 在 webpack 外层再包一个 proxy 使用 readline 来完成 IP 热切换
 */
const http = require('http')
const httpProxy = require('http-proxy')
const cprocess = require("child_process")
const readline = require('readline')
const os = require('os')
let target = process.argv[2]
let server
// 获取 IP
const getIP = () => {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
// 检查可用端口
async function portInUsed(port) {
  return new Promise((resolve, reject) => {
    let checkServer = http.createServer().listen(port, '0.0.0.0');
    checkServer.on('listening', () => {
      checkServer.close();
      resolve(port);
    });
    checkServer.on('error', (err) => {
      if (err.code == 'EADDRINUSE') {
        port++;
        reject(err);
      }
    });
  });
}
// 递增获取端口直到找到可用端口为止
const tryUsePort = (port, _portAvailableCallback) => {
  portInUsed(port).then((port) => {
    _portAvailableCallback(port);
  }).catch((err) => {
    console.log(port + " ====被占用====：\n");
    port++;
    tryUsePort(port, _portAvailableCallback);
  })
}
let proxyPort = null
tryUsePort(9527, (port) => {
  createServer(port)
})

const createServer = (port) => {
  // 创建代理服务
  const proxy = httpProxy.createProxyServer()
  const createProxy = (host) => {
    host = `http://${host}`
    console.log('host', host)
    proxy.on('proxyReq', function (proxyReq, req, res, options) {
      // 修正host
      proxyReq.setHeader('Host', host.replace(/http:\/\/|https:\/\//, ''));
    });
    server = http.createServer((req, res) => {
      proxy.web(req, res, {
        target: host,
        secure: true,  // 支持HTTPS协议
        changeOrigin: true,
      })
      proxy.on('error', (err) => { })
    })
    console.log('代理服务创建成功')
    console.log('port', port)
    server.listen(port, '0.0.0.0')
  }
  createProxy(target)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  console.log('部署控制台键入监听服务')
  // 监听键入回车事件
  rl.on('line', (str) => {
    if (str.substr(0, 6) === 'switch') {
      let ip = str.split(' ')[1]
      if (!ip) {
        return console.error('请输入 IP')
      }
      console.log(`您切换的 IP: ${ip}`)
      server.close()
      console.log('代理服务关闭中...')
      createProxy(ip)
    }
  })
  console.log(getIP(), port)
  // 启动项目服务
  const ip = getIP()
  let cmd = `npm run dev`
  let dev = cprocess.exec(
    cmd, {
    detached: true,
    maxBuffer: 160 * 1024 * 1024 //30m
  },
    function (error, stdout, stderr) {
      if (error) console.log(error)
    }
  )
  dev.stdout.pipe(process.stdout)
  dev.stderr.pipe(process.stderr)
}
