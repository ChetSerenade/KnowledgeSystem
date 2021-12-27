<template>
  <div>
     <card :header="{title:userinfo.loginname}" :footer="{title:userinfo.create_at}"> 
         <div slot="content" class="card_conten">
             <p>
                 <img :src="userinfo.avatar_url" alt="">
             </p>
            <p>
                用户积分:{{userinfo.score}}
            </p>
            <p>
                <a :href="'/#/user/'+userinfo.loginname+'/colloctions'">{{collect_topics.length}}个话题收藏</a>
            </p>
            <p>
                <a :href="'https://github.com/'+userinfo.githubUsername">
                    @{{userinfo.githubUsername}}
                </a>
            </p>
         </div>

     </card>

    <card :header="{title:'最近创建的话题'}">
        <group slot="content"  v-if='userinfo.recent_topics.length>0'>
            <cell v-for="(item,index) in userinfo.recent_topics" :key='index' :title="item.title" is-link  :link="'/topic/'+item.id">
            <!-- 头像 -->
            <span slot="icon" class="momo">
            <p>
                 <img :src="userinfo.avatar_url" alt="">
             </p>
            </span>
            </cell>
        </group>
         <group slot="content" v-else>
            <cell title="没有参与话题"> </cell>
        </group>    
    </card>

     <card :header="{title:'最近参与的话题'}">
        <group slot="content" v-if='userinfo.recent_replies.length>0'>
            <cell v-for="(item,index) in userinfo.recent_replies" :key='index' :title="item.title" is-link  :link="'/topic/'+item.id">
            <!-- 头像 -->
            <span slot="icon" class="momo">
            <p>
                 <img :src="userinfo.avatar_url" alt="">
             </p>
            </span>
            </cell>
        </group>
        <group v-else slot="content">
            <cell title="没有话题"> </cell>
        </group>    
    </card>

  </div>
</template>

<script>
import {Card,Group,Cell} from 'vux'
export default {
    name:'user',
    props:['loginname'],
    data:function(){
        return{
            userinfo:{
        recent_replies:[],
         recent_topics:[]   
            },
            collect_topics:[]
        }
    },
    components:{
        Card,
        Group,
        Cell
    },
    props:['loginname'],
    beforeRouteEnter:function(to,from,next){
        //进入路由之前，this不能指代当前对象
        next(function(vm){
            vm.$http.get('/user/'+to.params.loginname).then(function(response){
                // console.log(response.data);
                vm.userinfo=response.data.data;
            });
            //获取用户收藏的主题信息
            vm.$http.get('/topic_collect/'+to.params.loginname).then(function(response){     
                vm.collect_topics=response.data.data;
            })
        })
    },
    beforeRouteUpdate:function(to,from,next){
        var app=this;
        this.$http.get('/user/'+to.params.loginname).then(function(response){
                // console.log(response.data);
                app.userinfo=response.data.data;
            });
    //获取用户收藏的主题信息
            app.$http.get('/topic_collect/'+to.params.loginname).then(function(response){     
                app.collect_topics=response.data.data;
            })
            next();
    }
}
</script>


<style>
.card_conten p {
    padding: 15px;
}
.card_conten img{
    width: 80px;
    height: 80px;
}
.momo img{
    width: 40px;
    height: 40px;
    padding: 10px;
}


</style>
