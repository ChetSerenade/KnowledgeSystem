<template>
  <div>
    <h5>发表新话题</h5>
    <!-- 使用 -->
    <group>
      <x-textarea v-model="title"  placeholder="标题"  :max='30' :rows='1'></x-textarea>
      <x-textarea  v-model="content" placeholder="内容" :max='300' :rows='6'></x-textarea>
    </group>
    <!-- 无法触发加一个 native -->
    <x-button type="primary" @click.native='addtopic'>添加新话题</x-button>
  </div>
</template>

<script>
// 引入
import { XTextarea, Group, XButton } from "vux";
export default {
  name: "create",
  // 注册
  components: {
    XButton,
    XTextarea,
    Group,
  },
  data:function(){
      return {
          title:'',
          content:''
      }
  },
  methods:{
      addtopic:function(){
          console.log(this.content);
          console.log(this.title);
          //发送ajax
          //跳转页面
          this.$router.replace('/topiclist/dev');
      }
  }
};
</script>>