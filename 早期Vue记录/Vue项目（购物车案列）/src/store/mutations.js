export default{
    //修改商品列表数据
    //利用这个同步修改 把axios拿来的接口数据 放到--->我们的商品列表里面
    mutationGoodsList:function(state,payload){
        //state  表示当前store对象的state数据
        //payload 表示调用函数时传入的值
        state.goodsList= payload;
    },
     //添加商品到购物车
     mutationAddGoods: function (state, payload) {
       state.cartGoodsList.push({
         //state表示当前store对象的state数据
         //payload是调用函数时传入的值
         goods: payload.goods,
         // count:payload.count
         count: 1
       })
     },
     //修改购物车中商品数量
     mutationUpdateCount: function (state, payload) {
       //state表示当前store对象的state数据
       //payload是调用函数时传入的值
       //id修改条件 用户传入的id=购物车列表数据某一个商品id
       for (var i = 0; i < state.cartGoodsList.length; i++) {
         var element = state.cartGoodsList[i];
         if (element.goods.id == payload) {
           element.count = payload.count;
           break;
         }
       }
     }

}