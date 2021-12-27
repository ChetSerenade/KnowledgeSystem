import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import TopicList from '@/components/TopicList.vue'
import Center from '@/components/Center.vue'
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
import Message from '@/components/Message.vue'
import Topic from '@/components/Topic.vue'
import User from '@/components/User.vue'
import create from '@/components/create.vue'
import Edit from '@/components/Edit.vue'
import colloctions from '@/components/Colloctions.vue'

// 解决重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


//引用全局注册
Vue.use(VueRouter)
//定义路由信息对象数组
 const routes = [
//   {path: '/',name:'home', component: Home},

{ path:'/',redirect:'/topiclist/all'},
  //列表
{path:'/topic/:id',name:'topic',component:Topic,props:true},
  //列表详情
{path: '/topiclist/:name',name:'topiclist',component: TopicList,props:true},
//个人中心
{path: '/center',name:'center',component: Center,},
//登录
{path: '/login',name:'login',component: Login,},

{path:'/create',name:'create',component:create,},
//发表新话题

{path:'/topic/:id/edit',name:'edit',component:Edit,props:true},
//变价话题

//个人中心
{path:'/user/:loginname',name:'user',component:User,props:true},
{path:'/user/:loginname/colloctions',name:'colloctions',component:colloctions,props:true},
//收藏界面


{ path: '/home',name:'home',component: Home,},
//登出
{ path: '/logout',name:'logout',component: Logout,},
//消息中心
{path: '/message',name:'message',component: Message,},]

//创建路由管理器
const router = new VueRouter({
  routes
})
//对外输出
export default router
