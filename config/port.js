
/* 配置服务的端口号
* webRtc的端口号： webRtcPort
* 球的websocket端口：webSocketBallPort
* 全局webSocket端口：webSocketGlobalPort
* 后台管理的端口：managePort
* */

let webRtcPort = localStorage.getItem('webRtcPort')
let webSocketBallPort = localStorage.getItem('webSocketBallPort')
let webSocketGlobalPort = localStorage.getItem('webSocketGlobalPort')
let managePort = localStorage.getItem('managePort')
if (!webRtcPort) { webRtcPort = '3016' }
if (!webSocketBallPort) { webSocketBallPort = '8400' }
if (!webSocketGlobalPort) { webSocketGlobalPort = '8401' }
if (!managePort) { managePort = '8091' }
module.exports = {
  webRtcPort,
  webSocketBallPort,
  webSocketGlobalPort,
  managePort
}
