//路由文件

//1、引入
import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../components/About.vue';
import Home from '../components/Home.vue';
import News from '../components/News.vue';
import Child from '../components/Child.vue';


//2、全局注册
Vue.use(VueRouter);


//3、定义信息路径
const routes=[
    {path:'/',component:Home},
    {path:'/About/',component:About},
    {path:'/Home/',component:Home},
    {path:'/News/',component:News},
  
  
]

//4、创建路由管理
const router = new VueRouter({
  routes,
  mode:'history'  //模式 少了一个#号
})

//5、对外输出
export default router;