//先加载axios

import axios from 'axios';

//页面加载完后执行

window.onload=function(){
    //Get请求   

    //方法三：创建axios实列对象
      var request = axios.create({
          baseURL: 'http://180.76.165.143:8080/MyUser'
      })

    //Get请求 获取
    document.getElementById('getbtn').onclick=function(){
        //方法一 直接使用axios函数
        // axios({
        //     //url ajax 请求地址
        //     url: 'http://api.hbynlsl.cn/index.php/users',
        //     method:'GET'
        // }).then(function(response){
        //     console.log(response.data);
        // })

        // // 方法二：使用axjos.get()发送请求
        // axios.get('/users',{
        //     // 基准地址 baseURL
        //     baseURL:'http://api.hbynlsl.cn/index.php'
        // }).then(function(response){
        //     console.log(response.data);
        // })

        //方法三：调用实列对象
    request.get('UserControl').then(function (response) {
        console.log(response.data);
    })
    };

    //POST请求  发送
    document.getElementById('postbtn').onclick = function () {
        //post请求 添加数据  
        //需要转转义字符串形式(默认为json形式)
        //准备数据，默认是json数据
        // var params= new URLSearchParams;
        // params.append('username', '超超'); //append 在末尾插入
        // params.append('age',10);
        request.post('/UserInsertControl?username="我是阿超"&age=14').then(function (response) {
            console.log(response.data);
        })
    }

    //PUT请求   修改
    document.getElementById('putbtn').onclick = function (){
        //准备好put
        // var parxu  = new URLSearchParams;
        // parxu.append('name','超超');
        // parxu.append('age',28);
        request.get('UserUpdateControl?id=2144&username=云超哥&age=300').then(function (response) {
            console.log(response.data)
        })
    }

    //DELECT请求 删除
    document.getElementById('deletebtn').onclick = function(){
        request.delete('/UserControl').then(function (response) {
             console.log(response.data)
        })
    }
}