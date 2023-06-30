import Vue from 'vue'
import App from './App'
import router from './router'
// 引用element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 日志 报错
import './error'
import '@/styles/index.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

const vue = new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

export default vue
