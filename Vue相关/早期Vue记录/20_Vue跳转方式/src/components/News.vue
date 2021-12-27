<template>
    <div>
        news组件
        <h5>age={{age}}</h5>
        <p>count={{count}}</p>
        <p>
            <ul>
                <li v-for="user in users" :key='user.id'>
                    {{user.name}}-----  {{user.age}}
                </li>
            </ul>
        </p>
        <p>
            <ul>
                <li v-for="user in adults" :key='user.id'>
                    {{user.name}}-----  {{user.age}}
                </li>
            </ul>
        </p>
        <div>
            <h6>修改state中的数据</h6>
            <button @click='emitEvent'>更新</button>

        </div>
        <h6>
            age={{age}}
        </h6>
         <hr>
        <p>
            <input type="text" v-model="count">
        </p>
    </div>
</template>
<script>
//此页面都是借助 map***辅助函数{mapxxx，mapxxx}
import { mapGetters, mapMutations, mapState,mapActions } from 'vuex';
// import store from '../store/index.js';
export default {
    name:'news',
    //store数据，建议在computed属性中获取
    //computed:mapState({
        //    count:function(state){
        //        return state.count
        //    }

    //箭头函数 一种
        //    count:state=>state.count,
        //  users:state=>state.users,

    //字符串 二种 把state中的count对应的值，复制给计算属性count2  
    //  count2:'count',
    
    //    }),
    // 三种 state中的数据直接作为computed的属性，数组形式
    //  computed:mapState(['count','age','users']),
    
    //第四种 必须牢记！
     //既有本地数据又有store中的数据 ...mapState 对象展开运算符 (推荐使用)
    //计算属性 computed
   computed:{
           ...mapState(['count','age','users']),
           //使用mapGetters辅助函数引入store对象中的gettres数据
           ...mapGetters(['adults']),
           //设置count属性的getter和setter方法
           count:{
                get:function(){
                    return this.$store.state.count
                },
                //计算属性值发送变化 自动调用该犯法
                set:function(value){
                    this.$store.commit('mutationCount',value)
                }
           }
     },
    
     methods:{
         emitEvent(){
           this.mutationAge('79')
         },
      
      //使用mapMutations引入函数
         ...mapMutations(['mutationAge']),
       
       //使用mappActions引入函数
         ...mapActions(['actions'])
     }
}
</script>