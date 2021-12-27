<template>
  <ul>
    <!-- <li>query.age = {{$route.query.age}}</li> -->
    <!-- <li>useid= {{ $route.params.id }}</li>
    <li>user-name= {{ $route.params.username}}</li>-->
    <li>user-id ={{id}}</li>
    <li>user-username = {{username}}</li>
    <li>query.age = {{age}}</li>
  </ul>
</template>
<script>
export default {
  name: "User",
  props: ["id", "username","age"],
  mounted: function () {
    console.log("user 生命周期调用");
  },
  //watch监听动态路由参数变化
  watch: {
    //当$route发送变化时，会触发watch监听
    $route: function (to, from) {
      //to:表示即将到达的动态路由信息对象
      //from:表示上一个(离开)的动态路由信息对象
      console.log(to);
      console.log(from);
    },
  },
};
</script>