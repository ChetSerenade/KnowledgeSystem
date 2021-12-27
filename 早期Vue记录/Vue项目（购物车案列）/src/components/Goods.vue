<template>
    <div>
        商品详情
        id={{id}}
        <p>
           商品价格:{{goods.age}}
        </p>
        <p>
            商品简介:{{goods.username}}
        </p>
        <p>
            <a href="" @click.prevent.stop="addCart">添加到购物车</a>
            <a href="" @click.prevent.stop="$router.go(-1)">返回上一页</a>
        </p>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name:'Goods',
    props:['id'],
     data:function(){
        return {
            uid:this.id
        }
    },
    computed:{
        //调用getters方法一: 直接调用
        goods:function(){
            return this.$store.getters.getGoodsById(this.id);
        }

        //  ...mapGetters(['getGoodsById'])

    },
   methods:{
        ...mapMutations(['mutationAddGoods']),
        addCart(){
            //1把当前商品添加购物车
            this. mutationAddGoods({
                goods:this.goods
            })

            //2跳转到购物车页面
            this.$router.push('/cart')
        }
    }
}
</script>

<style scoped>


</style>