<template>
    <div>
        news组件
        <h5>
            age={{age}}
        </h5>
    </div>
</template>

<script>
// import store from '../store/index'
export default {
    name:'news',
    //store建议在computed中使用
    computed:{
        age:function(){
            //this是当前组件对象
            return this.$store.state.age
        }
    }
    

}
</script>