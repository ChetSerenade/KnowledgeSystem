  

# VUE基础

## this指向问题

**箭头函数中的this指向是固定不变（定义函数时的指向），在vue中指向vue;**

**普通函数中的this指向是变化的（使用函数时的指向），谁调用的指向谁。**

window下的函数this都指向  window对象

vue中的函数 this指向 vue对象

## 堆和栈

### 基本数据类型

- 基本类型：String，Number，Boolean，Null，Undefined，这5种基本数据类型它们是直接按值存放的，所以可以直接访问。
- **引用类型：Function，Array，Object，当我们需要访问这三种引用类型的值时，首先得从栈中获得该对象的地址指针，然后再从堆内存中取得所需的数据。**

### 堆和栈的定义

栈(stack): 由操作系统自动分配内存空间，自动释放，存储的是基础变量以及一些对象的引用变量，占据固定大小的空间。

堆(heap)：由操作系统动态分配的内存，大小不定也不会自动释放，一般由程序员分配释放，也可由垃圾回收机制回收。

### 特点

栈：是先进后处

堆：是*先进先出*

### 区别

栈：**基础变量**的值是存储在栈中，而**引用变量**存储在栈中的是指向堆中的数组或者对象的地址，

优点：读取速度快，数据可以共享

缺点：存在栈中的数据大小与生存期必须是确定的，缺乏灵活性



堆：堆内存中的对象不会随方法的结束而销毁，创建对象是为了反复利用

## 作用域

ES5之前因为if和for都没有块级作用域，所以在很多时候必须借助function作用域来解决外面的变量

相当于好多人用同一个变量

ES6就使用let 有块级作用域 代替var

相当于每个人都用自己的变量

## MVC模式

mode模型 -  view视图 - con控制器

单向流动

## **MVVM模式** （重点）

view 视图 = viewmodel视图模型 = model 模型

双向 流动绑定

![](C:\Users\MI\Desktop\图片\QQ图片20200901100259.jpg)

![](C:\Users\MI\Desktop\图片\QQ图片20200901112404.jpg)

## ***Vue生命周期*** （ 重点）

含义： vue实例对象从创建到销毁的过程就是生命周期

$el 是 页面结构， $data是 数据

创建：

beforeCreate ：未创建Vue对象之前的回调函数，此时el和data为空

create：创建vue对象之后的回调函数，此时el为空，data数据已经存在

绑定：

beforeMount：绑定vue和model之前的回调函数，此时el已经有值（原始值）

Mounted：绑定view和model之后的回调函数，此时el为绑定后的值

更新：

beforeUpdate：更新之前的回调函数，此时data的值还是原始值

updated:更新之后的回调函数，此时data的值是修改后的值

销毁：

beforeDestroy：销毁vue对象之后的回调函数，此时el和data还有值

destroyed：销毁vue对象之后的回调函数，此时el和data还有值，但修改数据不会响应改变view

## 模板语法

![](C:\Users\MI\Desktop\图片\QQ图片20200902092919.png)

{{}}模板中 不支持if判断 不支持for 不支持 var  但是可以使用指定来进行实现

支持 new关键字

## vue指令

v-once 表示指 只执行一次

v-pre 表示  原封不动的解析标签，而不管标签中的内容

v-html： 解析html标签    

动态属性：v-bind：  简写 ：可以动态绑定 :class{key:value}   动态添加样式名称

```html
<h2 :class="{active:isAct,line:isLin}">动态绑定class</h2>
```

列表渲染：v-for         比if优先级高        需要唯一标识  ：key=“内容” 最好用内容，不是下标      key 可以解决 vue 会复用之前的虚拟dom 来达到快速渲染的效果，会出现一些问题，用 key唯一标识来解决

条件渲染 判断：v-if     

渲染：v-show                  		 和v-if的区别  if是生成DOM结构，show是 添加css样式 进行隐藏

绑定事件：v-on   简写@

数据的双向绑定： v-model     插值   

