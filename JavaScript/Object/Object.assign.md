# Object.assign()

`**Object.assign()**` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。



> Object.assign(target, ...sources)

- target: 目标对象
- sources: 源对象
- 返回值：target(目标对象)



## [示例]

### [复制一个对象]

```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```



### [合并对象]  对象拼接

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

后面的参数target是目标对象，后面可以跟若干个源对象，此API的作用是将多个源对象拼接在目标对象之后，组成一个对象。