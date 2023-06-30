// 内置node服务 可选用
// 主要是express  koa自己注入
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, './client')))

const server = app.listen(8090, function () {
  const host = server.address().address
  const port = server.address().port

  console.log('内置服务启动', host, port)
})
