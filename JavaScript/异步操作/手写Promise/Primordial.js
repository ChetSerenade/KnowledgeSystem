function PromiseM(){
    this.status='pending';
    this.msg='';
    var process=arguments[0];
    var that=this;
    process(function(){
        that.status='resolve';
        that.msg=arguments[0];
    },function(){
        that.status='reject';
        that.msg=arguments[0];
    });
    return this;
}
PromiseM.prototype.then=function(){
    if(this.status=='resolve'){
        arguments[0](this.msg);
    }
    if(this.status=='reject'&&arguments[1]){
        arguments[1](this.msg);
    }
}
//测试用例
var mm=new PromiseM(function(resolve,reject){
    resolve('123');//123其实就是第二个arguments[0]
});//上面的第一个arguments[0]
mm.then(function(success){
    console.log(success);//该success其实就是上面的this.msg
    console.log("ok!");
},function(){
    console.log('fail!');
});//123//ok