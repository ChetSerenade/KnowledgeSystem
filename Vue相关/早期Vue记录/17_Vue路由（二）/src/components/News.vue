<template>
    <div>
      新闻中心
        <a href="" @click.prevent.stop="jump">跳转啊啊啊啊！</a>
    </div>
</template>

<script>
export default {
    name:'News',
    methods:{
        jump:function(){
            //编程试路由跳转
            //this.$router 获取路由管理器
            //push表示跳转到特定得路由中
            // this.$router.push('/About');
            this.$router.push({
                path:'/About',
                query:{
                    id:2222
                }
            })
        }
    }
}
</script>