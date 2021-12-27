import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

// axios发送ajax请求的第三种方式 : 创建实列对象
// 把axios的实列对象作为vue原型链的($axios名字可以随意变) 属性名
Vue.prototype.$axios=axios.create({
  baseURL: 'http://180.76.165.143:8080/MyUser'
})



new Vue({
  el: '#app',
  render: h => h(App)
})
