//1.引用
import Vue from 'vue';
import Vuex from 'vuex';

//2、全局注册
Vue.use(Vuex);


//3、创建数据仓库 store对象
const store=new Vuex.Store({
    //组件之间共享的数据存储在store.state中    
    state:{
        age:10
    },
    //改变状态数据需要统一的方法
    //修改方法放到mutations中
    // 相当于定义了一系列的methods 来修改状态数据
    mutations:{
        inc:function(state){
            //state参数表示当前store对象的state数据
            state.age+=1;
        }
    }
})

//4、对外输出
export default store;