// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import treeTable from 'vue-table-with-tree-grid'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'//富文本编辑器
// // 富文本编辑器样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// 进度条
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'


//配置请求路径
axios.defaults.baseURL="http://timemeetyou.com:8889/api/private/v1/"
//配置请求拦截器（调用接口需要携带token令牌）
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem("token")
  NProgress.start();
  return config
})

axios.interceptors.response.use(config=>{
  NProgress.done();
  return config
})
Vue.prototype.$http=axios

Vue.config.productionTip = false
Vue.prototype.$moment = moment;//赋值使用

// Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.component('treeTable',treeTable)
/* eslint-disable no-new */

// //beforeEach 路由挂载守卫 根据token控制要去的路径
// router.beforeEach((to, from, next) => {
//   //to用户要去的路径
//   //from来的路径
//   //next放行要去的路径

//   if (to.path === "/login") return next()
//   const token = window.sessionStorage.getItem("token")
//   if (!token) return next("/login")
//   next()
// })
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
