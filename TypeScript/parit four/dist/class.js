"use strict";
// 使用class 来定义一个类
/*
*
*  对象包含两个部分
*   属性
*   方法
*
*/
class Person {
    constructor() {
        /*
        *   直接定义的属性是实列属性，需要通过对象的实列去访问
        *   const per = new Person()
        *   Person.name
        *
        *   使用static 开头的属性是静态属性(类属性) 可以直接通过类去使用
        *    Person.age
        *
        *   readonly 只读属性，只可以查看 不可以修改
        *
        */
        // 定义属性
        this.name = '凌晨';
        this.pop = '只读属性';
    }
    // 定义方法   
    /*
    * 和上面一样 加上static则是类方法,可以直接通过类调用。 不加的在实列上面调用
    */
    sayHello() {
        console.log('你好！实列方法！');
    }
}
// 在属性前面使用static关键字可以定义类属性(静态属性)
Person.age = 18;
const per = new Person();
// console.log(per.name);
// console.log(per.age);  //undefined  static
// console.log(Person.name);
// console.log(Person.age);
// per.sayHello()  //你好！实列方法！
