<template>
  <div>
    H组件
    <div>
      <button @click.prevent="emitEvent">通知news更新数据</button>
    </div>
  </div>
</template>

<script>
// import bus from "../store/index";
export default {
  name: "Home",
  data() {
    return {
     
    }
  },
  methods:{
   emitEvent(){
      //修改store.staste中的数据
      console.log('111');
     //store.state数据不允许直接修改 需要调用mutations函数
      this.$store.commit('inc');
    }
  }

};
</script>