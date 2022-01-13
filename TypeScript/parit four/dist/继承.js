"use strict";
(function name() {
    /*
    *
    *class xxx extends Animal
    *   Animal 是一个父类  xxx是子类
    *   使用继承之后，xxx可以去继承父类里面的方法和属性
    *   这样写一次 即可让所有的子类都同时拥有父类中的属性方法
    *   如果希望子类 拥有父类没有的方法属性可以直接添加
    *
    *   OCP 开闭原则 可以拓展类,尽量不去修改类
    *   如果在子类中添加与父类相同的方法 则子类会覆盖调父类--> 方法的重写
    *
    *   super在类方法中,super就表示当前类的父亲
    *
    *   以abstract开头的类是抽象类
    *       不能创建一个实列
    *       只能去继承
    *       抽象类中可以添加抽象方法
    *
    *
    */
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        sayHello() {
            console.log('super');
        }
    }
    class Dog extends Animal {
        run() {
            console.log(`${this.name}再跑！`);
        }
        dork() {
            console.log('重写！');
        }
    }
    class Crt extends Animal {
        constructor(name, ages, age) {
            // 如果子类中写了构造函数,在子类构造函数中必须对父类的构造函数进行调用
            super(name, age); // 调用父类的构造函数
            this.ages = ages;
        }
        dork() {
            console.log('这里我们重写上面的抽象类！必须的重写！');
        }
        sayHello() {
            super.sayHello();
        }
    }
    let dog = new Dog('七喜', 2);
    let crt = new Crt('猫儿', 666, 22);
    // console.log(dog);
    console.log(crt);
    // dog.run()
    // dog.dork()
    // crt.dork()
    // crt.sayHello()
})();