v-clock 解决页面 闪烁  显示原效果的 {{xxx}}   要在 最外层div 写 v-clock

需要添加一个样式v-cloak

[v-clock]{
				display: none;
			}

vue底层是 虚拟DOM和 Diff算法

v-model的修饰符  .lazy 懒加载 失去焦点和回车时才更新

​								.number 将输入的内容类型都是数字类型

​								.trim 过滤内容两边的空格



## 过滤器 （重点）

filters 局部过滤器

filter 全局过滤器 需要在vue实例创建之前

注意：过滤器不能放到属性中使用，但是计算属性可以在任何地方使用

区别：

过滤器 可局部也可全局     计算属性 只有局部

过滤器针对一个变量，计算属性针对多个

过滤器使用 |   计算属性使用 名称即可

**过滤器只能在{{}} 中使用 和v-bind中使用**    （重点）

**计算属性可以在任何vue模板结构中使用 不可以在v-HTML中使用**



## 计算属性 （重点）

computed 在局部定义

只有在相关依赖发生改变时才会重新求值



## 自定义属性 （重点）

methods 自定义属性

调用时，需要有括号

方法是每一次调用都会重新求值

methods函数每一次调用都会重新计算，无论它的依赖项数据是否发生改变

## 数组更新检测 （重点）

在页面修改完数组值后，页面不更新

需要使用 vue.set() 或者使用 vue对象.$set()

或者使用 数组的那几个添加数组的方法，最常用的是 splice（）

![](C:\Users\MI\Desktop\图片\QQ图片20200903094738.png)

## 事件处理 （重点）

事件绑定：v-on   简写@   不支持原生js自带事件

## 事件修饰符 （重点）

事件修饰符，取消默认事件 prevent    @click.prevent=""

事件修饰符 stop 取消冒泡行为  @click.stop=""

.native 事件修饰符什么时候使用，监听组件的原生事件时使用

```
<back-top @click.native="backclick"></back-top>
```

![](C:\Users\MI\Desktop\图片\子主题 4.png)

## 事件对象

$event 代表事件的状态  参数必须是最后一个          浏览器产生的参数 event 需要v-on:click=mo('aa',$event)

event.type :触发的事件类型

event.target: 触发事件的HTML元素

event.preventDefault() ：阻止默认行为

event.stopPropagation(): 阻止冒泡

event.target.tagname: 表示当前触发元素的 标签名称



## 自定义属性 （重点）

自定义属性  :data-index="index"

获取自定义属性： dataset      dataset.index

## 表单绑定

v-model 数据的双向绑定

## 常用事件

![](C:\Users\MI\Desktop\图片\QQ图片20200904094730.png)

![](C:\Users\MI\Desktop\图片\QQ图片20200904094723.png)



# VUE组件 

## 组件特点 

高内聚，低耦合

可复用

## 创建的方法



局部创建

![](C:\Users\MI\Desktop\图片\QQ图片20200907155115.png)

全局创建	

![](C:\Users\MI\Desktop\图片\QQ图片20200907160118.png)

## 模板创建的三种方式

字符串模板   template     script 形式

## 组件创建的三种方式

全局 ，局部 ，vue.extend() 底层创建方式



## 组件中的属性和方法

计算属性，过滤器，自定义属性，都可以正常使用，

data数据，必须是函数形式， 返回的值，必须是**独有数据**，否则可能会报 **对象共享内容的错误**

**data 必须使用return 返回 对象数据**{ 数据：内容   }



## **组件通信** （重点）

### 父子组件通信

#### 父元素向子元素传递

props 属性   数组形式，可以接受多个数据    子元素通过props属性，接受父元素的数据

HTML属性 不区分大小写，可以使用下划线替换 myMa   my-ma

注意：props指明数据，但使用时未传递该数据，会出现 undefined

#### 子元素向父元素传递

使用  自定义事件机制   this.$emit(‘自定义事件’，‘参数’)发送  父元素使用v-on接受

参数  可以使用arguments[],接受  实参 参数   就是接受是参数的一个属性

