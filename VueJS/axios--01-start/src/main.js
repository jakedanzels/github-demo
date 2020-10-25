import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://vuejs-http-dd715.firebaseio.com'
axios.defaults.headers.common['Authorization'] = 'blahblah'
axios.defaults.headers.get['Accepts'] = 'application/json'

axios.interceptors.request.use(config => {
  console.log(config)
  return config
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
