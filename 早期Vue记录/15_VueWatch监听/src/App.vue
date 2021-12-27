<template>
  <div id="app">
    <h4>路由导航</h4>
    <!-- <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link> -->
    <!-- <router-link to="/user">user</router-link> -->

    <!-- <router-link to="/user/1/liiuyunchao age=30 ">user-1</router-link>
    <router-link to="/user/2/huahua">user-2</router-link>
    <router-link to="/user/3/xiaohua">user-3</router-link> -->

    <!-- 第三个传递方式 -->
    <router-link :to="{name:'user',params:{id:10,username:'test'},query:{age:18}}">to属性传递</router-link>
    <div>
      <h4>路由出口:匹配的路由文件在这显示</h4>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {};
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
