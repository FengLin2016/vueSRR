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
    createApp({ url: req.url }).then(({app, data}) => {
      renderer.renderToString(app, {
          title: 'Vue SSR 指南 | 在 Node.js 环境中使用',
          script: `<script>window._INITDATA_=${JSON.stringify(data)}</script><script src=${clientBundleFileUrl}></script>`,
          meta: `
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="description" content="Vue.js 服务端渲染指南">
          `
        }, (err, html) => {
        if (err) {
          res.status(500).end('Internal Server Error'+err)
          return
        }
        res.end(html)
      })
    }).catch((err) => {
      console.log(err)
    })
  } else {
   res.end()
  }
  
})

server.listen(8080)