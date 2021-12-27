<template>
  <div>
    <h5>用户详细信息</h5>
    <p>用户id:{{id}}</p>
    <p>姓名:{{user.username}}</p>
    <p>年龄id:{{user.age}}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: [],
    };
  },
  props: ["id"],
  // created:function(){
  //   this.fetchData(this.id)
  //   //在动态路由中，切换得是皇后不会重新调用生命周期钩子函数
  // },
  //第一种方式
  // watch:{
  //   $route:function(to,from){
  //     //to表示即将到达得路由对象
  //     console.log(to.params.id);
  //     //根据id重新发送ajax请求 显示数据
  //     this.fetchData(to.params.id);
  //   }
  // },
  methods: {
    //发送ajax请求，获取数据
    fetchData: function (id) {
      var app = this;
      this.$axios
        .get("UserControl?id=" + id)
        .then(function (response) {
          if (response.data[0] != "D") {
            app.user = response.data[0];
          } else {
            app.erroe = "数据请求失败";
          }
        })
        .catch(function (err) {
          //如果是网址错误会提示
          console.log(err);
        });
    },
  },

  //导航守卫
  //第二种方式
  //进入之前得回调函数
  beforeRouteEnter: function (to, from, next) {
    //to表示待加载得路由对象[即将要进入]
    //from表示即将要离开得路由对象
    //next表示要继续执行下一步
    //强调：导航守卫 最后一定要调用next() 函数 从而进行下一步操作
    //此时，还未来进入路由组件 不能使用this访问组件对象
    next(function (vm) {
      //vm表示将要加载得组件对象 相当于this
      vm.fetchData(to.params.id);
    });
  },
  //路由切换时得回调函数
  beforeRouteUpdate: function (to, from, next) {
    //to表示待加载得路由对象[即将要进入]
    //from表示即将要离开得路由对象
    //next表示要继续执行下一步
    //此时已经在组件内部，可以使用this访问组件
    //this指代即将要离开得路由组件对象
    this.fetchData(to.params.id);
    //next函数必须调用，否则程序中断，不再像后执行
    next();
  },
};
</script>

<style>
</style>
