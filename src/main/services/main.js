import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import { platform, arch } from 'os'
import config from '@config'
import { otherHandle } from './ipcMain'
import { loadingURL, winURL, icon } from '../config/StaticPath'

import { createCleverIslandWindow, noticeCleverIsland } from './component-windows/CleverIsland'
import searchDisplay from '../utils/display'
const process = require('process')

let loadWindow = null
let mainWindow = null

async function createMainWindow() {
  await searchDisplay()
  // 加载所有的通信手段

  const { width, height } = global.mainDisplay.bounds
  console.log(`主屏幕的宽：${width}，高：${height}`)
  console.log(arch())

  mainWindow = new BrowserWindow({
    show: false,
    useContentSize: true,
    width: 1200,
    height: 800,
    frame: true,
    maximizable: true,
    movable: false,
    minimizable: true,
    resizable: false,
    titleBarStyle: platform().includes('win32') ? 'default' : 'hidden',
    icon: icon,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      devTools: true,
      // 在macos中启用橡皮动画
      scrollBounce: process.platform === 'darwin'
    }
  })

  // Menu.setApplicationMenu(null)
  mainWindow.loadURL(winURL).then().catch(() => {})
  otherHandle()
  mainWindow.webContents.once('dom-ready', () => {
    globalShortcut.register('CommandOrControl+Shift+i', function () {
      mainWindow.webContents.openDevTools()
    })
  })
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow?.show()
    if (config.UseStartupChart) loadWindow.destroy()
    mainIpc(mainWindow)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
}

function mainIpc(mainWindow) {
  ipcMain.handle('createIsland', () => {
    createCleverIslandWindow() // 提前设置一个提示框
  })
}
function loadingWindow() {
  loadWindow = new BrowserWindow({
    width: 800,
    height: 400,
    frame: false,
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })

  loadWindow.loadURL(loadingURL).then().catch()

  loadWindow.show()

  setTimeout(() => {
    createMainWindow()
  }, 3000)

  loadWindow.on('closed', () => {
    loadWindow = null
  })
}

function initWindow() {
  if (config.UseStartupChart) {
    return loadingWindow()
  } else {
    return createMainWindow()
  }
}
function MainShow() {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
    mainWindow.show()
    sendInfoToBall('mainIsShow')
  }
}

export { initWindow, MainShow }
