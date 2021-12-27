<template>
    <div>
        <h5>
            编辑话题
        </h5>
        <group>
            <x-textarea v-model="topic.title" placeholder="标题" :max='30' :rows='1'></x-textarea>
            <x-textarea v-model="topic.content" placeholder="内容" :max='300' :rows='6'></x-textarea>
        </group>
        <x-button type='primary' @click.native='eddtopic'>编辑话题</x-button>
    </div>
</template>
<script>
import {Group,XTextarea,XButton} from 'vux'
export default {
    name:'edit',
    components:{
        Group,
        XTextarea,
        XButton
    },
    data:function(){
     return{
         topic:{
           title:'',
         content:''
         }
         
     }
    },
    methods:{
        eddtopic:function(){
            //发送ajax请求 实现修改功能
            //跳转返回
           this.$router.back();
        }
    },
    beforeRouteEnter:function(to,from,next){
        next(function(vm){
           vm.$http.get('/topic/'+to.params.id).then(function(response){
               vm.topic=response.data.data
           })
        })
    },
    beforeRouteUpdate:function(to,from,next){
        next(function(vm){
           vm.$http.get('/topic/'+to.params.id).then(function(response){
               vm.topic=response.data.data
           })
        })
    }
}
</script>
