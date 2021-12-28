// Iterator  迭代器


// Iterator（遍历器）的概念
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
//
// 下面是一个模拟next方法返回值的例子


// var it = makeIterator(['a', 'b']);
//
// it.next() // { value: "a", done: false }
// it.next() // { value: "b", done: false }
// it.next() // { value: undefined, done: true }
//
// function makeIterator(array) {
//     var nextIndex = 0;
//     return {
//         next: function () {
//             return nextIndex < array.length ?
//                 {value: array[nextIndex++], done: false} :
//                 {value: undefined, done: true};
//         }
//     };
// }


// 以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是for循环。

// for (var index = 0; index < myArray.length; index++) {
//     console.log(myArray[index]);
// }
// 这种写法比较麻烦，因此数组提供内置的forEach方法。

// myArray.forEach(function (value) {
//     console.log(value);
// });
// 这种写法的问题在于，无法中途跳出forEach循环，break命令或return命令都不能奏效。

// for...in循环可以遍历数组的键名。

// for (var index in myArray) {
//     console.log(myArray[index]);
// }
// for...in循环有几个缺点。

// 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
// for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
// 某些情况下，for...in循环会以任意顺序遍历键名。
// 总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

// for...of循环相比上面几种做法，有一些显著的优点。

// for (let value of myArray) {
//     console.log(value);
// }
// 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
// 不同于forEach方法，它可以与break、continue和return配合使用。
// 提供了遍历所有数据结构的统一操作接口。
// 下面是一个使用 break 语句，跳出for...of循环的例子。

// for (var n of fibonacci) {
//     if (n > 1000)
//         break;
//     console.log(n);
// }
// 上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用break语句跳出for...of循环。


//求和数组
// let arr= [2,3,4,5,6]
// const  goodMap = arr.map(x => x * 2)
// let num = 0;
// for (const goodMapKey in goodMap) {
//     num+= goodMap[goodMapKey]
// }
// console.log(num)

//递归求和
// function  sum(array) {
//     let goodArray = array.length
//     if(goodArray  == 0 ){
//         return "等于0"
//     }else if(goodArray == 1){
//         console.log(array[0])
//         return  array[0]
//     }else  {
//         return  array[0] + sum(array.slice(1))
//     }
// }
//
// console.log(sum(arr))


//递归去重
// let arr = [1, 2, 3, 4, 3, 6, 78, 8];
// function Ble(){
//     var  newArray = [];
//     for (var i = 0;i < arr.length; i++) {
//         if(newArray.indexOf(arr[i]) == -1){
//             newArray.push(arr[i])
//         }
//     }
//     console.log(newArray)
// }
// Ble()



let str = '["ITEM0001 x 1","ITEM0013 x 2","ITEM0022 x 3"]'
let obj = {}
JSON.parse(str).map(item=>item.split('x')).map(item_arr => obj[item_arr[0]] = parseInt(item_arr[1]))
console.log(obj);



let arr = [1,2,54,5,1,2,54,3,1,5,7,3,55]
let gooDarr = [...new Set(arr)].sort((a,b)=>{return b-a})
console.log(gooDarr)

