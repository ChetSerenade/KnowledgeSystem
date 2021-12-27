import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import mutations from './mutations';
//2.全局注册

Vue.use(Vuex);

//3.创建数据仓库store


const store =new Vuex.Store({
    //开启严格模式
    strict:true,

    //多模块
    modules:{
        moduleA: {
            state:{
                name:'moduleA-name'
            }
        },
        moduleB:{
            state:{
                name:'moduleB-name'
            }
        }
    },

    //state 定义共享数据的
    state:{
        count:'10',
        age:20,
        users:[
            {name:'t1',age:18,id:1},
            {name:'t2',age:19,id:2},
            {name:'t3',age:17,id:3},
            {name:'t4',age:16,id:4}
        ]
    },
    //ggetters定义store对象的计算属性(多个数据的计算 或者过滤)
    getters:{
        //参数state表示当前store对象的state数据
        adults:function(state){
            return state.users.filter(function(item){
                return item.age>18
            })
        }
    },
    //在页面组件进行调用
    //mutations定义同步修改state数据的方法，方法名一般以mutation开头
    mutations:{
    
      mutationAge: function (state, payload) {
        //参数state表示当前store对象的state数据
        //payload 表示调用函数时用户传入的值
        state.age = payload;
      },
      mutationUsers: function (state, payload) {
        state.users = payload
      },
      mutationCount: function (state, payload) {
        state.count = payload
      },
    
},
    //actions定义异步修改state数据的方法,方法名一般以action开头
    actions:{
        actionUsers:function(context){
            //参数context表示当前的store对象 不是state数据

            //在action修改state数据，有二种方式 
            //第一个方式是直接修改 context.state.users=xxx 不建议直接修改
            //第二个方式 mutatios函数修改:context.commit('muationxxx')

            axios.get('http://180.76.165.143:8080/MyUser/UserControl').then(function(response){
           
            //采用直接修改
            // context.state.users=response.data
            
            //这是在函数中修改
            context.commit('mutationUsers',response.data);
            })
        }
    }
});
//4.对外输出

export default store;
