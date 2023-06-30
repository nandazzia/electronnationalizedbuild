'use strict'
process.env.NODE_ENV = 'production'
const { say } = require('cfonts') //在控制台中输出有特效的文字
const chalk = require('chalk')  //彩笔
const del = require('del')
const webpack = require('webpack')
const Multispinner = require('multispinner') // 用于node的 CLI 应用中的多个进度指示器

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

const doneLog = chalk.bgCyan.bold(' 开始DONE ') + ' '
const errorLog = chalk.bgRed.white.bold(' 报错ERROR ') + ' '
const okayLog = chalk.green.bgBlue.bold(' 成功OKAY ') + ' '
const isCI = process.env.CI || false

if (process.env.BUILD_TARGET === 'web') web()
else build()

function clean() {
  console.log(`\n${doneLog}clear done`)
  // 清空文件夹
  del.sync(['dist/electron/*', 'build/*', '!build/icons', '!build/lib', '!build/lib/electron-build.*', '!build/icons/icon.*'])
  if (process.env.BUILD_TARGET === 'onlyClean') process.exit()
  console.log(`\n${okayLog}clear success`)
}

function build() {
  // 欢迎语
  greeting()
  // 清除文件夹
  if (process.env.BUILD_TARGET === 'clean' || process.env.BUILD_TARGET === 'onlyClean') clean()
  console.log(`\n${doneLog}build`)
  const tasks = ['main', 'renderer']
  // 创建进度指示器 分别展示 主进程跟渲染进程
  const m = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  })

  let results = ''

  m.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\n${results}`)
    console.log(`${okayLog}建立 ${chalk.yellow('electron-builder，开始打包')}\n`)
    process.exit()
  })
  // 执行打包 主进程进程
  pack(mainConfig).then(result => {
    results += result + '\n\n'
    console.log(`\n${okayLog}main process pack success`)
    m.success('main')
  }).catch(err => {
    m.error('main')
    console.log(`\n  ${errorLog} main process打包出错`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
  // 执行打包 渲染进程
  pack(rendererConfig).then(result => {
    results += result + '\n\n'
    console.log(`\n${okayLog}renderer process pack success`)
    m.success('renderer')
  }).catch(err => {
    m.error('renderer')
    console.log(`\n  ${errorLog}renderer process 打包出错`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}
// 打包方法
function pack(config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production'
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
          .split(/\r?\n/)
          .forEach(line => {
            err += `    ${line}\n`
          })

        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}

function web() {
  del.sync(['dist/web/*', '!.gitkeep'])
  rendererConfig.mode = 'production'
  webpack(rendererConfig, (err, stats) => {
    if (err || stats.hasErrors()) console.log(err)

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))

    process.exit()
  })
}
//  问候语
function greeting() {
  const cols = process.stdout.columns
  // 打印的行数
  let text = ''
  if (cols > 85) text = `Wu-Zhi-Hua`
  else if (cols > 60) text = `Wu-Zhi-Hua`
  else text = false

  if (text && !isCI) {
    say(text, {
     // colors: ['white','#ea6993'],
      // font: '3d',//slick
      gradient:['#0652a6','#cc0c1f'],
      //space: true,
      //background: 'yellow',
      lineHeight:2,
      //independentGradient: false
    })
  } else console.log(chalk.yellow.bold(`\n  Wu-Zhi-Hua`))
  console.log()
}
