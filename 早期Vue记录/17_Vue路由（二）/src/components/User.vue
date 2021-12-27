<template>
  <div>
    <div>
      <!-- user.id={{$route.params.id}} -->
      user.id={{id}}
    </div>
    <div>
      <h6>嵌套路由</h6>
      <!-- 路由导航 -->
      <!-- to="/user/2/news" -->
      <router-link :to="'/User/'+id+'/news'">子路由news</router-link>
      <router-link :to="'/User/'+id+'/abous'">子路由abous</router-link>路由出口
      <router-view></router-view>
      <router-view name="aa"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ["id"],
};
</script>