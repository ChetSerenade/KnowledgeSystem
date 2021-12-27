<template>
    <div>
        news组件
    </div>
</template>

<script>
import bus from '../EvntBus'
export default {
    name:'news',
    //在传之后销毁
    //监听自定义事件 、 v-on或者$on
    created(){
        bus.$on('myevent',function(nval){
                console.log('接收到的nval='+nval)
        })
    },
    // 解绑传递  要不然会传递很多次
    destroyed(){
        bus.$off('myevent');
    }
}
</script>