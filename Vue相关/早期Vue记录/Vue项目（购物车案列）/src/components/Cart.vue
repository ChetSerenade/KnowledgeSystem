<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <!-- <p>{{cart}}</p> -->
      <h6>商品名称:{{cart.goods.username}}</h6>
      <h6>商品价格:{{cart.goods.age}}</h6>
      <p>
        购买数量：
        <button @click.prevent.stop="dec">-</button>
        <!-- <input type="text"> -->
        {{cart.count}}
        <button @click.prevent.stop="inc">+</button>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default{
    name:'cart',
    props:['cart'],
    methods:{
      ...mapMutations(['mutationUpdateCount']),
      dec(){
        //调用mutation函数修改数量
        this.mutationUpdateCount({
          goods:this.cart.goods,
          goods:this.cart.count-1
        })
      },
      inc(){
        this.mutationUpdateCount({
          goods:this.cart.goods,
          goods:this.cart.count+1
        })
      }
    }
  }
</script>

<style>
</style>
