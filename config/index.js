'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
console.log('Host', HOST)
console.log('Port', PORT)
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/': {
        target: 'http://localhost:9527',
        secure: false,
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  env: {
    // 开一
    dev1: {
      protocol: 'https', // 请求协议，可选https\http
      domain: 'prodevgateway.xbongbong.com.cn', // 域名，也可以是ip地址
      cdn_path: 'https://xbblocal.oss-cn-hangzhou.aliyuncs.com',
      server: 'aliyun' // 是否指定服务器，会影响打包方式，可选参数'aliyun'|
    },
    // 测试一
    test1: {
      protocol: 'https',
      domain: 'ptgateway.xbongbong.com.cn',
      server: 'aliyun'
    },
    // 测试二
    test2: {
      protocol: 'https',
      domain: 'pt2gateway.xbongbong.com.cn',
      server: 'aliyun'
    },
    // 测试三
    test3: {
      protocol: 'https',
      domain: 'pt3gateway.xbongbong.com.cn',
      server: 'aliyun',
      // cross: 'https://app1013.eapps.dingtalkcloud.com'
    },
    // 测试四
    test4: {
      protocol: 'https',
      domain: 'pt4gateway.xbongbong.com.cn',
      server: 'aliyun',
      // cross: 'https://app1013.eapps.dingtalkcloud.com'
    },
    // 测试五
    test5: {
      protocol: 'https',
      domain: 'pt5gateway.xbongbong.com.cn',
      server: 'aliyun',
      // cross: 'https://app1013.eapps.dingtalkcloud.com'
    },
    // 流量回放
    playback: {
      protocol: 'https',
      domain: 'playbackgateway.xbongbong.com.cn',
      server: 'aliyun'
    },
    // 资金管理测试
    oms: {
      protocol: 'http',
      domain: 'omsdevgateway.xbongbong.com.cn',
      server: 'aliyun'
    },
    // 正式环境
    prod: {
      protocol: 'https',
      domain: 'progateway.xbongbong.com',
      server: 'aliyun',
      cdn_path: 'https://xbongbong.oss-cn-hangzhou.aliyuncs.com'
    },
    // beta环境，ab测试环境
    beta: {
      protocol: 'https',
      domain: 'betagateway.xbongbong.com',
      server: 'aliyun'
    },
    // 本地环境
    local: {} // 地址动态输入
  }
}
