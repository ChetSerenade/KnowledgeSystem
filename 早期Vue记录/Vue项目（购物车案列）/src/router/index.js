import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cartlist from '@/components/Cartlist' //@表示src路径
import Goods from '@/components/Goods'


Vue.use(Router)

export default new Router({
  //当路由链接被选中时 自动添加class属性
  linkExactActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/cart',
      name: 'cartlist',
      component:Cartlist
    },
    {
      path:'/goods/:id',
      name:'goods',
      component:Goods,
      //动态路由参数的获取
      props:true
    }
  ]
})
