// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import fastclick from 'fastclick'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store/index.js'
import './assets/css/border.css'
import './assets/css/reset.css'
import '../node_modules/swiper/dist/css/swiper.css'

// require styles


Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false
Vue.use(less)
fastclick.attach(document.body)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://mock.studyinghome.com/mock/5f4df8d25052396fc0a0cdf6/example/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
