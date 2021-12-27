<template>
  <div v-if="topic">
    <article class="weui-article">
      <h2>{{ topic.title }}
        <x-button  type="primary" :mini="true" v-if="topic.is_collect==false" @click.native="collect">收藏</x-button>
        <x-button  :mini="true" v-else  @click.native="collects">取消收藏</x-button>
        <!-- 只能修改自己发布的话题 -->
         <x-button  type="primary" :mini="true" v-if="topic.author_id = $store.state.author_id"  :link="'/topic/'+topic.id+'/edit'">编辑</x-button>
 
      </h2>
      <section>
        <span>
          作者:
          <a :href="'/#/user/' + topic.author.loginname">{{
            topic.author.loginname
          }}</a>
        </span>
        <span>
          {{ topic.visit_count }}
          次浏览
        </span>
        <span>
          来自
          <a href='"/#/topiclist/"+topic.tab'>{{ topic.tab }}</a>
        </span>
      </section>
      <p>发表者:{{ topic.author.loginname }}</p>
      <div v-html="topic.content"></div>
    </article>
    <group>
      <!-- 遍历评论内容 -->
      <cell-box v-for="(item, index) in topic.replies" :key="index">
        <flexbox>
          <flexbox-item :span="1 / 8">
            <img :src="item.author.avatar_url" alt="" class="xu" />
          </flexbox-item>
          <flexbox-item :span="6 / 8">
            <section>
              <a :href="'/#/user/' + item.author.loginname">{{
                item.author.loginname
              }}</a>
              {{ index + 1 }}楼
              <div v-html="item.content"></div>
            </section>
          </flexbox-item>
          <flexbox-item :span="1 / 8">
            <span> 
              <!-- <wechat-emotion>强</wechat-emotion> -->
              🌹
              {{item.ups.length}}
            </span>
            <span @click="showPopup(item.id)">
              <!-- 如果已登录-- 可以回复 -->
            回复
            </span>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>
    <!-- popup弹出评论 -->
    <div>
      <popup v-model='isShowPopup'>
         <group>
           <x-textarea placeholder="评论"></x-textarea>
               </group>
         <!-- 无法触发加一个 native -->
          <x-button type="primary" :mini='true' >提交</x-button>
      </popup>
    </div>
  </div>
</template>

<script>
import { Group, CellBox, Flexbox, FlexboxItem, WechatEmotion,XTextarea,XButton,Popup} from "vux";
export default {
  name: "Topic",
  props: ["id"],
  components: {
    Popup,
    Group,
    CellBox,
    Flexbox,
    FlexboxItem,
    WechatEmotion,
    XTextarea,
    XButton
  },
  data: function () {
    return {
      topic: null,
      isShowPopup:false
    };
  },
  methods:{
    showPopup:function(){
         this.isShowPopup=true;
    },
    //收藏功能
    collect:function(){
      var app=this;
      this.$http.post('/topic_collect/collect',{
        accesstoken:this.$store.state.accesstoken,
        topic_id:this.topic.id
      }).then(function(response){
        if(response.data.success){
          //说明收藏成功 按钮状态修改
          app.topic.is_collect=true;
        }
      })
    },
    //取消收藏功能
    collects:function(){
      var app=this;
      this.$http.post('/topic_collect/de_collect',{
        accesstoken:this.$store.state.accesstoken,
        topic_id:this.topic.id
      }).then(function(response){
        if(response.data.success){
          //说明收藏成功 按钮状态修改
          app.topic.is_collect=false;
        }
      })
    },



  },
  //根据id发送ajax请求 获取对应数据
  beforeRouteEnter: function (to, from, next) {
    //to表示即将进入的路由组件
    //from表示即将离开的路由组件
    //next表示继续指向下一步
    //beforeRouteEnter是进入组件之前的回调函数 不能只用this 放在next里面 就可以解决
    next(function (vm) {
      //vm 实列对象
      vm.$http.get("/topic/" + to.params.id,{
        params:{
          // 收藏的参数
          accesstoken:vm.$store.state.accesstoken
        }
      }).then(function (response) {
        // console.log(response.data);
        vm.topic = response.data.data;
      });
    });
  },
  //动态路由的导航守卫
  beforeRouteUpdate: function (to, from, next) {
    //ajax是异步提前存一下this
    var xu = this;
    this.$http.get("/topic/" + to.params.id,{
        params:{
          // 收藏的参数
          accesstoken:this.$store.state.accesstoken
        }
        }).then(function (response) {
      //  console.log(response)
      xu.topic = response.data.data;
    });
    next();
  },
};
</script>

<style lang='less'>
@import "~vux/src/styles/weui/weui.less";
.xu {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  margin-right: 5px;
}
img{
  width: 100%;
}
</style>

