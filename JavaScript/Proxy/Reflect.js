// Reflect对象一共有13个皮肤方法。
// Reflect.apply(target, thisArg, args)
// Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
// Reflect.construct（目标，参数）
// Reflect.get（目标，名称，接收者）
// Reflect.set(目标、名称、值、接收者)
// Reflect.defineProperty(target, name, desc)
// Reflect.deleteProperty（目标，名称）
// Reflect.has（目标，名称）
// Reflect.ownKeys（目标）
// Reflect.isExtensible(目标)
// Reflect.preventExtensions（目标）
// Reflect.getOwnPropertyDescriptor(target, name)
// Reflect.getPrototypeOf(目标)
// 注意：Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果不是对象，Object.getPrototypeOf然后这个参数转为对象，再运行，而Reflect.getPrototypeOf会报错。

// Reflect.setPrototypeOf(目标，原型)
// https://es6.ruanyifeng.com/#docs/reflect


// Reflect.set(target, name, value,receiver)
// Reflect.set(目标、名称、值、接收者)
// let myObj = {
//     foo:1,
//     set barGroup(value) {
//         return this.foo = value;
//     }
// }
//
// myObj.foo  //1
// console.log(myObj.foo) //1
//
// // 改变
// Reflect.set(myObj,'foo',2)
// myObj.foo
// console.log(myObj.foo) //2
//
// //改变
// Reflect.set(myObj,'foo',3)
// myObj.foo  //3
// console.log(myObj.foo) //3


// Reflect.has(obj, name)
// Reflect.has方法name in obj对应里面的矛盾in。

var myObject = {
    foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
//注意：如果如果Reflect.has()方法的第一个参数不是对象，会报错。


// Reflect.deleteProperty(obj, name)
// Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。

const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
// 如果删除成功，或者被删除的资产不存在，返回true；删除失败，被删除的资产继续存在，返回false。

// 如果如果Reflect.deleteProperty()方法的第一个参数不是对象，会报错。



//使用Proxy观察者模式
// const pserver =  observable({
//     name: '张三',
//     age: 20
// });
//
//
// function  print() {
//     console.log(`${pserver.name},${pserver.age}`)
// }
//
// observable(print);
// pserver.name="徐哥"


// const queuedObservers = new Set();
//
// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});
//
// function set(target, key, value, receiver) {
//     const result = Reflect.set(target, key, value, receiver);
//     queuedObservers.forEach(observer => observer());
//     return result;
// }
//
// console.log(observe)
// console.log(observable)



//利用 Refect.apply 进行数组查找最大值
const ages = [11, 33, 12, 54, 18, 96];

let goodAges = {
    a:111,
    b:2,
    c:99
}
// console.log(goodAges["a"])

//最小
const youngest = Reflect.apply(Math.min, Math, ages);
// console.log(youngest)
// //最大
const goodMix= Reflect.apply(Math.max, Math, ages)
// console.log(goodMix)

const type = Reflect.apply(Object.prototype.toString, youngest, []);
// console.log(type)


const oldest = Math.max.apply(Math, ages);
// console.log(oldest)


//Reflect.defineProperty(target, propertyKey, attributes)
//如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')
// function MyDate() {
//     /*…*/
// }
//
// // 旧写法
// Object.defineProperty(MyDate, 'now', {
//     value: () => Date.now()
// });
//
// // 新写法
// Reflect.defineProperty(MyDate, 'now', {
//     value: () => Date.now()
// });


const p = new Proxy({}, {
    defineProperty(target, prop, descriptor) {
        console.log(descriptor);
        return Reflect.defineProperty(target, prop, descriptor);
    }
});

//对象 数组 都可以接收
p.daa = {
    a:111,
    b:2,
    c:99
}
//上面代码中，Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成了赋值。
