import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'

import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'
axios.defaults.baseURL = 'http://121.36.80.195:5000/'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
