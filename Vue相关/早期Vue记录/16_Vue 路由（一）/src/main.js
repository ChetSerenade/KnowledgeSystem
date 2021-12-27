import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'   //引入 完之后  关联
import axios from 'axios'
 

//采用实列对象得形式
//建议把axios得实列对象作为vue原型得某一个属性
Vue.prototype.$axios=axios.create({
  baseURL: 'http://180.76.165.143:8080/MyUser'
})


new Vue({
  el: '#app',
  router,  //和vue对象关联
  render: h => h(App)
})
