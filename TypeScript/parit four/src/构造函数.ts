class Dog{
    name: string;
    age: number;

   
    // 构造函数
    // 构造函数会在对象创建时调用
    constructor(name:string,age:number ){
        // 表示当前的实列 this.就表示当前的实列
        // 在构造函数中当前对象加上当前创建的那个都对象
        // 可以通过this 像新填的对象中加入属性
        console.log('执行了！');
        this.name = name;
        this.age=age
    }

    bark() {
        // 在方法中可以通过this.来表示当前调用方法的对象
        console.log('叫');
        console.log(this.name);
    }
  

}


const dog = new Dog("喜喜",1);
const dog2 = new Dog("七喜",2);


console.log(dog);
console.log(dog2);
dog2.bark()
