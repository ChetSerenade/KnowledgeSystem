import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'

Vue.use(Vuex)

const store=new Vuex.Store({
	//state 存放共享数据
	state:{
		//导航分类数据
		topics: [{
				name: 'all',
				desc: '全部'
			},
			{
				name: 'good',
				desc: '精华',
			},
			{
				name: 'share',
				desc: '分享',
			},
			{
				name: 'ask',
				desc: '问答',
			},
			{
				name: 'job',
				desc: '招聘',
			},
			{
				name: 'dev',
				desc: '测试',
			},
		],

		//是否显示 三个小店
		isSHow:false,
		//用户登录显示actionsheet菜单
		loginedMoerMenus:{
			create:'发表话题',
			center:'个人中心',
			msg:'消息通知',
			logout:'登出',
		},
		//没有登录显示
		unloginedMoerMenus:{
			login:'登录index'
		},
		//判断是否登录
		isLoginde:false,
		//用户登录名
		loginname:'111',
		//accesstoken
		accesstoken:'',
		//用户登录id
		author_id:''
	},
	//状态数据的计算属性
	getters:{
		//action菜单
		// moerMenus:function(state){
		// 	//参数state表示当前store对象的state数据
		// 	if(state.isLoginde){
		// 		//根据用户登录状态，返回对应的菜单
		// 		return state.loginedMoerMenus
		// 	}
		// 	return state.unloginedMoerMenus
		// },
		//分类显示对应的中文
		getTopicDescByTab:function(state){
			return function(tab){
				for(var i=0;i<state.topics.length;i++){
					if(state.topics[i].name == tab){
						return state.topics[i].desc
					}
				}
			}
		}
	},
	//mutations函数修改数据
	mutations:mutations,
})

export default store;
