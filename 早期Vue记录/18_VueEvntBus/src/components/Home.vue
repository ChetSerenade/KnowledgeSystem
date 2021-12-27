<template>
  <div>
    H组件
    <div>
      <button @click.prevent="emitEvent">通知news更新数据</button>
    </div>
  </div>
</template>

<script>
import bus from "../EvntBus";
export default {
  name: "Home",
  data() {
    return {
      //控制是否触发自定义事件
      emit: false,
    };
  },
  methods: {
    emitEvent() {
        this.emit=true;
    },
  },
  //销毁之前的回调函数
  beforeDestroy() {
    if (this.emit) {
      bus.$emit("myevent", 222);
    }
  },
};
</script>