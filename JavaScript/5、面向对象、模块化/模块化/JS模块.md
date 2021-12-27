 ES6模块系统
 1、定义
 2、使用
 需要webpack 的编译 因为浏览器并不认识

 导出 (export)
 //变量
 export let a=12；
export const a=12；

//一堆对象
let a,b,c,...;
export {a,b,c,...};

//导出函数
export function show(){
    ...
}

//导出 class
export class xxx(){

}

默认成员 
export  default

--------------------------
导出
inport * as mod1 from 'xxx'; 引入所有成员
inpmort mod1 from 'xxx';  引入default成员

//只引入
import 'xxx';