import { screen } from 'electron'
// 如果有副屏 在这里进行筛选
function searchDisplay() {
  const displays = screen.getAllDisplays()
  const screenHeight = []
  return new Promise((resolve, reject) => {
    displays.forEach((display, index) => {
      screenHeight.push(display.bounds.height * display.scaleFactor)
    })
    if (screenHeight.length === 1) {
      global.mainDisplay = displays[0]
      global.externalDisplay = null
      resolve(true)
    } else if (screenHeight.length > 1) {
      const maxHeight = Math.max(...screenHeight)
      const minHeight = Math.min(...screenHeight)
      if (maxHeight === minHeight) {
        global.mainDisplay = displays[0]
        global.externalDisplay = displays[1]
      } else {
        global.mainDisplay = displays.find((display) => {
          return display.bounds.height * display.scaleFactor === maxHeight
        })
        global.externalDisplay = displays.find((display) => {
          return display.bounds.height * display.scaleFactor === minHeight
        })
      }
      resolve(true)
    } else {
      reject(false)
    }
  })
}
export default searchDisplay
