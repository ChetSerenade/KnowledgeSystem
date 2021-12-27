//路由文件

//引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入组件 
import Foo from '../components/Foo.vue'
import Bar from '../components/Bar.vue'
import User from '../components/User.vue'


//全局注册
Vue.use(VueRouter);


//定义路由信息对象
//path属性：表示路由匹配路径
//components属性 表示路由匹配的组件
const routes=[
    {path:'/foo',component:Foo},  //route 路由信息对象
    {path:'/Bar',component:Bar},    
    //第一种方式
    // {path:'/user/:id/:username',component:User},   //动态路由参数  params属性获取


    // 第二种方式: 先是props 定义true 再去定义 props  然后传入使用
    //解耦使用props
    // {path:'/user/:id/:username',component:User,props:true} 

    //第三种方式 to属性传递参数
    //to属性传递参数，如果有params参数，需要是命名路由
    // {path:'/user',name:'user',component:User,props:true}, 

    //第四种方式props是函数形式
    //props是函数形式，可以传递params和query
      {path:'/user',name:'user',component:User,props:function(route){
          return{
            id:route.params.id,
            username: route.params.username,
            age: route.query.age
          }
      }}
]

//创建路由管理器
//调用了 上面的
const router = new VueRouter({
    routes
})

//对外输出
export default router;