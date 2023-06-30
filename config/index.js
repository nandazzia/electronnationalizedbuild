module.exports = {
  // 开启调试 可以给每个窗口添加调试面板
  DevTools: {

  },
  build: {
    env: require('./prod.env'),
    DisableF12: true,
    cleanConsole: true,
    openDevTools: false, // 打包后是否还开启调试工具
    hotPublishUrl: '',
    hotPublishConfigName: 'update-config'
  },
  dev: {
    env: require('./dev.env'),
    removeElectronJunk: true, // 是否关闭electron垃圾输出
    chineseLog: false,
    port: 9080
  },
  development: require('./dev.env'),
  production: require('./prod.env'),
  UseStartupChart: true, // 启用开机镜头
  IsUseSysTitle: true,
  DllFolder: '',
  BuiltInServerPort: 25565
}
