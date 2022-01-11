//声明一个遍历 N  同时指定它得类型string
var N;
N = 'hello';
// N = 10; //代码会报错 因为上面指定了类型
console.log(N);
//声明完变量直接进行赋值  (这种写法不常见),TS会自动进行类型监测
var C = false;
//可以直接写 --》 相当于 let  C = false
console.log(C);
function sum(a, b) {
    return a + b;
}
var sums = sum(123, "456");
console.log(sums);
