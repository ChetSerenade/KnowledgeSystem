<template>
    <div>
       
        <h3> home组件</h3>
        <p>count111={{count}}</p>
        <p>
            <ul>
                <li v-for="user in users" :key='user.id'>
                    {{user.username}}-----  {{user.age}}
                </li>
            </ul>
        </p>
        
        <p>
            <ul>
                <li v-for="user in fileUsers" :key='user.id'>
                    {{user.username}}-----  {{user.age}}
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
        <p>
            模块A的name={{this.$store.state.moduleA.name}}
        </p>
        <p>
            模块B的name={{this.$store.state.moduleB.name}}
        </p>
        <hr>
        <p>
            <input type="text" :value="count" @input="emitCount($event.target.value)">
        </p>
   </div>  
</template>

<script>
//这里面的方式 和news里面的方式分别为不同的 4中调用方式！
// import {mapState} from ''
// import bus from '../EventBus';
// import store from '../store';
// import { mapState } from 'vuex';
//本页面为直接获取
export default {
    name:'home',
    computed:{
        //1.直接state获取数据 this.$store.state.count;
        count(){
            return this.$store.state.count;
        },
        users(){
            return this.$store.state.users;
        },
        age(){
             return this.$store.state.age;
        },
        //2.借助mapstate
        //箭头函数
        // count:state=>state.count,
        //  users:state=>state.users

        //2.获取getters 直接获取 this.$storegetters.xxx
        fileUsers:function(){
            return this.$store.getters.adults;
        }
    },
    methods:{
        emitEvent(){
            //修改state中的数据 (不记这个方法！)
            // this.$store.state.age=80;

            //调用mutation函数 this.$store.commit (记这个)
            // this.$store.commit('mutationAge',99);

            //修改users数据 调用actions函数，因为是异步请求
            this.$store.dispatch('actionUsers')
        },
        emitCount(nval){
            this.$store.commit('mutationCount',nval)
        }
    }
}
</script>