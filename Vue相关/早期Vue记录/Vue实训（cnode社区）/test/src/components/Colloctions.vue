<template>
  <div>
    <!-- {{loginname}} -->
    <card :header="{title:'收藏话题'}">
      <group slot="content">
         <cell v-for="(item,index) in collect_topics" :key='index' :title="item.title" is-link  :link="'/topic/'+item.id" >
          <span slot="icon" class="mo">
            <img :src="item.author.avatar_url" alt="">

          </span>
        </cell>
      </group>

    </card>
  </div>
</template>

<script>
import {Group,Cell,Card} from 'vux'
export default {
    name:'Collotcions',
    props:['loginname'],
    components:{
      Group,
      Cell,
      Card
    },
    data:function(){
      return{
        collect_topics:[]
      }
    },
     beforeRouteEnter:function(to,from,next){
        //进入路由之前，this不能指代当前对象
        next(function(vm){
            //获取用户收藏的主题信息
            vm.$http.get('/topic_collect/'+to.params.loginname).then(function(response){     
                vm.collect_topics=response.data.data;
            })
        })
    },
    beforeRouteUpdate:function(to,from,next){
        var app=this;
            //获取用户收藏的主题信息
            app.$http.get('/topic_collect/'+to.params.loginname).then(function(response){     
                app.collect_topics=response.data.data;
            })
            next();
    }
}
</script>

<style>
.mo img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>
