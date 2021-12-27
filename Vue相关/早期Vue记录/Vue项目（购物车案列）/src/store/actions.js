//发送了ajax
import request from './ajax.js'

export default {
    //使用函数->发送ajax请求获取商品列表
    actionGoodsList:function(context){
        //参数context表示当前的store对象
        request.get('/UserControl').then(function(response){
            //获取的数据使用response
            console.log(response);
            //捕获到数据以后要修改store中的data数据(goodsList)
            //修改数据不建议直接修改，需要借助mutations修改
            context.commit('mutationGoodsList', response.data)
        })
    }   
}