### 非父子组件通信

创建 事件总线 var bs=new Vue()

触发的是用$emit(‘自定义事件’，‘参数’)

接受的是用$on(‘自定义事件名称’，‘执行的函数’)接受



## 组件访问

组件访问 父组件访问子组件中的内容使用$children 数据类型     

 一般使用$refs对象类型  给子组件添加ref="xxx"指进行准确查找

子组件访问父组件 使用$parent  

子组件访问父组件 使用$root 也可以访问



注：路由嵌套时，需要在路由定义中嵌套路由，使用$children属性定义

子组件不能直接修改父组件中的数据需要 编写子组件独有的数据

父元素可以修改子元素的数据

子元素不可以修改父元素的数据

## 递归组件

组件在内部可以递归地使用自身组件元素，成为递归组件

使用递归组件时，要注意递归的结束条件

## v-model工作原理 （重点）

就是 v-bind 和 v-on 的语法糖 (简写)

input事件 和 value 属性

**自定义组件中不可以直接使用v-model指令**

v-on 事件 是 修改父元素的 模型     视图 view  ----   模型 mode   的方向

v-bind事件 时 绑定表单输入元素的value属性， 模型 mode ---  视图 view 的方向

## 插槽

使用   slot 标签   在**模板**中  创建插槽 

```
<slot><button>按钮</button></slot>
```

**使用组件时，如果组件中没有 标签，就会使用插槽中的元素，**

**如果有就会显示组件中的元素**

## 命名插槽

如果有多个插槽，就需要给插槽指定名称  name="xxx"

```
<slot name="so1"><button>命名插槽按钮</button></slot>
```

**在使用组件中** 替换插槽时，就可以在标签中使用 slot=“名称” 替换指定的插槽

```
<textarea slot="so1">我是替换的命名插槽</textarea>
```

## 编译作用域

就是组件中使用一个变量，会去找最外层的div模板中查找变量

```
<div id="add">
 <cnp v-show="isshow"></cnp>
</div>
```

这个就是，在组件中使用isshow变量，不会去组件cnp中查找，而是去#add中去查找

```
<template id="app">
  <h1>编辑作用域</h1>
  <button v-show="isshow"></button>
</template>
```

这个就是在模板中使用变量 isshow，会去#app中查找变量

## 作用域插槽

父组件替换插槽标签，但内容是由子组件提供。

父组件现在由于编译作用域，拿不到子组件的数据，就需要在 子组件模板中的slot 中定义动态属性 **：data='子组件内容'**

```
<template id="app">
<!--1  这里的:data="arr"是绑定 子组件中的变量-->
  <slot :data="arr">
    <ul>
      <li v-for="inte in arr">{{inte}}</li>
    </ul>
  </slot>
</template>
```

父组件替换插槽时，需要先写template 标签，在标签中使用   属性 **slot-scope='slot'** 获取到子组件的内容，在进行操作

```
<cnp>
    <template slot-scope="slot">
<!--   3   使用时还需要添加 双向绑定的  v-bind="xxx" 名字-->
      <span v-for="ints in slot">{{slot.data}}</span>
    </template>
  </cnp>
```



## DOM模板解析注意事项

**is =“组件名称” 属性解决HTML限制问题**

（限制就是  比如表格中，只能使用tr th td 而不能使用其他的标签名称）

## prop验证

![](C:\Users\MI\Desktop\图片\QQ图片20200910161317.png)

## 动态组件

使用component 标签 动态绑定 is 之后在外层data中编写 组件的名称，之后切换 组件名称就可以切换组件了

# 模块化创建VUE

## 下载

下载 node.js

安装 cnpm  在黑窗口中

cnpm install xxx    下载文件

cnpm init 初始化package.json文件

## 引入依赖包

可以使用script (一般不使用)

使用webpack 打包工具 ，打包使用   **(常用)**

## webpack打包文件

第一种方式

使用命令行的形式 

