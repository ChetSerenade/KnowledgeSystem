import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex);

export default new Vuex.Store({
    //state存储共享数据
    state:{
        goodsList: [], //表示商品列表
        cartGoodsList: []
    },
    //gettsren表示计算属性
    getters:{
    //获取指定id的商品数据
    getGoodsById:function(state){
    //参数state表示当前store对象的state数据
    //目的 通过id获取整条对象
    return function(goodsid){
        //通过遍历state.goodsList数据来找到相同的id 
        for(var i=0;i<state.goodsList.length;i++){
            //进行判断是否相同的id
            if(state.goodsList[i].id == goodsid){
               //如果是找到相同的数据 就返回此数据！
               return state.goodsList[i];
           }
            // var good=state.goodsList[i];
            // if(good.id==goodsid){
            //return good;
        }
    }
    }
    },
    //计算总金额
    cartAmount:function(state){
        //参数state表示当前store对象的state数据
        var amount= 0;
        for(var i=0;i<state.cartGoodsList.length;i++){
            var element = state.cartGoodsList[i];
            amount+=element.count*element.goods.age
        }
        return amount
    },
    //mutations同步修改数据
    mutations:mutations,

    //actions异步获取数据
    actions:actions
})
