//声明一个遍历 N  同时指定它得类型string
let N;
N = 'hello';
// N = 10; //代码会报错 因为上面指定了类型
console.log(N);
//声明完变量直接进行赋值  (这种写法不常见),TS会自动进行类型监测
let C = false;
//可以直接写 --》 相当于 let  C = false
console.log(C);
function sum(a, b) {
    return a + b;
}
let sums = sum(123, Number("456")); //注意这里
console.log(sums);
//TS类型
//--------------------------------------
//可以直接使用 | 来链接多个类型（联合型）
//可以直接使用字面量
let a;
a = 10;
console.log(a);
let b;
b = 'a';
b = 'b';
let d;
d = true;
d = b;
/*
* any 表示得是任意类型  一个变量设置any之后 关闭TS得类型监测
* unknown 表示未知类型得值
* unknown得值
* */
let e;
e = 10;
e = "hello";
e = true;
//不能直接赋值给其他变量
/*
if (typeof e === "string") {
    s = e
}
*/
/*
* 断言  可以用来告诉 解析器 他得实际类型
*
*/
//  s = e as string;
/*
* 语法:
*      变量 as 类型
*      <类型> 变量
* */
//void 用来表示 没有返回值,以函数为列,就表示没有值
/*function fb():void { }
*/
//never 用来表示 永远不会返回结果
/*function fb2():never {
    throw new Error('报错！')
}*/
/*
*
* object 表示一个JS得对象
* 语法{属性：属性值，属性：属性名}
* 加上一个问号 表示可选属性
* */
let bb;
bb = { name: '凌晨', age: 22 };
//[xhz:string]:any 表示任意类型得属性值
let bb2;
bb2 = { name: '凌晨', age: 22 };
/*
*
* 设置函数结构得类型声明
*  语法:(形参：类型，参数：类型...) => 返回值
* */
let fnd;
/*fnd = function (n1:string,n2:string):number{
    return 20
}*/
/*
* 数组得类型声明:
*       数组:[]
*       Array<类型>
* */
//string[] 表示字符串数组
let ee;
ee = ['a', 'b'];
//number[] 表示数值数值
let ff;
let gg;
gg = [1, 2, 3];
/*
* 元组,元组就是固定长度数组
*   语法：[类型,类型,类型]
* */
let h;
h = ['hello', 'abc'];
/*
* 枚举  enum
* */
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
let i;
i = {
    name: '凌晨',
    gender: Gender.Male //male
};
console.log(i.gender === Gender.Male);
// & 表示同时
let j;
j = { name: 'lc', age: 22 };
let A;
let B;
A = 5; //不会报错 在合理范围之内
// A=name  //报错
