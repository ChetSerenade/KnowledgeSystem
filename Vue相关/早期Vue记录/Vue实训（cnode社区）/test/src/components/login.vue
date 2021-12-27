<template>
	<div>
		<h5>用户登录</h5>
		<group>
			<x-input placeholder="AccessToken" v-model="accesstoken"></x-input>
		</group>
		<div style="height:30px"></div>
		<!-- 在组建中执行 @click事件，需要添加事件修饰符 .native(监听原生事件) -->
		<x-button type="primay" @click.native="dologin">
			登录
		</x-button>
	</div>
</template>

<script>
import { XInput,Group,XButton } from 'vux';
import {mapMutations} from 'vuex';
export default {
	name:'login',
    components: {
	XInput,
	Group,
	XButton,
  },
  data:function(){
	  return {
		  accesstoken:'111',
	  }
  },
  methods:{
	  ...mapMutations(['mutationLoing',"mutationLoingnname",'mutationsAccesstoken','mutationAuthorId']),
	  //执行用户登录操作
	  dologin:function(){
		//发送ajax请求
      console.log('111');

		  var app=this;
		  this.$http.post('/accesstoken',{
			//Cnode里面的 accesstoken就是
			//接收 post 参数
			//accesstoken String 用户的 accessToken
			//如果成功匹配上用户，返回成功信息。否则 403。
			  accesstoken:this.accesstoken
		  }).then(function(response){
			  //查看返回的结果
			  //这里需要一个Cnode的accesstoken的码 才会返回成功
			  console.log(response);
			  //ajax是异步请求，此时this不能指代当前对象
				if(response.data.success){   //登录成功
					//1、修改登录状态
					app.mutationLoing(true);  //()里面是参数
					app.mutationLoingnname(response.data.loginname);
					app.mutationsAccesstoken(app.accesstoken);
					app.mutationAuthorId(response.data.id);
					//2、是实现本地化存储，localstorage
					//2-1.登录状态
					localStorage.setItem('loginStatus',true);
					//2-2.用户名
					localStorage.setItem('loginname',response.data.loginname);
					///2-3.acc
					localStorage.setItem('accesstoken',app.accesstoken);
					//2-4.用户id
					localStorage.setItem('momo',response.data.id);

					//3、跳转页面
					app.$router.push('/user/'+response.data.loginname)
				}
		  })
	  }
  }
}


</script>

<style>
</style>
