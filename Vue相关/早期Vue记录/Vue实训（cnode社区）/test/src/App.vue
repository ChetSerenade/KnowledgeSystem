<template>
  <div id="app">
    <div>
      <!-- 三个点      是否显示           点击三个点时，触发事件-->
      <x-header @on-click-title="$router.replace('/')" >conde移动端社区

      <div slot="right" @click="showMoreMenus">
        <a class="vux-header-more">
          <badge :text="badegText" class="po">
          </badge>
        </a>
      </div>
      </x-header>
      <!-- 显示小点中的内容   动态绑定事件   是否显示当前元素   点击菜单时触发  -->
      <actionsheet
        :menus="moreMenus"
        v-model="isSHow"
        @on-click-menu="handelClickMoreMenu"
      ></actionsheet>
      <!-- <tab> -->
        <!-- tab切换导航  vux组件中的内容   selected 是让默认选中第一个      @onxxx的是点击时，触发的事件，传递当前下标-->
        <!-- <tab-item
          v-for="(i, index) in topics"
          :key="index"
          :selected="$route.path == '/topiclist/' + i.name"
          @on-item-click="Tab(index)"
        >
          {{ i.desc }}
        </tab-item>
      </tab> -->
    </div>
    <router-view></router-view>
    <!-- 使用的返回顶部的组件 -->
    <vm-back-top></vm-back-top>
  </div>
</template>

<script>
// 局部注册vux组件
import {
  //引入
  // Tab,
  // TabItem,
  Badge,
  XHeader,
  Actionsheet,
} from "vux";
//导入数组展开对象
import { mapState,mapMutations,mapGetters} from "vuex";
//返回顶部 利用了cnpm install  vue-multiple-back-top  --save-dev 进行了安装 然后引入使用
import VmBackTop from 'vue-multiple-back-top'
export default {
  name: "app",
  components: {
    //注册
    // Tab,
    // TabItem,
    Badge,
    VmBackTop,
    XHeader,
    Actionsheet,
  },
  data: function () {
    return {
        badegText:0
    };
  },
// 登录状态维持
  created: function () {
    //获取状态码
    var loginStatus = localStorage.getItem("loginStatus");
    var loginName = localStorage.getItem("loginname");
    var loginaccesstoken = localStorage.getItem("accesstoken");
    var loginAuthorId=localStorage.getItem('momo');
    var badegText=localStorage.getItem('badegText');
    //把数据写到vuex中
    if (loginStatus) {
      //修改登录的状态
	  this.mutationLoing(true);
	  //修改name
	  this.mutationLoingnname(loginName);
	  //修改accesstoken
    this.mutationsAccesstoken(loginaccesstoken);
    //修改值
    this.mutationAuthorId(loginAuthorId);
    //获取未读消息
    this.getUnreadMsgCount();
      var app=this;
    window.setInterval(function(){
      app.getUnreadMsgCount();
    },1000*60*10)

    }
  },
  computed: {
	//状态数据获取，建议放在computed里面
	//方法一、this.$store.state.属性
	//方法二、借助mapstate辅助函数  ...是es6的语法 对象展开运算符
    ...mapState([
      "topics",
      "isSHow",
      "loginedMoerMenus",
      "unloginedMoerMenus",
      "isLoginde",
  ]),

    //action菜单显示
    moreMenus: function () {
      if (this.isLoginde) {
        //如果是登录 显示登录 isLoginde表示状态登录
        return this.loginedMoerMenus;
      } else {
        return this.unloginedMoerMenus;
      }
    },
    isSHow: {
      set: function (nav) {
        //调用mutations函数，修改actionsheet的显示状态
        this.$store.commit("mutationIsShowMoreMens", nav);
      },
      get: function () {
        return this.$store.state.isSHow;
      },
    },
  },
//点击切换
  methods: {
    ...mapMutations(["mutationLoing","mutationLoingnname",'mutationsAccesstoken','mutationAuthorId']),
    //点击路由时，实现路由跳转
    // Tab: function (index) {
    //   //编程式路由跳转
    //   this.$router.push("/topiclist/" + this.topics[index].name);
    // },
    //点击三个点时，显示actionsheet菜单
    showMoreMenus: function () {
      //点击时，切换显示
      this.isSHow = true;
    },
    //点击 actionsheet时，回调函数
    handelClickMoreMenu(menukey, menui) {
      // console.log(menukey);
      // console.log(menui);
      //跳转到对应页面，路由跳转
      this.$router.push("/" + menukey); //编程式路由调转，参数就是
    },
    //发送ajax请求获取服务器末端消息的个数
    getUnreadMsgCount(){
      var app=this;
      this.$http.get('/message/count',{
        params:{
          accesstoken:this.$store.state.accesstoken
        }
      }).then(function(response){
        console.log(response.data);
        app.badegText=response.data.data;
      })
    }
  },
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
.po{
  margin-right: 4px;
}
</style>
