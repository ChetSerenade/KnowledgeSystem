import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/Home.vue'
import News from '../components/News.vue'

Vue.use(VueRouter);


const routes=[  
    {path:'/',component:Home},
    {path:'/news/',component:News}
     
]
const router =new VueRouter({
    routes
})

//5对外导出

export default router;