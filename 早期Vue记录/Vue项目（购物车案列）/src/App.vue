<template>
  <div id="app">
    <!-- 路由导航 -->
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href class="navbar-brand">vue实例</a>
        </div>
        <ul class="nav navbar-nav">
          <router-link to="/" tag="li">
            <a>首页</a>
          </router-link>
          <router-link to="/cart" tag="li">
            <a>购物城</a>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        <!-- 路由出口 -->
        <router-view />
        <!-- 缩写 相当于 <router-view></router-view> -->
        <!-- <router-view/> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
