//引入其他模块中的内容
//es6的语法： 模块引入

import{add} from './test.js';


//可以把function.js对外输出的所有内容当做一个对象
import * as Num from './Function.js'
//import 引入default内容
import sayHello from './Common.js';
//调用add方法
console.log('3+5='+add(Num.numa,Num.numb));
sayHello();