import Vue from 'vue';

//创建组件
Vue.component('App',{
	template:`
		<div id='app'>
			message = {{message}}
		</div>
	`,
	data:function(){
		return{
			message:'hello world'
		}
	}
	})
//创建Vue实例
new Vue({
	//把当前的vue对象和#app绑定
	el:'#app',
	//替换掉#app的元素
	template:'<App></App>'
}) 