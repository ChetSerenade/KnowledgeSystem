//1、引入 fs模块
const fs = require('fs');
// 2、调用方法读取文件
fs.readFile('./resoucer/学习.md', (err, data) => {
    //如果失败，则抛出错误
    if (err) throw  err;
    //    如果没用出错，则输出内容
    console.log(data.toString())
})


//3、封装
const p = new Promise(function (resolve, reject) {
    fs.readFile('./resoucer/学习.md', (err, data) => {
        //如果失败，则抛出错误
        if (err) throw  err;
        //    如果没用出错，则输出内容
        console.log(data.toString())
    })
})

p.then((value) => {
    console.log(value.toString)
}).then((reason) => {
    console.log(reason)
})

