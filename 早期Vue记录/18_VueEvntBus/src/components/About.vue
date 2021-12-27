<template>
    <div>
        N组件
        <h6>count == {{count}}</h6>
        <div>
            子组件:
            <child-component :count="count" @changedata='updatacount'></child-component>
        </div>
    </div>
</template>


<script>
import Child from './Child.vue'
export default {
    name:'About',
    data:function(){
        return{
            count:1
        }
    },
    methods:{
        updatacount:function(nval){
            this.count=nval;
        }
    },
    components:{
        'child-component':Child
    }

}
</script>