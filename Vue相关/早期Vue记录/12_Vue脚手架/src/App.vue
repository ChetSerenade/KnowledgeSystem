<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- 使用 -->
    <pagelinks :pages='pages'></pagelinks>
  </div>
</template>


<script>
//1、引入    ./表示当前目录
import pagelinks from "./components/pagelinks.vue";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      pages:7
    };
  },
  //2、注册 可以全局 可以局部 建议局部
  //html5 如果属性和值一样 可以省略只写一个
  components: {
    pagelinks,
  },
};
</script>

<style lang="scss">
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
