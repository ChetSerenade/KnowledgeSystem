<template>
  <div id="app">
    <router-link to="/About">关于我们 About</router-link>
    <router-link to="/Home">首页东西 Home</router-link>
    <router-link to="/News">新闻中心 News</router-link>
    <router-link to="/User/2">个人中心 User</router-link>
    <router-link to="/a">重定向-a</router-link>
    <router-link to="/c">别名路由-c</router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
