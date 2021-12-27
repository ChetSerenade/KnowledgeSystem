import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

new Vue({
  el: '#app',
  //在vue实列对象中关联路由管理器
  router,
  render: h => h(App)
})
