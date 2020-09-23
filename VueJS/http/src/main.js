import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);
Vue.http.options.root = 'https://vuejs-http-dd715.firebaseio.com/';
Vue.http.interceptors.push((request, next) => {
    console.log(request);   
});

new Vue({
  el: '#app',
  render: h => h(App)
})
