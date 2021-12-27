<template>
  <div id="app" class="container">
    <table class="table table-hover table-bordered">
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>操作</th>
      </tr>
      <tr v-for="(user,index) in users" :key="index">
        <td>{{index+1}}</td>

        <td>
          <template v-if="user.id !=id">{{user.username}}</template>
          <template v-else>
            <input type="text" v-model="user.username" @blur="momo(user.username,user.age)" />
          </template>
        </td>

        <td>{{user.age}}</td>
        <td>
          <a href="#" @click.prevent="deljia(user.id)">编辑</a> |
          <a href="#" @click.prevent="delUser(user.id,index)">删除</a>
        </td>
      </tr>
    </table>
    <div>
      <h6>添加新记录</h6>
      <form>
        <div>
          <label>姓名</label>
          <input type="text" v-model="username" />
        </div>
        <div>
          <label>年龄</label>
          <input type="text" v-model="age" />
        </div>
        <div>
          <button @click.prevent.stop="adduser">添加</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import queryst from "querystring";

export default {
  data: function () {
    return {
      users: [],
      username: "",
      age: "",
      id:''
    };
  },

  methods: {
    //修改
    deljia: function (id) {
      this.id = id;
    }, 
    //失去焦点
    momo: function (name, age) {
      var x = name;
      var c = age;
      this.$axios.get("/UserUpdateControl?id=" + this.id + "&username=" + x + "&age=" + c).then(function (res) {});
      this.id = "";
      //这里需要清空input框 要不然会永远相对 判断
    },

    //删除
    delUser: function (id, index) {
      var app = this;
      this.$axios.get("/UserInsertControl?id=" + id).then(function (response) {
        console.log(response);
        if ((response.data = "删除成功")) {
          //删除成功之后，同步更新到users数组
          //splice截取  第一个参数是开始下标  第二个参数是个数
          app.users.splice(index, 1);
        }
      });
    },
    //添加用户
    //添加用户 可以使用params参数格式 默认是json格式 需要转化为查询字符串
    adduser: function () {
      var app = this;
      //查询字符串
      // var params= new URLSearchParams;
      // params.append('username',this.username);
      // params.append('age',this.age);

      //使用querystring扩展包形式
      var params = queryst.stringify({
        username: this.usernamem,
        age: this.age,
      });

      this.$axios.post("/UserInsertControl", params).then(function (response) {
        console.log(response);
        if (response.status == "200") {
          //数据添加到数据库了，应该把数据添加到users数组，方便页面显示
          var tian = {
            username: app.username,
            age: app.age,
          };
          app.users.push(tian);
          app.username = "";
          app.age = "";
          // app.users.push({
          //   username:app.username,
          //   age:app.age
          // })

          // //清空input框架
          // app.username="";
          // app.age="";
        }
      });
    },
  },

  //vue对象创建完成以后获取数据
  created: function () {
    var app = this; //辅助变量保存当前的this对象
    //发送ajax请求
    this.$axios.get("/UserControl").then(function (response) {
      //then表示ajax请求成功后要调用的回调函数
      console.log(response);
      //ajax属于异步请求 接收到响应后，不处于
      app.users = response.data;
    });
  },
  mounted: function () {
    console.log(this.$axios);
  },
};
</script>

<style>
</style>
