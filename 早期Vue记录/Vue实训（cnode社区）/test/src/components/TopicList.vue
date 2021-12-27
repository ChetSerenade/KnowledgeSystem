<template>
  <div>
     <tab>
        <!-- tab切换导航  vux组件中的内容   selected 是让默认选中第一个      @onxxx的是点击时，触发的事件，传递当前下标-->
        <tab-item v-for="(i, index) in topics" :key="index"  :selected="$route.path == '/topiclist/' + i.name"  @on-item-click="Tab(index)" >
          {{ i.desc }}
        </tab-item>
      </tab>
    
    <!-- vux组件的 绑定使用 具体请看vux组件的官方使用说明 -->
    <scroller height="-46px" lock-x scrollbarY use-pullup  use-pulldown :pullup-config="pullupConfig" :pulldown-config="pullupConfig2" @on-pullup-loading="loadMoreData"   @on-pulldown-loading="xiaxia" ref="pullup"  >
      <group>
        <!-- 遍历数据  利用vux的组件进行样式绑定     只获取每一个的标题title     是否为链接，如果是，右侧将会出现指引点击的右箭头 -->
        <cell v-for="(item, index) in lists" :key="index" :title="item.title" :link="'/topic/' + item.id" >
        <!-- 显示的时数据 -->
          <span slot="title" class="cell-title">
            <span class="reply_count">{{ item.reply_count }}</span>
            /
            <span class="visit_count">{{ item.visit_count }}</span>
            <span class="top" v-if="item.top">置顶</span>
            <span class="tab">{{ getDescByTab(item.tab) }}</span>
            <span class="title">{{ item.title }}</span>
          </span>
          <!-- 图片的加载 -->
          <span slot="icon" class="author_avater"
            ><img :src="item.author.avatar_url" alt=""
          /></span>
        </cell>
      </group>
    </scroller>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Group, Cell, Scroller, Tab,TabItem, } from "vux";
export default {
  props: ["name"],
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    Scroller,
  },
  computed:{
    ...mapState(['topics'])
  },
  data: function () {
    return {
      lists: [],
      page: 1, //当前页数
      limit: 5, //每页显示的数量
      //上垃拉加载的数据
      pullupConfig: {
        content: "上拉加载更多",
        downContent: "松开进行加载",
        upContent: "上拉加载更多",
        loadingContent: "加载中...",
      },
      //下拉加载的显示
      pullupConfig2: {
        content: "下拉加载更多",
        downContent: "松开进行加载",
        upContent: "下拉加载更多",
        loadingContent: "加载中...",
      },
    };
  },
  methods: {
    //根据tab获取中文显示
     getDescByTab(tab){
      return this.$store.getters.getTopicDescByTab(tab)
    },
     //点击路由时，实现路由跳转
    //点击实现跳转
      Tab: function (index) {
      //编程式路由跳转
      this.$router.push("/topiclist/" + this.topics[index].name);
    },
    //上拉刷新时 ajax加载更多请求
    loadMoreData() {
      var app = this;
      this.page = this.page + 1; //当前页面数加1
      this.$http
        .get("/topics", {
          params: {
            tab: this.name,
            page: this.page, //当前页数
            limit: this.limit, //显示几条数据的传递
          },
        })
        .then(function (response) {
          if (response.data.success) {
            //ajax是异步数据请求 此时this不再表示当前组件对象
            // app.lists = response.data.data;
            //拼接到一起 push末尾追加 ...对象咱开运算符 会比遍历后面的数组
         
            app.lists.push(...response.data.data);
           
            //手动结束上拉刷新事件
            //refs属性池 父组件获取子组件
            app.$refs.pullup.donePullup();

          }
        });
    },
    //下拉刷新
    xiaxia(){
      var app = this;
      this.page = this.page + 1;
      this.$http
        .get("/topics", {
          params: {
            tab: this.name,
            page: this.page, //当前页数
            limit: this.limit, //显示几条数据的传递
          },
        })
        .then(function (response) {
          if (response.data.success) {
            //使用JS拼接字符串的方法 concat进行 下拉之后数据拼接
            // app.lists=app.lists.concat(response.data.data)
            app.lists=response.data.data;
            //手动结束上拉刷新事件
            //refs属性池 父组件获取子组件
            app.$refs.pullup.donePullup();
          }
        });
    }
  },
  //发送ajax请求，获取数据，显示再页面中
  //axios动态路由组件
  //1、created + watch
  //2、路由导航守卫 beforeRouteEnter   beforeRouteUpdate
  beforeRouteEnter: function (to, from, next) {
    //to表示即将进入的路由组件
    //from表示即将离开的路由组件
    //next表示继续指向下一步
    //this.$http.get('/topics')    beforeRouteEnter是进入组件之前的回调函数 不能只用this
    next(function (vm) {
      //参数vm表示当前组件的实列对象
      vm.$http
        .get("/topics", {
          params: {
            tab: to.params.name, //传递值
            page: vm.page, //当前页数
            limit: vm.limit, //显示几条数据的传递
          },
        })
        .then(function (response) {
          // console.log(response);
          vm.lists = response.data.data;  //显示的数据给传到数组lists里面去页面显示
        });
    });
  },
  //动态路由切换时的导航守卫
  beforeRouteUpdate: function (to, from, next) {
    var app = this;
    //可以使用this表示当前组件对象
    //get发送的请求 去获取数据
    this.$http
      .get("/topics", {
        params: {
          tab: to.params.name,
          page: this.page,
          limit: this.limit,
        },
      })
      .then(function (response) {
        console.log(to.params.name);
        if (response.data.success) {
          app.lists = response.data.data;
        }
      });
    //指向下一步
    next();
  },
};
</script>

<style>
.cell-title {
  font-size: 0.8em;
}
.cell-title .reply_count {
  color: #9e78c0;
}
.cell-title .visit_count {
  color: #9999;
}
.cell-title .top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
}
.cell-title .tab {
 background: brown;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
}
.author_avater img {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  margin-right: 5px;
}
</style>
