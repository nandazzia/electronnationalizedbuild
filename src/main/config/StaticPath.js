// 这里定义了静态文件路径的位置
import path from 'path'
import { DllFolder } from '@config/index'
import { platform } from 'os'

// 这个瓜皮全局变量只能在单个js中生效，而并不是整个主进程中
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
  process.env.libPath = path.join(__dirname, '..', '..', '..', '..', `${DllFolder}`).replace(/\\/g, '\\\\')
}

export const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}` : `file://${__dirname}/index.html`
export const loadingURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}/static/loader.html` : `${path.join(__dirname, '/static/loader.html').replace(/\\/g, '/')}`

const iconPathLinux = process.env.NODE_ENV === 'development' ? path.join(__dirname, '../../../static/icons/256x256.png') : `${path.join(__dirname, '/static').replace(/\\/g, '/')}/icons/256×256.png`
const iconPath = process.env.NODE_ENV === 'development' ? path.join(__dirname, '../../../static/icons/icon.png') : `${path.join(__dirname, '/static').replace(/\\/g, '/')}/icons/icon.png`

export const icon = platform().includes('linux') ? iconPathLinux : iconPath
