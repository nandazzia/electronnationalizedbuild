import { BrowserWindow, ipcMain } from 'electron'
import process from 'process'
import { icon, winURL } from '../../config/StaticPath'

let CleverIslandId = null
let CleverIslandWindow
function createCleverIslandWindow() {
  if (CleverIslandId) {
    const currentWindow = BrowserWindow.fromId(CleverIslandId)
    currentWindow.focus()
  } else {
    const { width, height, x, y } = global.mainDisplay.bounds
    CleverIslandWindow = new BrowserWindow({
      width: Math.round(width * (880 / 1920)),
      height: Math.round(height * (60 / 1080)),
      icon: icon,
      useContentSize: true,
      // 自动隐藏菜单栏，除非按了Alt键。
      autoHideMenuBar: true,
      skipTaskbar: false,
      frame: false,
      resizable: false,
      maximizable: false,
      show: false,
      center: true,
      // opacity: 1,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: true,
        scrollBounce: process.platform === 'darwin',
        contextIsolation: false
      }
    })
    CleverIslandId = CleverIslandWindow?.id
    CleverIslandWindow.setPosition(Math.round(x + width * (520 / 1920)), Math.round(y + height * (15 / 1080)))
    CleverIslandWindow.loadURL(winURL + `#/CleverIsland`).then().catch()
    CleverIslandWindow.webContents.once('ready-to-show', () => {
      console.log('灵动岛窗口偷偷建好了')
    })
    CleverIslandWindow.on('closed', () => {
      CleverIslandWindow = null
      CleverIslandId = null
      ipcMain.removeAllListeners('CleverIsland')
      ipcMain.removeAllListeners('CleverIsland-hide')
      ipcMain.removeAllListeners('killIsland')
    })

    ipcMain.on('CleverIsland', (event, args) => { noticeCleverIsland(args) })
    ipcMain.on('CleverIsland-hide', () => {
      CleverIslandWindow?.hide()
    })
    ipcMain.on('killIsland', () => {
      CleverIslandWindow?.close()
    })
  }
}
// 接收通知的办法
function noticeCleverIsland(arg) {
  CleverIslandWindow?.show()
  CleverIslandWindow?.webContents.send('initIsland', arg)
}

export { createCleverIslandWindow, noticeCleverIsland }
