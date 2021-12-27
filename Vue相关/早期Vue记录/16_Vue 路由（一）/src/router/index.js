//路由文件

//1、引入 路径 和 组件
import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '../components/User.vue';

//2、全局注册
Vue.use(VueRouter);


//3、定义路径信息对象数组
//path属性：表示路由匹配路径
//components属性 表示路由匹配的组件
const routes= [
    {path:'/user/:id',component:User,props:true},  
]

//4、创建路由管理器
//调用了 上面的
const router= new VueRouter({
  routes
})


//5、对外输出
export default router;