webpack .![img](file:///C:\Users\MI\AppData\Roaming\Tencent\QQTempSys\}AX7~8WW]6}CMXCJBHR7D$V.gif)/min.js -o .![img](file:///C:\Users\MI\AppData\Roaming\Tencent\QQTempSys\OOY5$4OW5H`8`9%(9$)T67M.gif)ndle.js



第二种方式，使用webpack.config.js 配置文件的形式

entry 是入口文件

output 是出口文件



第三种方式 使用webpack 配置文件的打包文件  package

先使用  cnpm init 初始化 package 文件

在 scripts  字段中，添加自定义命令，来进行打包



## webpack内置服务器

### 下载

cnpm install -g webpack-dev-server 全局安装

## ES6输出语法

export default 指定一个默认输出

default 输出时，不允许使用{ } 当前定义的名称对位是无效的

一个模块中，只允许default 一个内容

引入方式 import 名称 from  ‘./文件地址’

## vue-cli2开发工具（）

安装 npm install -g vue-cli

使用：

**简单模板  vue init webpack-simple 名称**

**创建完整 vue init webpack 名称**

需要下载依赖   cnpm install

运行 cnpm run dev 

## 	runtime-Compiler和runtime-only的区别

以后创建项目时，就是用  **runtime-only**  体积更小 代码更少，

主要实现步骤  render -vdom -ui  （底层逻辑）

主要依赖 **"vue-template-compiler": "^2.5.2",** 进行的



runtime-Compiler实现步骤 template -ast -render -vdom -ui  （底层逻辑）

## vue-cli3开发工具（重点）

1.主要设计原则 “0”  配置 移除了配置文件根目录下的bulid和config等目录

2.增加配置 UI 更加人性化

3.替换掉 static 用 public 静态目录

### 使用 

1.创建项目 **vue create ‘项目名称’**

2.运行程序 **npm run serve** 

### 配置去哪了

主要被隐藏起来了，放在了依赖里面

1 使用 **vue ui** 命令进入图形化窗口，可以进行一些配置的修改

2 自定义 自己创建vue.config.js文件，里面用于修改一些配置



## 单文件组件（重点）

### 创建

vue支持vue为拓展名的单文件组件

有三部分 template script style 

在vue组件中只写v-for会提示错误，需要添加一个唯一标识 key值 



js种 export default{} ES6的模块导出

style种 scoped限定  只对当前组件样式有效



使用v-for循环时，必须使用key 唯一标识， **key的作用主要是为了高效的更新虚拟DOM**

### 使用

1. 使用 import 引入组件  ./表示当前目录

2. 注册 ，可以全局，也可以局部，建议局部   components：{注册}

3. 使用组件 标签名

    

   

## axios库（重点）

### 原生ajax 

4步骤

![](C:\Users\MI\Desktop\图片\QQ图片20200914164817.png)

### jQuery ajax

### axios库（重点）

1 安装  cnpm install axios -g

1 使用axios()发送ajax 使用then(函数)，接收

2 辅助函数

3 使用实例对象的形式 发送Ajax  (重点)

创建axios 对象，设置baseURL地址

调用实例对象，使用then()接收

![](C:\Users\MI\Desktop\图片\11.png)

![](C:\Users\MI\Desktop\图片\22.png)

发送请求的方式

get post put delect



post方式 

传递参数时，需要转义成查询字符串的格式 使用

querystring辅助函数的形式

### axios实例（重点）

直接作为vue原型链prototype对象的某一个属性

axios 发送ajax	请求的第三种方式 ：创建实例对象
把 axios 的实例对象作为vue原型链的 （$axios）属性

Vue.prototype.$axios=axios.create({
	baseURL:'http://180.76.165.143:8080/MyUser' 
})









RESTful API

![](C:\Users\MI\Desktop\图片\子主题 1.png)

## 单页面应用（SPA）

优点：用户体验友好，程序执行性能高效

缺点：不利于收藏，和不利于SEO（搜索引擎优化

### 实现的两种方式

1 使用vue-router拓展，实现单页面应用开发

2 结合vue动态组件，原生实现单页面开发

## vue-router 路由（重点）



路由 :页面跳转

数据获取: 可以使用ajax技术异步更新

授权 ： 获取数据，是否具有权限

**状态管理：在模块之间，进行共享数据**

### 注意时

router  路由器对象 包含一些操作路由的功能函数，来实现编程式导航 路由跳转 路由注册

routes 对象数组 用于 配置多个路由信息对象 

route 一个路由信息对象

### 使用步骤总结

![](C:\Users\MI\Desktop\图片\111.png)



### 安装时

1 下载 安装 vue-router

cnpm install vue-router --save

2 引入路由

import VueRouter from 'vue-router'

3 全局注册i

Vue.use(VueRouter);



4 定义路由信息，跳转组件的信息

 对象数组 使用  routes【{}，{}】

  {path:'/fo',component:fo},

​	地址 path  和   组件 component



5 创建路由管理器 使用 router

​	const router=new VueRouter({

​		//路由信息对象

​		routes

​	})



6 对外输出 router



### 调用时 

1 先引入 路由文件

2 在vue实例中关联路由管理器 注册

使用 router ：router



### 使用时

1 路由导航  

 <router-link to="/fo">fo</router-link>

to属性 是，跳转的 path地址

2 路由出口

 <router-view></router-view>

![](C:\Users\MI\Desktop\图片\子主题 2.png)

 

## 动态路由（重点）

### params是参数

在router-link 中使用 tag=“li”  可以将标签变为li标签



在定义路由信息时 设置：

在路径后面 使用 ：添加{path:'/uo/:id',component:uo} ，在地址栏直接添加参数，

**获取动态路由的 参数**：

1 使用this.$route.params. xx  获取  耦合度太高，需要解耦

2 使用props参数接收   详情在下面

### props（重点）解耦

1 在路由定义中，设置  props属性

​		{path:'/uo/:id/:name',component:uo,props:true},//动态路由参数 作为props属性传递

2 在组件中使用 props 属性接收路由中定义的参数

​		props:['id','name'],//这里接收路由信息中的参数

3 直接使用{{}}获取即可·

这里也可以是props函数形式



### query参数获取

方法1   query获取参数 {{$route.query.age}}

方法2   to属性传递参数

​	1 定义时需要是命名路由   {path:'/uo/:id/:name', name:'user', component:uo,props:true}//命名路由

​	2  使用是，要指明路由名称， 可以使用 params对象{} 传递参数  也可以使用query 对象传递参数

### 特点：

动态路由切换，不会重新渲染组件，增加程序的高效性，但是周期函数不会重新调用，所以使用监听

### 监听（watch）

1 由于 动态路由切换，不会重新渲染组件，所以需要使用监听，来进行组件的变化

### 导航守卫

1 进入路由之前的回调

   beforeRouteEnter：fn（to, from , next）

​	to表示待加载的路由对象

​	from 表示即将要离开的路由对象

​	next表示要继续执行下一步

​	强调 ：导航守卫最后一定要调用next（），从而1进行下一步操作

​	此时，还未进入路由组件，不能使用this访问组件对象

​	next(function(vm){
​				vm.fetchData(to.params.id);
​			})

vm表示将要加载的组件对象，相当于this

2 路由切换时的回调函数

​	beforeRouteUpdate：fn(to,from next)

​	此时已经在组件内部，可以使用this访问组件对象

​	this指代即将要离开的路由组件对象

​	next(); 函数必须调用，否则程序中断，不向后执行

### 组件中发送ajax

1 使用created 周期函数和 watch函数配合发送

2 使用导航守卫函数发送

## 路由其他知识

### 编程式路由，

利用js的事件来完成

触发的函数

1 不传递参数，可以使用以下方式    或者对象的形式

tiao:function(){
				编程式路由跳转
				this.$router 是路由管理器对象
				 push 表示跳转到特定的路由中，地址

​				this.$router.push('/hh');
}

2 带参数的跳转，如果是query参数  就不需要命名路由

this.$touter.push({
					path:'/hh',
					query:{
						id:000
					}
				})

3 

4 也可以使用 $router.go(-1)来进行返回上一页的操作

### 重定向路由

路由定义时，使用  redirect  来进行重定向位置

### 别名路由

使用clias

### 路径模式

可以在管理器设置 mode为history模式，及传统的URL模式

### 嵌套路由

使用 children

在路由管理器里面设置，里面是   子路由

children: [{
				path: 'bb',
				component: b
			},
		]

跳转的时候 需要使用夫组件的路径

<router-link to="/aa/bb">嵌套到 bb</router-link>

### 命名视图路由

router-view 出口，可能有多个，所以需要 name属性，声明一下，需要配合  定义路由信息时设置

才可以使用

## vuex 组件间通信（重点）

1 原生 父子通信 

2 原生 非父子通信

​		



### vuex（状态管理）（重点）

用于    非父子之间的数据传递，        **存储共享数据           状态是指组件之间共享的数据**

vuex :写简单，思路复杂，中大型项目

bus事件总线 ：思路简单，小型项目

### 使用步骤

1创建

​	1 下载 安装 vuex 

2 创建数据仓库

​		1 引用 

​		2 全局注册 Vue.use(Vuex);

​		3  创建数据仓库 store对象   const store =new Vuex.Store({}）

​				组件之间共享的数据存储在store.state中

​				改变状态数据需要统一的方法

​				mutations 相当于定义了一系列的methods，来修改状态数据

​				getters定义store对象的计算属性（多个数据的计算，或者过滤）

​							

​		4 对外输出

3 在mian中引用数据仓库

4 注册



2 使用里面的数据时，需要使用computed 计算属性来获取的方式有两种

1 方法一

**获取参数 this.$store.state.age;**

​		computed:{
​			age:function(){
​				return this.$store.state.age;
​			}
​		}

2 方法二

使用辅助函数的形式



3 修改 仓库中的内容 需要调用mutatios函数 

**调用 mutatios 需要使用 commit（函数名）**

### 注意

store.state 数据不允许直接修改，需要调用mutatios函数

 **调用 mutatios 需要使用 commit（函数名）**

### vuexstore对象刨析（重点）

注：使用辅助函数都需要  引入



state属性 存放数据

直接获取 this.$store.state    （常用）

辅助参数的形式 mapstate 

​		1 箭头函数

​		2 字符串

​		3 state中的数据，直接作为computed的属性，数组形式  （常用）

​				computed:mapState(['cout','arr'])

​			computed 中既有本地数据，又包含computed的属性，就使用下面的对象展开运算符

​			对象展开运算符   ...mapState （重点使用）



getters属性  是store的计算属性 

辅助函数 mapgetters

​	1  在仓库中先定义 getters，编写函数

​			直接获取	 this.$store.getters.xx;

​	2 使用辅助函数形式获取

​			...mapgetters(['xx','xx']) 



mutations属性   同步修改

注：  这里面的方法是同步方法，不能是异步方法

​	1  但是和上面有不一样

​		参数state 表示当前store对象的state对象
​		参数 payload 表示调用函数时传入的数据
​		add:function(state,payload){}

​		

​		需要在自定义属性中  使用  commit 触发mutations属性的方法 方法又两个参数

​		this.$store.commit('add' ，xx);  这里第二个参数，是传入的数据

​	2 辅助函数

​		使用 ...mapMutations(['函数名'])

​		直接 this.函数名()调用



actions 属性  异步修改的方法

​			1 修改数据的方法有  $store.dispatch

​					1 直接修改 context.state.arr=xxx  （不建议直接修改）
​					2 借助mutations 函数修改，context.commit(addp) （最好使用）

​			2 使用辅助函数 ...mapActions(['xxx'])  这里xxx为actions中的函数名称

​					在actions中可以借助 mutations 函数，修改state中的数据





## v-model绑定问题（重点）





​		

