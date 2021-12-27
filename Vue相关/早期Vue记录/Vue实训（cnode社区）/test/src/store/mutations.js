const mutations = {
	//修改actionsheet是否显示
	mutationIsShowMoreMens: function(state, pay) {
		//将传递的值 赋值给仓库的值
		state.isSHow = pay;
	},
	//payload 是进行传值的
	//修改登录状态函数
	mutationLoing: function (state, payload) {
		state.isLoginde=payload;
	},
	//修改登录名
	mutationLoingnname: function (state, payload) {
		state.loginname = payload;
	},
	//修改accesstoken
	mutationsAccesstoken: function (state, payload) {
		state.accesstoken = payload;
	},
	//修改用户id
	mutationAuthorId:function(state,payload){
		state.author_id=payload;
	},
	//实现注销操作(修改登录状态)
	mutationLogout: function (state) {
		state.isLoginde = false;
		state.loginname='';
		state.accesstoken='';
	}
}
export default mutations;
