import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
// 导入封装过的axios模块
import service from './service'
import router from './router'
import reset from '@/assets/css/reset.css'
import normalize from '@/assets/css/normalize.css'
import echarts from 'echarts'

// Vue.prototype.axios = axios// 挂载到原型，可以全局使用
Vue.prototype.service = service
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)
Vue.use(reset)
Vue.use(normalize)

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('username')) {
    if (to.path !== '/login') {
      next('/login')
    } else next()
  }next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
