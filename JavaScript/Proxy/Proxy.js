//Proxy 和 Reflect 方法

// get()

// get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
// get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。


// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
// set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。


// apply方法拦截函数的调用、call和apply操作。
// apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组
// // var handler = {
//     apply (target, ctx, args,value) {
//         return Reflect.apply(...arguments);
//     }
// };

// var target = function () {
//     return '我他妈被拦截了 狗！';
// };
//
// var handler = {
//     apply: function () {
//         return p.name = "我是徐哥 我拦截他，我还搞了个name";
//     }
// };
//
// let p = new Proxy(target, handler);
// console.log(p(target))


// let test = {
//     name: "xhz"
// };
// test = new Proxy(test, {
//     get(target, key) {
//         // console.log('获取了getter属性值');
//         return target[key];
//     }
// })
// // console.log(test.name)
//
//
// let zhige = {
//     name: "小志",
//     age: 22,
//     state: "你好！",
// }
// //进行截取 zhige里面的对象 如何进行操作
// zhige = new Proxy(zhige, {
//     //get 返回值进行操作
//     get(target, key) {
//         let result = target[key];
//         // console.log(result)
//         if (key === "age") result += "岁";
//         return result;
//     },
//     //拦截进行操作 比如判断一个是的类型是否符合要求
//     set(target, key, value) {
//         // console.log(key)
//         // console.log(value)
//         if (key === "age" && typeof value !== "number") {
//             throw Error("age不符合字段要求")
//         }
//         return Reflect.set(target, key, value);
//     }
// })
//
// // console.log(`我叫${zhige.name} 今年${zhige.age}了${zhige.state}`)
// // zhige.name = "我改名字了"
// // zhige.age = 23
//
//
// let proto = new Proxy({}, {
//     get(target, propertyKey, receiver) {
//         // console.log('继承？' + propertyKey);
//         return target[propertyKey];
//     }
// });
//
// // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
// let obj = Object.create(proto);
// // console.log(obj)
// obj.aa
// obj.fo // "GET foo"


//Iterator（遍历器）的概念
// JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
//
// 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
//
// Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
//
// Iterator 的遍历过程是这样的。
//
// （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
//
// （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
//
// （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
//
// （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
//
// 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。



