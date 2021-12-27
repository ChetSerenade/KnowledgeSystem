<template>
  <div>
    <h5>商品列表</h5>
    <ul>
      <li v-for="(item,index) in goodsList" :key="index">
        <router-link :to="'/goods/'+item.id">{{item.username}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  //组件创建完成后，调用ajax
  //created 创建对象之后的回调，data已经存在
  created() {
    //方法一:1、直接调用actions函数  因为actions发送了ajax获取了数据
    // this.$store.dispatch('actionGoodsList');

    //方法二:2、借助mapActions辅助函数
    //这里表示指向ajax
    this.actionGoodsList();
  },
  methods: {
    //这里获取的是actions里面的 ajax获取的接口数据
    ...mapActions(["actionGoodsList"]),
  },
  computed: {
    //方法一:直接获取sta数据  然后遍历一下可以显示出来
    // goodsList: function () {
    //   return this.$store.state.goodsList;
    // },

    //方法二:借助mapState辅助函数
    //表示获取列表商品数据的商品详情
    ...mapState(["goodsList"]),
  },
};
</script>

<style scoped>
</style>