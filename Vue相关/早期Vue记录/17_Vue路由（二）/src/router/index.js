//路由文件

//1、引入
import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../components/About.vue';
import Home from '../components/Home.vue';
import News from '../components/News.vue';
import User from '../components/User.vue';


//2、全局注册
Vue.use(VueRouter);


//3、定义信息路径
const routes=[

    {
      path:'/',
      component:{
        default:Home,
        aa:News
      }
    }, //根目录
    {path:'/About/',component:About,alias:'/c'}, //alias别名路由
    {path:'/Home/',component:Home},
    {path:'/News/',component:News},
      {
        path: '/User/:id', //动态路由声明 :+id
        component: User,
        props:true,  //表示把动态路由参数 作为props属性传递
        children:[
          {path:'news',component:News},   //User/news
          {path:'about',component:About} 
        ]
      },

    {path:'/a',redirect:'/News'}  //redirect 重定向
]

//4、创建路由管理
const router = new VueRouter({
  routes,
  mode:'history'  //模式 少了一个#号
})

//5、对外输出
export default router;