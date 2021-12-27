// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index.js'
import App from './App'
import store from './store/index.js'
import request from './store/ajax';

//把axios的实列对象作为vue原型的某个属性
Vue.prototype.$http = request;


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	request,
	render: h => h(App)
}).$mount('#app-box')
