<template>
	<div>
		center组件
	</div>
</template>

<script>
export default {
	name:'center',
	//1、获取登录名
	computed:{
		loginname:function(){
			return this.$store.state.loginname;
		}
	},
	//2、跳转到user
	created:function(){
		//编程式路由跳转
		//this.$router.push会向histor添加一个记录，点击后退会返回上一个页面，也就是canter
		//this.$router.replace不会向histoey添加一个记录，点击退出会返回上一个页面
		this.$router.replace('/user/'+this.loginname);
	}

}

</script>

<style>
</style>
