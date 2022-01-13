"use strict";
(function () {
    // 抽象类得话 可以有抽象方法和实列方法   使用得话 是继承  extends
    // 接口得话   只可以有抽象方法            使用得话是 实现  interface
    /*
    *
    *   接口可以在定义类得时候去限制类得结构
    *   接口中得所有属性都不能有实际值
    *   接口只定义对象得结构、不能定义实际值
    *   在接口中所有得方法都是抽象得
    *
    */
    const obj = {
        name: "凌晨",
        age: 22,
        pop: 11
    };
    class Mylars {
        constructor(name) {
            this.names = name;
        }
        sayHello() {
            console.log('接口！~');
        }
    }
    let Calash = new Mylars('接口');
    console.log(Calash);
    Calash.sayHello();
})();
