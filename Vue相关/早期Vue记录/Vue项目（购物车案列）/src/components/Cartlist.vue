<template>
<div>
<h6>购物车列表</h6>
    <div>
        <Cart v-for="(item,index) in cartGoodsList" :key='index' :cart='item'>
        </Cart>
    </div>  
    <p>订单金额：{{cartAmount}}</p>
    <p><a href="" @click.prevent.stop="$router.push('/')">返回首页</a></p>
</div>
</template>

<script>
import {mapState} from 'vuex'
import Cart from './Cart'
export default {
    name:'carlist',
    computed:{
        ...mapState(['cartGoodsList']),
        ...mapState(['cartAmount'])
    },
    components:{
        Cart
    }
}
</script>