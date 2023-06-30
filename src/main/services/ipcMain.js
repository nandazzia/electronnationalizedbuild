import { BrowserWindow, desktopCapturer, globalShortcut, ipcMain } from 'electron'
import { platform } from 'os'

import config from '@config/index'
import process from 'process'
import { icon, winURL } from '../config/StaticPath'

const { exec } = require('child_process')
const cidArray = [] // 这是子窗口的数组  所有的子窗口都存进去数据 并且所有的进程操作都共享它

let closeComputerWindow = null // 关机提示窗口

function otherHandle() {
  // 关机命令
  ipcMain.on('closeComputer', (event, arg) => {
    console.log('收到关机命令了')
    // 单体关机
    if (arg.content === 'shutdown') {
      const cidJson = { id: null, url: '' }
      const data = cidArray.filter((val) => {
        if (val.url === arg.url) {
          return val
        }
      })
      // 先判重
      // 当有窗口跟当前URL一致时 也就是此窗口已经存在时
      if (data.length > 0) {
        const currentWindow = BrowserWindow.fromId(data[0].id)
        currentWindow.focus()
        return
      } else {
        // 否则的话  获取父窗口的ID
        const parentID = event.sender.id
        // 创建窗口
        closeComputerWindow = new BrowserWindow({
          width: Math.round(globalWidth * (350 / 1920)),
          height: Math.round(globalHeight * (250 / 1080)),
          useContentSize: true,
          autoHideMenuBar: true,
          skipTaskbar: true,
          frame: true,
          icon: icon,
          resizable: false,
          maximizable: false,
          show: false,
          momodalable: true,
          parent: parentID,
          webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            devTools: false,
            scrollBounce: process.platform === 'darwin',
            contextIsolation: false
          }
        })
        closeComputerWindow.setAlwaysOnTop(true, 'screen-saver')
        closeComputerWindow.loadURL(winURL + `#/closeComputer`)
        cidJson.id = closeComputerWindow?.id
        cidJson.url = arg.url
        cidArray.push(cidJson)
        closeComputerWindow.webContents.once('ready-to-show', () => {
          closeComputerWindow?.show()
        })
        // 退出关机
        ipcMain.on('quitClose', () => {
          closeComputerWindow?.close()
        })
        closeComputerWindow.on('closed', () => {
          // 关闭窗口时
          closeComputerWindow = null
          ipcMain.removeAllListeners('quitClose')
          const index = cidArray.indexOf(cidJson)
          if (index > -1) {
            cidArray.splice(index, 1)
          }
        })
      }
    }
  })
}
export {
  otherHandle
}
