const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./public/index.template.html', 'utf-8')
})

const createApp = require('./dist/bundle.server.js')['default']
const clientBundleFileUrl = '/bundle.client.js'

// 设置静态文件目录
server.use(express.static(__dirname + '/dist'))
server.use('/api', express.static(__dirname + '/api'))

server.get('*', (req, res) => {
  //设置response编码为utf-8
  if (req.url!='/favicon.ico'){
    res.set({'Content-Type':'text/html;charset=utf-8'});
    res.end(`

<!DOCTYPE html>
<html lang="en">
  <!-- 使用双花括号(double-mustache)进行 HTML 转义插值(HTML-escaped interpolation) -->
  <title>Vue SSR 指南 | 在 Node.js 环境中使用</title>
  <!-- 使用三花括号(triple-mustache)进行 HTML 不转义插值(non-HTML-escaped interpolation) -->
  
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="description" content="Vue.js 服务端渲染指南">
  <body>
    <div id="app"></div>
    <script src=${clientBundleFileUrl}></script>
  </body>
</html>`)
  }
})

server.listen(8081)