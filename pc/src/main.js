import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
axios.defaults.baseURL = 'http://121.36.80.195:5000/'
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization =window.sessionStorage.getItem('token')
//   return config
// })

Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
