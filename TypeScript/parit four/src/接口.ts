(function () {

    // 抽象类得话 可以有抽象方法和实列方法   使用得话 是继承  extends
    // 接口得话   只可以有抽象方法            使用得话是 实现  interface

    // 主要是 接口就是定义一个标准 限制我们某一个类 必须去符合我们这个接口定义得规范！


    // 描述一个对象的类型
    /*   type myType = {
          name:string,
          age:number
      }
    */

    /* 
    *   接口定义
    *   interface 用来定义一个类中应该包含那些属性和方法    
    *   同时接口也可以当成类型声明去讲
    *   接口可以去重复声明  
    * 
    */

    // 会把下面两个合成一个接口
    interface myInterface {
        name: string;
        age: number;
    }

    interface myInterface {
        pop: number;
    }


    /* 
    *
    *   接口可以在定义类得时候去限制类得结构
    *   接口中得所有属性都不能有实际值
    *   接口只定义对象得结构、不能定义实际值
    *   在接口中所有得方法都是抽象得
    * 
    */
    const obj: myInterface = {
        name: "凌晨",
        age: 22,
        pop: 11
    }


    /* 
    *
    *   定义类时，可以使类去实现一个接口
    *   实现接口就是使用类满足接口得要求
    * 
    */
    interface myInter {
        names: string;
        sayHello(): void;
    }

    class Mylars implements myInter {
        names: string;

        constructor(name:string){
            this.names = name
        }

        sayHello(){
            console.log('接口！~');
            
        }
    }


    let  Calash  = new Mylars('接口')
    
    console.log(Calash);
    Calash.sayHello()
    

})()