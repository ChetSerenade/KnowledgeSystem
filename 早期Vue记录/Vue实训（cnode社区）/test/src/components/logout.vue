<template>
  <div>
	  <!-- 中间值进行判断 -->
    <msg  v-if='isSHowMsg' title="操作失败" description="不允许访问！我谢谢你！" icon="warn" :buttons="buttons" >
    </msg>
  </div>
</template>

<script>
import { Msg } from 'vux';
export default{
	name:'logout',
	components:{
		Msg
	},
	data:function(){
		return{
			//中间值进行判断
			isSHowMsg:false,
			buttons:[
				{
					type:'primary',
					text:'跳转到登录页面',
					link:'/login'

				}
			]
		}
	},
	created:function(){
		if(this.$store.state.isLoginde==false){
			//中间值进行判断
			this.isSHowMsg=true;
			// console.log()
			return;
		}
		//注销操作
		//1、vuex中状态数据恢复  借助mutations函数
		this.$store.commit('mutationLogout');
		//2、清空localstorage中的数据
		localStorage.clear();
		//3、增加一个跳转页面
		this.$router.push('/');
	}
}


</script>

<style>
</style>
