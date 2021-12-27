<template>
  <div id="app">
    <h5>路由导航</h5>
    <!-- <router-link to="/user/2587">user1</router-link>
		<router-link to="/user/2588">user2</router-link>
    <router-link to="/user/2589">user3</router-link>-->

    <router-link v-for="user in  users" :key="user.id" :to="'/user/'+user.id">{{user.username}}</router-link>
   
    <router-link to="/user/11">跳转用户信息11</router-link>

    <h5>路由出口显示</h5>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      users: [],
    };
  },
  created: function () {
    var app = this;
    this.$axios.get("/UserControl").then(function (response) {
      console.log(response.data);
      app.users = response.data;
    });
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
