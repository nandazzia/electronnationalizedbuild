'use strict'

import { app } from 'electron'
import { initWindow, MainShow } from './services/main'
import electronDevtoolsInstaller, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// 关闭安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// 关闭节流
app.commandLine.appendSwitch('disable-background-timer-throttling')

function onAppReady() {
  initWindow()
  if (process.env.NODE_ENV === 'development') {
    electronDevtoolsInstaller(VUEJS_DEVTOOLS)
      .then((name) => console.log(`installed: ${name}`))
      .catch(err => console.log('Unable to install `vue-devtools`: \n', err))
  }
}

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    MainShow()
  })
}

app.isReady() ? onAppReady() : app.on('ready', onAppReady)

// 解决9.x跨域异常问题
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors') // 关闭声音的安全策略

app.on('window-all-closed', () => {
  app.quit()
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('electron-vue-template')
    console.log('由于框架特殊性开发环境下无法使用')
  }
} else {
  app.setAsDefaultProtocolClient('electron-vue-template')
}
