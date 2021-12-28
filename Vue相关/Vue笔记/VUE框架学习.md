------

# VUE框架学习

## 认识MVC和MVVM框架开发

MVVM模式

VUE基础知识
	MVC模式
	  视图（View）
			接收用户的动作，传递指令给Controller
		控制器（Controller）
			控制器根据用户动作进行业务逻辑，要求模型进行改变。
		模型（Model）
			Model层将新的数据发送给View，用户得到反馈
				模型层用于存储视图层展示的数据

	MV-VM模式
		View层用来接收用户请求，（DOM操作，Ajax等。）
		ViewModel监听View层请求状态的变化和Model层数据的变化
		ViewModel和Model之间进行双向数据绑定，Model层监听ViewModel的变化
		
	MVC和MVVM的本质区别
		MVC
			MVC模式数据是单向通信，遵循View(视图)->controller(控制器)->Model(模型)->View(视图)
		MVVM
			Model不能直接操作View层
			数据可以双向通讯
Controller层 修改为ViewModel层（视图模型）

- \- View层用来接收用户请求(DOM事件、 Ajax等)
- \- ViewModel监听View层请求状态的变化和Model层数据状态的变化
- \- ViewModel和Model之间进行数据双向绑定，Model层 监听ViewModel的变化- MVC和MVVM本质区别
- \- MVC模式，数据是单向通信，
- -遵循View -> Controller -> Model -> View方向- 
- -MVVM模式，数据可以双向通信



## 使用Vue框架

●在应用程序中使用Vue框架主要有以下方法:

- 方式一：直接CDN引入
  一般开发使用的是开发环境版本

   <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script> 

  发布时使用的时生产环境版本

   <script src="https://cdn.jsdelivr.net/npm/vue"></script>

  **方式二**：下载和引入
  开发环境 https：//vuejs.org/js/vue.js

  生产环境 https：//vuejs.rog/js/vue.min.js

  **方式三**：NPM安装

  通过使用webpack和Vue-Cli工具

## Vue基础

el：挂载点

el是用来设置Vue实列挂载（管理）的元素

​		Vue实列的作用范围是什么？			Vue会管理el选项命中的元素及其他的后代元素
​		是否可以使用其他的选择器？           可以使用其他的选择器，但是建议使用id选择器。因为id是唯一性
​		是否可以设置其他的dom元素？      可以使用其他双标签，不能使用html和Body

data：数据对象

​		Vue种用到的数据定义在data种
​		data种可以写复杂类型的数据
​		渲染复杂类型数据时，遵守js的语法即可

## Vue对象

Vue程序核心是Vue对象，Vue对象为MVVM框架中得ViewModel

-Vue对象链接视图层（HTML页面）和模型层（数据）

-当模型层数据发送改变时，即可修改HTML页面中显示得信息

-当视图层发送变化时（用户动作），修改相对应得数据

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**双向绑定**：当一个Vue实列被创建时，它向Vue响应系统中加入了其DATA对象中能找到得所有属性。

-当这些属性得值发生改变时，视图将会产生“响应”，会匹配更新变为新得值。

-当时视图中绑定得属性发生改变时，Vue对象中得相应属性也会修改。

```vue
<body>
   <div id="app">
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 我们的数据对象
  var data = {
​    a: 3
  };
    // 该对象被加入到一个 Vue 实例中
  var vm = **new** *Vue*({
​    el: '#app',
​    data: data
  });
    // 获得这个实例上的 property
	// 返回源数据中对应的字段
	vm.a == data.a // => true
    
	// 设置 property 也会影响到原始数据
	vm.a = 2
	data.a // => 2

	// 反之
	data.a = 3
	vm.a // => 3
    
</script>
```



## Vue生命周期

Vue对象从创建到销毁的过程

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**●beforeCreate:**未创建Vue对象之前得回调，此时el和data都是空。

**●created**：创建Vue对象后得回调，此时el为空，但data已经存在。

●**beforeMount** :绑定View和Model之前的回调，此时el已经有值(原始值)。

●**mouted** : View和Mode|绑定完成之后的回调此时el为绑定后的值。

●**beforeUpdate** : View或Model更新前的回调此时el为上一个值。

●**updated** : View或Model更新后的回调，此时el为更新后的值。

●**beforeDestroy** :销毁Vue对象前的回调，此时el和data仍有值。

●**destroyed** :销毁Vue对象后的回调，此时el和data仍然具有原始值，但是后续再修改Model将不会响应式改变View。

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```vue
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'init message 初始值'
        },
        beforeCreate: function () {
            console.log('beforeCreate');
            //this.代表当前vue得对象
            console.log("el=" + this.$el); //el=undefined
            console.log("data=" + this.$data); //data=undefined
        },
        created: function () {
            console.log('created');
            console.log("el=" + this.$el); //el=undefined
            console.log("data=" + this.$data); //data=[object Object]
        },
        beforeMount: function () {
            console.log(' beforeMount');
            //this.$el 代表DOM得对象
            console.log("el=" + this.$el.innerHTML); //el={ { message } }
        },
        mounted: function () {
            console.log('mounted');
            console.log("el=" + this.$el.innerHTML); //el=init message 初始值
        },
        // 这里我通过vm.message = 'hell' 修改了值
        //修改属性值之后才会使用  显示得值 为更新之前得值
        beforeUpdate: function () {
            console.log('beforeUpdate');
            console.log("el=" + this.$el.innerHTML); //el= init message 初始值
            
        },
        //修改属性值之后才会使用 显示得值 为更新以后得值  
        updated: function () {
            console.log('updated');
            console.log("el=" + this.$el.innerHTML);//el=hell
        }
    });
</script>
```

## **Vue的指令大全：**

常用指令:

- v-text
- v-html
- v-bind

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

条件渲染的指令:

**v-show**
可以控制一个dom的显示隐藏（ 这个指令操作的是dom的display属性 ）

**v-if**
可以控制一个dom的存在与否（ 创建 和 销毁 ）

- **v-if vs v-show 区别**
  v-if 操作的是dom元素（ 组件 ） 的创建或是销毁
  v-show 操作的是dom元素的display属性
  v-if可以有多种使用形式： 单路分支， 多路分支， 双路分支
  v-show 只能写一个单路形式
  一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。
  因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**v-if**
**v-else**
**可做双路分支的一个判断**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**v-if**
**v-else**
**v-else-if**

**可做多路分支的一个判断**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

v-for
Vue中的循环遍历

1. 数组 v-for = " (item,index) in arr " item是arr中每一个元素
2. 对象 v-for = "(item,key,index) in obj " item是obj的属性值
3. json类型数据
4. 嵌套类型数据

key:
给每一个循环的列表添加一个唯一的标识

使用指令 v-bind 来绑定 key

```html
 <div v-for = " (item,index) in lists" v-bind: key = " item.id "></div>
```

v-bind

单项数据绑定： 将一个数据绑定在一个dom的属性上

简写

```html
 <div v-for = " (item,index) in lists" :key = " item.id "></div>
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

***类名绑定***

**vue中如何给dom添加类名**
**1. 直接在dom上绑定类名

2. vue中类名绑定 - 对象形式**
   **目的： dom身上属性class 要和 数据绑定**
   **解决：v-bind**
   **数据中key，我们起的和绑定的对象中的key一样，但是你得知道这两个东西不一样**

```html
  <p :class = "{ size,bg_color }"></p>
  //size是自定义的属性， 它的属性值是undefined， 相当于是false
  <p :class = "{ size: true, bg_color: true }"></p>
  //size也是自定义属性，他的属性是true,那么就会加上去
  <p :class = "{ [s]: true, [bg_color]: true }"></p>
```

**格式： v-bind:class = "{ 属性： boolean }"**
**格式： v-bind:class = "{ [data]： boolean }"**

3. vue中类名绑定的形式 - 数组的形式 【 推荐 】
格式： v-bind:class = "[ 数据 ]"
4. 类名绑定不会覆盖原先的类名
5. 为什么要绑定类名
指令是用来操作dom
目的： 为了将来通过数据来操作类名，类名操作dom

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**v-on**

事件 v-on使用

- 事件源
- 事件绑定形式
- 事件类型
- 事件处理程序

```vue
v-on:eventType = " handlerName "
//简写  v-on:    --- > @
```

**问题： 如果事件处理程序中有三个参数，第三个参数才是事件对象e,如何实现
分析： 我们发现事件处理程序中的第三个参数 e 不在是事件对象了，而是一个undefined
解决： 在函数执行时，传入一个实际参数 $event 来代表事件对象**

```vue
<body>
  <div id="app">
    <!-- <button v-on:click = "helloHandler"> 点击 </button> -->
    <button @click = "helloHandler( 10,20,$event)"> 点击 </button>
  </div>
</body>
<script>
var vm = new Vue({
    el: '#app',
    methods: {
      // 存放事件处理程序
      helloHandler ( a,b,e ) {
        console.log( a )
        console.log( b )
        console.log( e )
      }
    }
  })
  console.log( 'vm', vm )
</script>

```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**v-model**

**双向数据绑定
默认绑定value值
v-model应用于表单元素**

```vue
<body>
  <div id="app">
    <input type="text" v-model = "msg">
    <p> {{ msg }} </p>
  </div>
</body>
<script>
new Vue({
    el: '#app',
    data: {
      msg: 'hello Vue.js'
    }
  })
</script>

```



## 模板语法

##### HTML元素中输出模板变量

数据绑定最常见的形式就是使用“Mustache"语法(双大括号)的文本插值形式。

一解析HTML代码输出(如显示数据库中新闻的内容)，可以使用**v-html属性**。

一如果在HTML属性中输出变量，使用**v-bind:属性名**形式，这种属性我们称之为**动态**属性。

**一v-bind:属性名可以简写成:属性名。**

一若动态属性的变量值为false或null或undefined，则该属性不存在。

```vue
 <div id="app">
        <div>HTML属性输出: <a v-bind:href="url.link" :class="isshow">{{url.name}}</a> </div>
        <div :id="'list-'+id">  动态属性得js表达式形式 </div>
        <div> 算是表达式:{{id+3}}</div>
        <div> 条件表达式:{{isshow ? '真':'假'}}</div>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            id:1,
            isshow: 'show',
            url: {
                link: 'http://www.gaoyuzi.cn/',
                name: '我得个人博客'
            }}});
</script>
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**过渡器**

##### **自定义过滤器**

过滤器得主要作用：输出数据时要求按照指定得格式进行格式化输出。

●在Vue中创建自定义过滤器有两种方法:

（过滤器本质上是一个函数）

（参数就是带过滤得数据）

1. 直接在Vue对象中创建，使用**filters** 来声明过滤器。

**-只对当前Vue实例有效，不能被其它Vue实例使用。**

```javascript
 filters: {
            uppercase: function(value) {
                return value.charAt(0).toUpperCase() +
                    value.slice(1);
            }
        }
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.在全局创建

**-在创建Vue对象之前，使用Vue.filter( )创建全局过滤器。**

**-全局过滤器，任何Vue实例对象均可使用。**

```javascript
Vue.filter('dateformat', function (value) {
        var date = new Date(parseInt(value) * 1000); 
        return date.toLocaleString();
  });
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**使用过滤器**

●使用过滤器时，直接在数据变量后通过|过滤器即可。

-当前变量将会自动当作过滤器的第1个参数处理。

**-过滤器可以串联使用，直接连接|（管道运算符）过滤器即可。**

**-过滤器只能使用在{{}}和v-bind形式输出中，其它都无效。**

```html
< !--在双花括号中-->
{{ message | capitalize }}
< !--在"v-bind中-->
< div v - bind: id=" rawId | formatId"></div>

{{ message | filterA | filterB }} //可以连续处理使用
```

## 计算属性

定义计算属性：Vue实列对象中，**使用computed属性定义计算属性；**

使用计算属性：在视图模板中，直接使用计算属性的名称就可以；

##### **计算属性的主要特点：**

当原始数据发生改变时，计算属性值会一并修改

1. 过滤器：可以全局使用                                             计算属性： 没有全局使用的这一项目
2. 过滤器：只针对一个变量                                         计算属性：可以多个变量
3. 过滤器使用时：过滤器使用管道的一种形式           计算属性使用时：只需要使用名字就可以
4. 过滤器 只能使用{{}}和v-bind中                               计算属性可以使用在任何有效的Vue模板结构中

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Vue对象中可以使用methods方法，用来编写定义函数。**

methods函数，完全可以使用函数模板中，注意使用函数调用形式使用。

- 计算属性和方法的区别：

- **计算属性只有在它的相关依赖发生改变时才会重新求值；**

- **方法每一次调用都会重新计算，无论它的依赖项数据是否发生改变；**

- ```html
    <div id="app">
          <!-- <div>
              原始字符串:{{message}}
          </div> -->
          <div>
              过滤字符串:{{message | toUpper}}
          </div>
          <!-- <div>
              多重过滤:{{message | toUpper | substr}}
          </div> -->
      </div>
      <div id="text">
          过滤字符串:{{message | toUpper}}
      </div>
    
  ```

  

## 列表渲染

列表渲染

●在Vue中使用**v-for**指令根据--组数组数据进行列表渲染。

**v-for指令需要使用item in items形式的特殊语法，items 是源数据数组，item 是数组元素迭代的每一项。**

**●v-for渲染数组时，可以给出index参数，表示渲染的数组元素下标信息(下标从0开始)。**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

渲染对象

●**v-for渲染，不仅支持渲染数组元素，同时可以渲染JS对象数据。**

**-渲染对象时，将会遍历输出对象的所有属性值。**

-**渲染时可以使用(value, key, index) in object 形式，其中value表示当前属性值，key表示当前属性名称，key唯一标识，index表 示当前数字索引。**

**v-for渲染数组时，可以给出index参数，表示渲染的数组元素下标信息（下标从0开始）**

基本格式为：v-for=“（item，index）initems”

```html
 <div id="app">
        <div>
            <table>
                <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>年龄</th>
                </tr>
                <tr v-for="(user, index) in adults">
                    <td>{{index +1}}</td>
                    <td>{{user.name}}</td>
                    <td> {{user.age}}</td>
                </tr>
            </table>
        </div>
        <div>
            渲染对象数据:
            <span v-for="(prop,key,index) in adults">
                {{index}}-{{key}}-{{prop}}
            </span>
        </div>
        <div>
            渲染范围:<span v-for="item in 10">{{item}}</span>
        </div>
    </div>
```

```javascript
 //创建全局过滤器(要在创建Vue对象之前来创建 )
    Vue.filter('toUpper', function (value) {
        return value.toUpperCase();
    });


    var vm = new Vue({
        el: '#app',
        data: {
            message: 'hello'
        },
        filters: {
            toUpper: function (value) {
                //value 即为待过滤得数据
                return value.toUpperCase();
            },
            substr: function (value) {
                return value.slice(2);
            },
        }
    });
    var vm2 = new Vue({
        el: '#text',
        data: {
            message: 'hello'
        }

    });

```



计算属性和列表渲染.

**●渲染数据时，可能要求只渲染满足条件的数据(如只渲染年龄大于18岁的用户)此时要结合计算属性进行列表渲染。**

**-在计算属性不适用的情况下(例如，在嵌套v-for循环中)，可以使用-一个method方法（手动传入参数）**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 数组和对象更新检测

●问题:

对于已经渲染的数组元素，若使用下标形式更改数组某个元素值，不会响应式修改已经渲染的数据。

-若数组元素为对象，则修改对象的属性时，不会产生问题。

针对这种问题，有以下两种解决方案：

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**-使用Vue.set() 或vm对象.$set()形式修改数组元素；**

在控制台可以通过这二种方式进行修改。

```javascript
vm.momos[2] = 'xhz' 
"xhz"
第一参数 数组 或者对象  
第二个参数 下标
第三方参数 更新以后的值
Vue.set(vm.momos,0,'xhz')
"xhz"
```

●数组变异方法，是指会改变原始数组的方法。

Vue包含-一组观察数组的变异方法它们改变原始数组时，也将会触发视图更新。

**\- push( )、pop( )、shift( )、unshift( )- sort()、reverse( )**

**\- splice() :在数组中添加或删除项目**

●数组变异方法

**\- splice() :在数组中添加或删除元素**

- -从数组中删除元素: arr.splice(删除位置下标， 删除元素个数)

- -向数组中添加元素: arr.splice(添加位置下标，0, 待添加的元素)

●对于已经创建的Vue实例，Vue不能动态添加对象数据属性的信息;

若欲动态为对象添加响应式属性，使用**Vue.set(object, key, value)方法**

\- Vue可以动态修改对象的属性信息;

**-同数组类似，也可以使用Vue对象..$set( object, key, value )方法添加属性。**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 条件渲染

●可以使用v-if指令根据判断条件，动态地决定是否要渲染某一块元素。

- \- v-if 判断条件可以是任何有效的JS表达式;
- **\- v-if可以结合v-else、 v-else-if指令使用，实现更复杂的条件判断。**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

●Vue会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

●*若不需要复用已有元素，可以为指定元素添加唯一key 属性，这样每次条件成立，均会重新渲染该指定元素。*

```html
<div v-if="type=='email'">
<!-- 通过添加不同的 key属性 可以限制强制刷新效果 -->
email：<input placeholder="请输入email" key="mo">
</div>
<div v-else>
email：<input placeholder="请输入用户名" key="pp">
</div>
```

●另一个用 于根据条件展示元素的选项是**v-show**指令，只不过带有v-show的元素始终会被渲染并保留在DOM中。

**-v-if会根据条件来判断是否生成DOM元素，而v-show会始终生成DOM元素;**

**\- v-show只是简单地切换元素的CSS属性display，从而实现元素的显示或隐藏。**

```html
 <div>
            此部分内容会条件性的显示：
            <span v-if="isshow ==false">当条件为真 才显示内容</span>
        </div>
        <div>
            v-show指令：
            <span v-show="isshow">当条件为真 才显示内容</span>
        </div>
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**v-if和v-for**

●当v-if 和v-for 同时使用于同一个元素时， **v-for具有更高的优先级**;这意味着v-if将分别重复运行于每个v-for循环中。

```html
<div>
            只显示大于18岁的用户：
            <ul>
                <li v-for="item in users" v-if="item.age > 18">{{item.name}}</li>
            </ul>
        </div>
```

```javascript
   var vm = new Vue({
        el: '#app',
        data: {
            islogined: false,
            score: 80,
            type: 'email',
            isshow: false,
            users: [
                { name: 't1', age: 16 },
                { name: 't2', age: 22 },
            ]
        },
        computed: {
            momo: function () {
                if (this.score >= 90) {
                    return '很棒';
                } else if (this.score >= 80) {
                    return '还好';
                } else {
                    return '还需要努力！';
                }
            }
        }

    })

```



## 事件处理

**郷定事件赴理函数**

· Vue中绑定事件处理函数，直接在HTML元素上使用**v-on**指令绑定即可。

-可用的事件有:鼠标事件和键盘事件;

-**可以使用筒写形式@事件名郷定事件赴理函数。**

```html
  			<div>
            <button v-on:click="count++">使用count+1</button>
            <button @click="count--">使用count-1</button>
            <!-- 自带调用 increase函数 -->
            <button @click="increase">使count增加</button>   
            <button @click="add(2)">使count加+2</button>
            <!-- 不能使用内置函数 -->
            <button @click="alert('hello')">显示提示框</button>
            <!-- 使用内置函数 直接写原生的就可以 -->
            <button onclick="alert('hello')">显示提示框</button>
            <span> count={{count}} </span>
       		 </div>
```

●Vue中绑定事件处理函数，直接在HTML元素上使用v-on指令绑定即可。

-事件处理方法可以直接在v-on指令中编写，也可以使用自定义函数; -自定义函数要在Vue对象的methods块中给出定义。

```javascript
methods: {

showAlert: function() {

// ....

}

}
```

![JS典型事件](C:\Users\51037\Desktop\MD格式知识点记录\JS典型事件.png)

##### 事件修饰符

●Vue.js为v-on指令提供了事件修饰符，方便在事件处理程序中实现阻止默认行为、阻止事件冒泡等操作。

-直接在v-on指令后使用点号连接事件修饰符即可;

```HTML
<div>
            <!-- 超链接阻止默认行为 @click.prevent="cli" -->
            事件修饰符：
            <a href="http://www.gaoyuzi.cn" @click.prevent="cli" target="_blank">个人博客</a>
        </div>
```

| 事件类型 | 事件修饰符  | 意义                                           |
| :------- | ----------- | ---------------------------------------------- |
| 鼠标事件 | stop        | 阻止事件冒泡                                   |
| 鼠标事件 | prevent     | 阻止事件默认行为                               |
| 鼠标事件 | capture     | 捕获内部元素事件                               |
| 鼠标事件 | self        | 只有当前元素才触发事件<br />（内部元素不触发） |
| 鼠标事件 | once        | 只执行一次事件                                 |
| 键盘事件 | KeyCode值   | 指定按键触发事件                               |
| 键盘事件 | KeyCode别名 | 指定按键触发事件                               |
| 键盘事件 | 系统修饰键  | 功能键（ctrl、shift、alt）                     |



## 事件对象

**事件对象**

●event对象代表事件的状态，比如事件触发时的HTML元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态等等信息。

\- event.type :触发的事件类型

**\- event.target :触发事件的HTML元素**

\- event.preventDefault( ) :阻止事件的默认行为

\- event. stopPropagation( ) :阻止事件冒泡

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

●Vue中使用事件对象，需要分两步:

v-on绑定事件处理函数时，**手动传递事件对象$event**

若需要传递多个参数，**$event永远为最后的参数**

-在**methods**定义函数位置，通过**形参接收事件对象**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**事件对象的应用**

●问题: v-for遍历元素，为每一-个元素绑定单击事件处理函数。

-**直接在元素上绑定事件处理函数，导致大量HTML元素绑定事件处理函数，影响程序执行性能，尤其对于移动端性能更差。**

```html
<ul>
<li v-for="(item， index) in list"
@click="handleClick( index)">
{{ item }}
</li>
</ul>
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### 事件委托机制：

**-借助event事件对象，在父元素之，上绑定事件处理函数;**

**-事件处理中，根据HTML动态属性dataset判断是哪- - 个元素触发的事件。**

```html
<ul @click="handleClick( $event)">

<li v-for="(item， index) in lists"

:data- index="index">

{{ item }}

</li>
</ul>
```

```javascript
methods: {

handleClick: function(event) {

console. log(event . target . dataset. index);}

}
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 表单处理

**表单输入绑定**

●可以用v-model指令在表单元素上创建双向数据绑定，它会根据控件类型自动选，取正确的方法来更新元素。

●可以用v-model指令在表单元素上创建双向数据绑定，它会根据控件类型自动选取正确的方法来更新元素。

\- <input>. <textarea>控件 :其value值属性即为绑定的响应式变量

-单选框/复选框:其选中值，即为绑定的响应式变量(与value属性保持相同)- <select> :其选中值，即为绑定的响应式变量

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**表单事件处理**

当表单元素发生变化时，会触发相应事件，可以为表单元素绑定事件处理函数。实例:

输入框输入完成时(失去焦点)，显示提示消息

-单选框选择选项时，显示提示消息

-下拉框选项发生改变时，显示提示消息

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 处理资源加载闪烁问题

给vue关联的元素上添加**v-cloak**
**设置CSS样式[v-cloak]:{display:none}**
**在VUE模板没有编译完成之前。**

**不要显示vue模板信息**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 内存工作原理

**内存**
		栈区
		堆区
创建变量时，堆区保存变量，栈区指向内存空间，栈区存放变量地址
新添加数据的时候必须创建一个新的堆区。不然新的地址全都指向老的堆区

## **组件**

	本质是Vue.Compoent对象，而此对象是Vue对象的扩展类对象
	vue组件作用：**复用**
		**使用template模板*
		*想要有一模一样的页面内容，只需再次调用组件即可*
## 全局和局部组件

创建Vue组件有多种方式，可以使用全局创建方式也可以使用局部创建力式

**1、使用components关键字来创建局部组件**

**2、全局创建 Vue.component**

**3、可以使用Vue.extend(）方法创建Vue组件，然后再注册到Vue实例对象上;**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**全局创建组件:使用Vue.component(‘组件名',{组件参数})方式创建，这样的组件对于所有Vue实列对象都通用。**

**使用Vue组件：直接再HTML代码中，写出指定的标签即可（标签就是组件名称）。**

```Vue
   <!-- 1.组件的作用:复用 -->
    创建组件：
    1.局部创建 components
    2.全局创建 Vue.component
    <div id="app">
        #vm使用自定义组件
        <my-components> </my-components>
    </div>

    <div id="app">
        #mo使用全局创建自定义组件
        <my-components> </my-components>
    </div>

</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    //全局创建自定义组件
    Vue.component('my-components', {
        template: '<h3>this is my components</h3>'
    })

    var vm = new Vue({
        el: '#app',
        //局部创建s
        components: {
            'my-components': {
                //tempalte 模板
                template: '<h3>this is my components</h3>'
            }
        }
    });
    var mo = new Vue({
        el: '#app',
    });
</script>
```

## Vue组件剖析

**·Vue组件本质上是VueComponent对象，而VueComponent对象是Vue对象的扩展类对象。**

**可以使用Vue.extend(）方法创建Vue组件，然后再注册到Vue实例对象上**

Vue组件创建时可以使用任何有效的Vue对象属性和方法（如data、methods、computed、created、......)。

## **Vue组件的HTML模板**

```vue
1、``    模板字符串：支持字符串的换行（在tab健的上边）	
<body>
    <div id="app">
        <my-component></my-component>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('my-component', {
        //模板字符串 => `
        template: `<ul>
                     <li>1</li> 
                     <li>2</li> 
                   </ul>`
    })
    var vm = new Vue({
        el: '#app'
    });
</script>
</html>
```

```vue
2、template模板的形式
**template模板形式***（复杂模式下的写法）最常用的
<body>
    <div id="app">
        <my-component></my-component>
    </div>
    <!-- template模板形式 -->
    <template id="rating">
        <div>
            <p href="" v-for='i in 5'>
                <span>
                    this   is  my  component
                </span>
            </p>
        </div>
    </template>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>

    Vue.component('my-component', {
        template:'#rating'
    })
    var vm = new Vue({
        el: '#app'
    });
</script>
```

```vue
3、script模板的形式
<body>
    <!-- script -->
    <script id="#rating" type='text/x-template'>
        <div>
             <p href="" v-for='i in 5'>
                <span>
                    this is my component
                </span>
            </p>
        </div>
    </script>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('my-component', {
        //模板字符串 => `
        // template: `<ul>
        //              <li>1</li> 
        //              <li>2</li> 
        //            </ul>`
        //  template模板形式
        // template:'#rating'
        template: '#rating2'
    })
    var vm = new Vue({
        el: '#app'
    });
</script>
```

## Vue组件的属性

创建组件时，可以使用任何有效的Vue对象属性，如data属性、computed属性methods属性等等。

data属性:**表示Vue组件可用的响应式数据**

**-必须是面数形式，否则程序出错;**

**-必须在函数中返回独有对象，否则程序会产生对象共这内存的bug。**

```vue
    var data = {
        me: 'hello world'
    }
    Vue.component('my-component', {
        template: '#my-template',
        //data:data
        //data属性的值是函数形式
        //data属性是自己的独立属性，不能与全局变了共享


        //原则：高内聚低耦合
        data: function () {
            return {
                me: data.me
            }
        }
    })
    var app = new Vue({
        el: '#app',
        data: data
    })
```

**·computed属性:Vue组件中使用的计算属性**

**methods属性:Vue组件中使用的自定义方法（函数）**

**-其它属性:生命周期回调方法、过滤器**

```vue

```

## 组件props属性

### props属性

组件实列的作用域是孤立的，**不能在子组件的模板内直接引用父元素的数据；**

*父元素的数据需要使用props才能下发到子组件中*；

**-子组件中通过props属性，声明待接收的数据名称；**

**-父元素中使用组件时，通过HTML属性为子组件传递数据；**

父元素的数据需要通过props下发到子组件中

-HTML属性是不区分大小写的，当使用的不是字符串模板时，**camelCase(驼峰式命名)的 props属性需要转换为相对应的kebab-case(短横线分隔式命名)形式。**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### v-bind传递动态数据

v-bind  **1、动态绑定 2、获取值的原本类型**

·与绑定到任何普通的HTML属性相类似，**可以用v-bind来动态地将prop绑定到父元素的数据。**

**-每当父元素的数据变化时，该变化也会传导给子组件**

**-把一个对象的所有属性作为prop进行传递，使用不带任何参数的v-bind**

**v-bind来动态地将props绑定到父元素的数据**

- **v-bind另一个作用是可以传递数值型数据（若不使用v-bind形式，则为字符串数据)**

- ```vue
  <body>
      <div id="app">
          <!-- 使用html标签的形式调用组件 -->
          <mm mo='???' my-mss='Vue nb' v-bind='todo' number='12'></mm>
      </div>
      <template id="my-tem">
          <div>
              组件使用props接收数据
              mo={{mo}}
              myMss={{myMss}}
  
              <!-- 接收的数据格式为对象 -->
              tetx={{text}}
              complate={{complate}}
  
              <!-- v-bind 传递数值类型 -->
              <div>
                  number={{number}}
                  number={{typeof  number}}
              </div>
  
          </div>
      </template>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
      //全局注册自定义组件
      Vue.component('mm', {
          template: '#my-tem',
          //props表示要接收的数据
          //props的值是数组的形式 可以接收多个数据
          props: ['mo', 'myMss', 'text', 'complate', 'number']
      })
      var app = new Vue({
          el: '#app',
          data: {
              mo: 'hhhh',
              todo: {
                  text: 'hello',
                  complate: true
              }
          }
      });
  </script>
  ```

  

### 传递数据时注意的问题

·**通过props传递数据时，需要注意几个问题:**

-若props指明数据，但使用时未传递该数据，则在组件中该数据为undefined

-若传递了未在props里声明的数据，则该数据会被当作组件的HTML属性处理

-若传递的数据和组件中的HTML属性相同，则组件中HTML属性值会被替换或会被合并添加

-只有class属性和style属性为合并添加，其它均为替换

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 组件嵌套使用

·定义组件时，**可以在组件内部使用其它组件元素**

-可以在组件定义结构中，**通过components属性添加子组件(类似于Vue实例中的components属性)。**

**-此形式子组件，只能被当前组件使用:不能被其它组件（或根元素）使用。**

**-可以使用Vue.component注册并创建组件，在组件内部可以直接使用子组件的内容。**

```vue
<body>
    <div id="app">
        <parent></parent>
    </div>
    <template id="par">
        <div>
            我是父组件
            <zi-parent></zi-parent>
        </div>
    </template>
    <template id="zi">
        <div>
            <ul>
                <li v-for="tiome in 5">
                    {{tiome}}
                </li>
            </ul>
        </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        //创建父组件
        Vue.component('parent', {
            template: '#par'
        })
        //全局子组件
        Vue.component('zi-parent', {
            template: '#zi'
        })
        var app = new Vue({
            el: '#app'
        })
    </script>
</body>
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### props单向数据流

·Props是单向绑定的:

**当父组件的属性变化时，将传导给子组件，但是反过来不会。**

**这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。**

**·每次父组件更新时，子组件的所有props都会更新为最新值。**

**这意味着你不应该在子组件内部改变props。**

如果你这么做了，Vue 会在控制台给出警告。

·**若必须修改子组件的props数据，可以使用局部变量或计算属性形式。**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 父元素引用子组件 ref

**Vue提供了两种机制，便于在父元素中使用子组件的数据。**

父元素引用子组件对象，**data-添加到dataser属性池中，ref添加到refs属性池。**

在使用子组件时，使用ref属性为子组件指定一个id值

在父元素中，使用this.$refs.子组件ID值获取子组件的对象引用

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 递归组件

**组件在内部可以递归地使用自身组件元素，叫递归组件。**

**组件递归使用时，务必要注意递归的结束条件，不要产生无穷循环。**

使用场景

多级菜单，无限极分类

## 组件通信（重点！难点！）

·组件之间必然需要相互通信:

#### 父组件可能要给子组件下发数据

子组件则可能要将它内部发生的事情告知父组件。

·**父子组件的关系可以总结为prop向下传递，事件向上传递。**

**父组件通过prop给子组件下发数据**

**子组件通过事件给父组件发送消息。**

```vue
<body>
    <div id="app">
        <my-com v-on:bb='aa'></my-com>
    </div>

    <template id="my-tem">
        <div>
            <button @click='hClick'>点击向父元素发生数据</button>

        </div>
    </template>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('my-com', {
        template: '#my-tem',
        methods: {
            hClick: function () {
                console.log('点击了');
                //使用emit向父元素发送自定义事件
                this.$emit('bb');
            }
        }
    })
    var app = new Vue({
        el: '#app',
        methods: {
            //监听自定义事件
            aa: function () {
                console.log('父元素已接收到了子组件的bb事件')
            }
        }

    })
</script>
```

#### 子组件向父组件发送消息

使用Vue自定义 事件机制:

**一父组件使用$on或v-on监听子组件事件**

**一子组件使用$emit向父组件触发事件**

-子组件向父组件发送事件消息时，**可以一并传递其它附加数据;**

父组件直接在事件监听函数中**通过形参获取这些附加数据参数**（也可以使用**auguments[]数组**接收）。

```vue
<script>
    Vue.component('my-com', {
        template: '#my-tem',
        methods: {
            hClick: function () {
                console.log('点击了');
                //使用emit向父元素发送自定义事件
                //同时传递数据
                this.$emit('bb', '子组件传递的数据');
            }
        }
    })
    
    var app = new Vue({
        el: '#app',
        methods: {
            //监听自定义事件
            aa: function () {
                console.log('父元素已接收到了子组件的bb事件');
                console.log('子组件传过来的数据：' + arguments[0]);
            }
        }
    })
</script>
```

#### 非父子组件通信

·有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，**可以使用一个空的Vue实例作为事件总线创建一个空的对象。**

**-在组件A中使用$emit触发事件**

**一在组件B中使用$on接收事件**

## 组件v-model绑定

原理：

**v-model指令本质上会监听表单输入元素的input事件，从而实现视图->模型的修改**

**v-model本质上会绑定当前表单输入元素的value属性，从而实现模型->视图绑定**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Vue框架中表单控件可以使用v-model实现数据的双向绑定

-当表单数据发生改变时，绑定的数据变量也一并发生改变

―当数据变量发生改变时，表单数据也一并发生改变

 Vue框架中表单控件可以使用v-model实现数据的双向绑定

- **v-model双向绑定实际上是监听表单元素的input事件或change事件，当事件触发时，即刻修改绑定元素的值。**

- ```VUE
  <body>
      <div id="app">
          <div>
              原生表单控件的双向绑定
              <!-- view变，model跟着变，监听表单元素的 input事件 或 change事件
              model变， view跟着变 v-bindl:value
           
              v-model是input事件和value属性绑定的语法糖(缩写) -->
              <div>
                  <!-- <input type="text" v-model='name'> -->
                  <input type="text" @input='name=$event.target.value'>
  
              </div>
              <div>
                  您输入的是:{{name}}
              </div>
  
          </div>
      </div>
  
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
      var vm = new Vue({
          el: '#app',
          data: {
              name: ''
          },
          methods: {
              hinput: function () {
                  this.name = event.target.value;
              }
          }
      })
  </script>
  ```

  

### 自定义组件的v-model绑定

创建自定义的表单输入组件，使用v-model来进行数据双向绑定

一**自定义组件v-model，仍然是使用v-bind:value和v-on:input事件进行处理**

-**组件要接收名为value的 prop数据，并使用v-bind:value绑定到表单元素上**

-自定义组件，**要手动emit父元素的input事件**，并传递新的数据值

·创建自定义的表单输入组件，使用v-model来进行数据双向绑定

一默认情况下，**一个组件的v-model会使用value prop和 input事件;**

**但是诸如单选框、复选框之类的输入类型可能把value用作了别的目的。**

一此时，**可以在组件内使用model属性指定其它的prop和事件**

```vue
<body>
<body>
<body>
<body>
    <div id="app">
        <div>
            原生表单控件的双向绑定
            <!-- view变，model跟着变，监听表单元素的 input事件 或 change事件
            model变， view跟着变 v-bindl:value
         
            v-model是input事件和value属性绑定的语法糖(缩写) -->
            <div>
                <!-- <input type="text" v-model='name'> -->
                <input type="text" @input='name=$event.target.value' v-bind:value='name'>

            </div>
            <div>
                您输入的是:{{name}}
                <momo></momo>
            </div>

            <hr>
            <div>
                自定义组件的双向绑定
                <!--  v-model是@input和：value的语法糖
                        <input type='text' @input='' :v='age'>
                 -->
                <momo @input='hinput($event)' :v='age'></momo>
                <div>
                    父元素的age={{age}}
                </div>
            </div>
        </div>
    </div>

    <template id="mo">
        <div>
            这是组件的input框:
            <p>{{v}}</p>
            <input type="text" :value='v' @input='hinput($event.target.value)'>
            <!-- 动态绑定事件 input事件是把数据传出 然后通过自定义函数   this.$emit('input', nval);
                来进行向父元素发送 则例父组件用了 语法糖 省略了@input='' :value='age' 数据会之间改变
                value 则是接收 @input='hinput($event)传出的数据。
            -->
        </div>
    </template>

</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>

    Vue.component('momo', {
        template: '#mo',
        props: ['v'],
        methods: {
            hinput: function (nval) {
                console.log(nval);
                //向父元素发送自定义事件
                this.$emit('input', nval);
            }
        }
    })

    var vm = new Vue({
        el: '#app',
        data: {
            name: '',
            age: 14
        },
        methods: {
            hinput: function (event) {
                console.log(event);
                this.age = event;
            }
        }
    })
</script>
```

### DOM模板解析注意事项

**is =“组件名称” 属性解决HTML限制问题**

（限制就是  比如表格中，只能使用tr th td 而不能使用其他的标签名称）

### 非父子组件通信

创建 事件总线 var bs=new Vue()

触发的是用$emit(‘自定义事件’，‘参数’)

接受的是用$on(‘自定义事件名称’，‘执行的函数’)接受

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## v-model工作原理 （重点）

就是 v-bind 和 v-on 的语法糖 (简写)

input事件 和 value 属性

**自定义组件中不可以直接使用v-model指令**

v-on 事件 是 修改父元素的 模型     视图 view  ----   模型 mode   的方向

v-bind事件 时 绑定表单输入元素的value属性， 模型 mode ---  视图 view 的方向

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 插槽

使用   slot 标签   在模板中  创建插槽 

**使用组件时，如果组件中没有 标签，就会使用插槽中的元素，**

**如果有就会显示组件中的元素**

如果有多个插槽，就需要给插槽指定名称

替换插槽时，就可以使用 slot=“名称” 替换指定的插槽



## Node和npm

node.js环境的搭建过程

淘宝镜像：npm install -g cnpm --registry

解决：系统禁止运行脚本 问题![img](file:///C:\Users\51037\AppData\Roaming\Tencent\QQTempSys\%W@GJ$ACOF(TYDYECOKVDYB.png)https://www.cnblogs.com/carriezhao/p/12618392.html

使用cnpm -v 来查看安装状态，使用cnpm install vue 来进行vue包的安装

## 模块化创建VUE

## 下载

下载 node.js

安装 cnpm  在黑窗口中

cnpm install xxx    下载文件

cnpm init 初始化package.json文件



## 引入依赖包

可以使用script (一般不使用)

使用webpack 打包工具 ，打包使用   **(常用)**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

第二种方式，使用webpack 配置文件的形式

1. `entry`：入口文件（你要打包，就告诉我打包哪些）
2. `output`：出口文件（我打包完了，给你放到哪里）
3. `module`：模块（放lorder，编译浏览器不认识的东西）
4. `plugins`：插件（辅助开发，提高开发效率）
5. `devServer`：服务器（webpack提供的本地服务器）
6. `mode`：模式，分为开发模式、生产模式。此为4.X里新增的

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

第三种方式 使用webpack 配置文件的打包文件  package

先使用  cnpm init 初始化 package 文件

在 scripts  字段中，添加自定义命令，来进行打包

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## webpack打包文件

第一种方式

使用命令行的形式 

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

第二种方式，使用webpack 配置文件的形式

entry 是入口文件

output 是出口文件

```javascript
// webpack配置文件
module.exports = {
    // 入口文件，__dirname表示当前文件的根目录
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    // dev-server的配置信息
    devServer: {
        contentBase: __dirname + '/public', // 服务器根目录
        port: 8080, // 服务器端口号
        inline: true // 当源文件发生改变时，自动刷新执行结果
    }
};
```



第三种方式 使用webpack 配置文件的打包文件  package

先使用  cnpm init 初始化 package 文件

在 scripts  字段中，添加自定义命令，来进行打包



## webpack内置服务器

## 下载

cnpm install -g webpack-dev-server 全局安装

## ES6输出语法

**export default** 指定一个默认输出

**default 输出时，不允许使用{ } 当前定义的名称对位是无效的**

**一个模块中，只允许default 一个内容**

**引入方式 import 名称 from  ‘./文件地址’**

```javascript
import 'bootstrap/dist/css/bootstrap.min.css' //引入bootstrap
import axios from 'axios';
```



## vue-cli开发工具（重点）

安装 **npm install -g vue-cli**

npm install @vue/c li  -g  全局安装脚手架

卸载 npm uninstall vue-cli -g

查看 脚手架版本  vue --version

Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
```

使用脚手架2点几版本命令方法：

**简单模板  vue init webpack-simple 名称**

**创建项目完整 vue init webpack 名称**

需要下载依赖   **cnpm install**

运行 **cnpm run dev** 

.**webpack应用程序目录结构分析**

- build目录: npm编译脚本命令文件目录
- - config目录︰应用程序配置文件目录
  - -src目录︰应用程序目录
  - components目录:自定义组件目录
  - router目录:vue路由文件目录（若使用路由)
  - static目录:第三方静态资源目录(不会被webpack打

脚手架 CLi3.0 创建项目 

vue create  项目名称

运行之后，会看到以下选项：

（1）default（babel,eslint）能够快速构建一个项目、没附带人格辅助功能npm包

（2）Manually select features 自定义依赖npm包

等之后还有很多，可以自行百度。

使用 npm run serve 进行运行



## 单文件组件（重点）

### 创建

**vue支持vue为拓展名的单文件组件**

有三部分 **template（vue模板）  script（JS）   style（css模板）** 

**在vue组件中只写v-for会提示错误，需要添加一个唯一标识 key值** 

使用v-for循环时，必须使用key 唯一标识， **key的作用主要是为了高效的更新虚拟DOM**

```javascript
<tr v-for="(user,index) in users" :key="index">
        <td>{{index+1}}</td>
```

js中 **export default{}** ES6的模块导出

```javascript
<script>
export default {
    name:'Menu1'
}
</script>
```

**style中 scoped限定**  样式只对当前组件样式有效

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 使用

1. 使用 import 引入组件  ./表示当前目录

2. 注册 ，可以全局，也可以局部，建议局部   components：{注册}

3. 使用组件 标签名 

<template>
     <div id="app">
       <ul @click.prevent.stop="jump($event)">
         <li>
           <a href data-menu="Menu1">menu1</a>
         </li>
         <li>
           <a href data-menu="Menu2">menu2</a>
         </li>
       </ul>
       <!-- 动态显示组件内容 -->
       <component :is="currentCOM"></component>
     </div>
   </template>
   <script>
   //1、引入组件
   import Menu1 from "./components/Menu1";
   import Menu2 from "./components/Menu2";
   export default {
     name: "app",
     data() {
       return {
         currentCOM: "",
         name: "",
         age: "",
         id: ""
       };
     },
     //2、注册
     components: {
       Menu1,
       Menu2,
     },
     methods: {
       jump: function (event) {
         console.log(event.target);
         if (event.target.tagName.toLowerCase() == "a") {
           console.log(event.target.dataset.menu);
           this.currentCOM = event.target.dataset.menu;
         }
       },
     },
   };
   </script>

## jQuery ajax

```javascript
原生4步骤
javascript
function loadFooter() {
  //1 建立xhr对象
  var xhr_footer = new XMLHttpRequest();
  //2 设置状态inxi改变处理函数
  xhr_footer.onreadystatechange = function () {
    //当readyState的值改变时自动触发执行其对应的函数（回调函数）
    if (xhr_footer.readyState == 4) {
      //拿到ajax的返回数据
      var res = xhr_footer.response;
      //将拿到的数据放到header_box中 引入头部效果完成
      var footer = document.getElementById("footer");
      footer.innerHTML = res;
    }
  };
  //3 建立请求连接
  xhr_footer.open("get", "footer.html", true);
  // 4 发送请求
  xhr_footer.send(null);
}
```



### axios库（重点）

1 安装  cnpm install axios -g

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1 **使用axios()发送ajax 使用then(函数)，接收**

```vue
  //方法一 直接使用axios函数
        axios({
            //url ajax 请求地址
            url: 'http://api.hbynlsl.cn/index.php/users',
            method:'GET'
        }).then(function(response){
            console.log(response.data);
        })
```

2 **辅助函数**

```
 // 方法二：使用axios.get()发送请求
        // axios.get('/users',{
        //     // 基准地址 baseURL
        //     baseURL:'http://api.hbynlsl.cn/index.php'
        // }).then(function(response){
        //     console.log(response.data);
        // })
```

3 **使用实例对象的形式 发送Ajax  (重点)**

*创建axios 对象，设置baseURL地址*

*调用实例对象，使用then()接收*

```javascript
// axios发送ajax请求的第三种方式 : 创建实列对象
// 把axios的实列对象作为vue原型链的($axios名字可以随意变) 属性名 原型链为方便使用
Vue.prototype.$axios=axios.create({
  baseURL: 'http://180.76.165.143:8080/MyUser'
})

//方法三：调用实列对象
    request.get('UserControl').then(function (response) {
        console.log(response.data);
    })
```

**发送请求的4种方式**

**get    post    put    delect**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**post方式** 

传递参数时，需要转义成查询**字符串的格式** 

使用querystring辅助函数的形式(命令行形式的安装)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**axios提交POST或PUT数据时，数据参数的处理**

-使用querystring 扩展包形式

-使用querystring 扩展包形式

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**使用axios HTTP请求库时**

 成功-可以使用 then( ) 方法捕获axios请求获取到的响应数据

失败-可以使用 catch( ) 方法捕获请求过程中发生的错误异常

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### axios跨域问题

·Ajax跨域问题

-可以在客户端使用代理机制绕过跨域的问题

-在webpack.config.js配置文件中添加本地服务器代理

-只对dev环境有效，build环境中仍然存在跨域问题，需要服务器端支持

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## RESTful API与传统api的区别(方式及语法)

示例：一个状态数据操作接口

**传统模式：**

api/getstate.aspx- 获取状态信息
api/updatestate.aspx - 更新状态信息
api/deletestate.aspx - 删除该状态的数据

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**RESTful模式：**

api/state 只需要这一个接口

GET 方式请求 api/state- 获取该状态的数据
POST 方式请求 api/state- 更新该状态的数据
DELETE 方式请求 api/state- 删除该状态的数据

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



## 单页面应用vue-router 路由

### 单页面应用SPA

优点：

**用户体验好**，对于内容的改变不需要再次加载，由于数据层和UI的分离，可以重新编写一个原生的有移动设备应用程序而不用

**程序执行性能高校**，它对于服务器压力很小，消耗的宽带更少的宽带，能够与面向服务的构架好地结合

**缺点：不利于SEO，不利于浏览器书签收藏等。**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**vue中使用spa的相关概念**

路由 :页面跳转时，选择合适的模块来相应跳转

授权：获取数据时，是否具有权限访问，可以使用token授权机制或结合cookie和session进行授权访问

数据展示：不同模块的数据，如何进行渲染展示

**状态管理：在模块之间，进行共享数据**



location.has= 'aaa'

pushState相当于入栈和出栈的方式。

history.pushState({},'','home');

接口等同于浏览器界面的前进和后退；

history.back(); 等价于 返回history.go(-1)

history.forward() 等价于 history.ho(1)



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 注意时

router  路由器对象 包含一些操作路由的功能函数，来实现编程式导航

routes 对象数组 用于 配置多个路由信息对象

route 一个路由信息对象

### 安装时

```
1、下载 安装 vue-router
cnpm install vue-router --save
2、引入路由
import VueRouter from 'vue-router'
3、全局注册i
Vue.use(VueRouter);
4、定义路由信息，跳转组件的信息
 对象数组 使用  routes【{}，{}】
  {path:'/fo',component:fo},
​	地址 path  和   组件 component
5、创建路由管理器 使用 router
​	const router=new VueRouter({
​		//路由信息对象
​		routes
​	})
6、对外输出 router
```

### 使用步骤总结

```javascript
//路由文件

//引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入组件 
import Foo from '../components/Foo.vue'
import Bar from '../components/Bar.vue'
import User from '../components/User.vue'


//全局注册
Vue.use(VueRouter);


//定义路由信息对象
//path属性：表示路由匹配路径
//components属性 表示路由匹配的组件
const routes=[
    {path:'/foo',component:Foo},  //route 路由信息对象
    {path:'/Bar',component:Bar},    
    {path:'/user',component:User}
]

//创建路由管理器
//调用了 上面的
const router = new VueRouter({
    routes
})

//对外输出
export default router;
```

### **使用vue-router**

vue-router中的几个概念

-路由信息对象: route ，定义的路由信息

-路由信息对象数组: routes

–路由管理器:router或VueRouter，实现路由匹配的管理器

<router-link>:路由导航链接（默认编译为<a>标签）

<router-view>:路由出口，匹配路由的组件内容将会在此处显示

-官方文档: https:.//router.vuejs.org/zh-cn/

### 调用时 

1、先引入 路由文件

2、在vue实例中关联路由管理器 注册

使用 router ：router

### 使用时

1 路由导航  

 <router-link to="/fo">fo</router-link>

to属性 是，跳转的 path地址

2 路由出口

 <router-view></router-view>

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 动态路由（重点）

动态路由当路由发生切换时，**并不会重新渲染路由组件**，而会使用已经渲染过的路由组件（只是会修改路由参数值），这样增加了程序的高校及时性；**组件的生命周期钩子回调函数将不会再次调用**。可以通过在**组件内watch监听属性**，来监听动态路由参数的变化。

```javascript
 //watch监听动态路由参数变化
  watch: {
    //当$route发送变化时，会触发watch监听
    $route: function (to, from) {
      //to:表示即将到达的动态路由信息对象
      //from:表示上一个(离开)的动态路由信息对象
      console.log(to);
      console.log(from);
    }
  }
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 动态路由参数：

**第一种：**this.$route

一个路径参数，使用冒号：标记

**可以在一个路由中设置多段 路径参数**

**组件中获取路由参数：****使用this.$route.params属性获取指定的路由参数**。

先是 动态路由参数 params属性获取 设置

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**第二种：**props

Vue组件设计原则

高内聚、低耦合

在Vue组件中使用$route会使用对应形参高度耦合，从而使组件只能在一些特定的URL上使用，限制了灵活性。

**使用props属性将组件和路由解耦；**

**在路由定义中，指明props属性**

**在组件中，使用props接收路由参数**

先是解耦使用props 定义true 再去定义 props  然后传入使用

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**第三种**to性传递参数

to属性传递参数，如果有params参数，需要是命名路由

<router-linke>传递参数

通过**？name=test**传递query数据；组件内部通过**$route.query.name获取query数据**，但是会产生高耦合

to属性，可以普通字符串，也可以是对象形式

传递params时候，**需要使用命名路由**（带有name名称得路由）

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**第四种方式**props是函数形式

 props是函数形式，可以传递params和query

路由定义中得porios属性，支持多种形式：

boolean指向：如果props设置为true，route.params将会设置为组件属性

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### keep-alive

```
<!--  保持回调状态 仅此一次 不是每一次都被回调, 不让组件频繁让销毁和创建 -->
```

kepp-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

它的两个重要属性：

**include** --字符串或正则表达式，只有匹配的组件会被缓存

**exclude**  --字符串或正则表达式，任何匹配的组件都不会被缓存

## 路由组件中使用Ajax

路由组件中使用Ajax，**有两种方式:**

**路由导航完成之后**使用ajax获取数据

在路由组件**cerated（）回调函数中**，获取ajax数据，动态路由组件切换时哦，该方法只调用一I次，

使用**watch监听**$route改变，再次获取ajax数据

**路由导航完成之后**使用ajax获取数据：

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 导航守卫回调函数：

**beforeRouteEnter  ** **在进入指定路由组件之间调用**

此时，还没进入组件，**不能使用this访问组件实列对象**

可以使用**next（function（vm）{....}）**回调函数访问组件实列对象

导航守卫回调函数：

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**beforeRouteUpdate**，**在动态路由组件切换之前调用**

此时，已经进入组件内部，**可以使用this访问当前组件对象**

注意获取新数据时，**要使用to中params**，而非from中的params

此处的next（）回调，之间执行即可，不能传入回调参数

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**1、beforeRouteEnter(to,from,next)**

```
    //to表示即将进入的路由组件
    //from表示即将离开的路由组件
    //next表示继续指向下一步
    //beforeRouteEnter是进入组件之前的回调函数 不能只用this 放在next里面 就可以解决
```

beforeRouteEnter **函数内部 this 是undefined**，**这是因为在执行路由钩子函数beforRouteEnter时候，组件还没有被创建出来**；先执行beforRouteEnter，再执行组件周期钩子函数beforeCreate。我们可以通过 next 获取组件的实例对象，如：next( (vm)=>{} )，参数vm就是组件的实例化对象。
**2、beforeRouteUpdate(to,from,next)**
About组件是有二级导航的，在切换二级导航的时候，对应的内容是在变化的；但是about组件是复用的，只会生成一次，切换二级导航的时，如何知道导航在更新呢？一个组件有二级导航的时候，点击二级导航的时候导航路径更新了，会触发路由钩子函数beforeRouteUpdate。
**3、beforeRouteLeave(to,from,next)**
当在about切换到user时，about页面有些数据还没有加载完成，这时候我们不让它切换到user。

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### **返回上一页、显示历史记录：**

vue-router除了可以使用<router-link>触发路由跳转之外，还可以使用JS代码实现编程路由跳转。

**在组件内部通过this.$router表示获取到路由管理对象**，调用其特定方法即可实现路由跳转；

**router.push()方法**，参数可以时路径字符串，也可以是json对象

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

重定向路由和别名路由

**重定向：**当用户访问/a时，URL将会被替换成/b，然后匹配路由为/b

**别名：**/a的别名是/b，意味着，当用户访问/b时，URL会保存为/b，但是路由匹配则为/a 就像访问/a一样

### 嵌套路由

**嵌套路由使用方法**

–在路由定义中定义嵌套路由:**使用children属性定义**，嵌套路由路径**以当前父路由为基准路由**

一在路由组件HTML结构中，使用<router-view>显示嵌套路由的内容。

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**命名视图路由**

有时候想同时(同级）展示多个视图，而不是嵌套展示。

例如创建一个布局，有sidebar(侧导航)和main(主内容)两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果router-view没有设置名字，**那么默认为default。**

**路由URL路径模式**

·vue-router中的URL，默认采用Hash模式表示（使用l#/形式)，可以通过修改路由管理器(router)的mode属性，修改URL的展示模式可以**设置mode为history模式**，即是传统的URL表示形式

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 非父子组件间数据通信

-建立全局的**事件bus**

-A组件中，使用事件bus触发emit自定义事件

-触发事件的行为，要注意在**beforeDestroy()回调函数**中使用

-若直接调用，B组件在第一次时，可能会捕获不到事件

一B组件中，使用事件bus监听自定义事件

-在组件的**created()回调函数**中监听自定义事件

-在组件的**destroyed()回调函数**中需要解绑自定义事件的监听;否则会出现监听多次事件的问题

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### vuex基本使用

Vuex基本使用:https://vuex.vuejs.orglzh-cn/

**-创建Vuex.store 对象**

-存储组件间共享数据的对象

- vuex管理状态就是通过该对象实现

一可以把store对象全局注册到Vue实例中

-若全局注册，在Vue实例内部可以通过

**this.$store来获取该对象**

**组件中读取store中的数据**

**在插值表达式中用this.$store.state.count来获取**data中的数据

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-**在组件的computed属性中使用**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import mutations from './mutations';
//2.全局注册

Vue.use(Vuex);

//3.创建数据仓库store


const store =new Vuex.Store({
    //开启严格模式
    strict:true,

    //多模块
    modules:{
        moduleA: {
            state:{
                name:'moduleA-name'
            }
        },
        moduleB:{
            state:{
                name:'moduleB-name'
            }
        }
    },

    //state 定义共享数据的
    state:{
        count:'10',
        age:18,
        users:[
            {name:'t1',age:18,id:1},
            {name:'t2',age:19,id:2},
            {name:'t3',age:17,id:3},
            {name:'t4',age:16,id:4}
        ]
    },
    //ggetters定义store对象的计算属性(多个数据的计算 或者过滤)
    getters:{
        //参数state表示当前store对象的state数据
        adults:function(state){
            return state.users.filter(function(item){
                return item.age>18
            })
        }
    },
    //在页面组件进行调用
    //mutations定义同步修改state数据的方法，方法名一般以mutation开头
    mutations:mutations,
    //actions定义异步修改state数据的方法,方法名一般以action开头
    actions:{
        actionUsers:function(context){
            //参数context表示当前的store对象 不是state数据

            //在action修改state数据，有二种方式 
            //第一个方式是直接修改 context.state.users=xxx 不建议直接修改
            //第二个方式 mutatios函数修改:context.commit('muationxxx')

            axios.get('http://180.76.165.143:8080/MyUser/UserControl').then(function(response){
           
            //采用直接修改
            // context.state.users=response.data
            
            //这是在函数中修改
            context.commit('mutationUsers',response.data);
            })
        }
    }
});
//4.对外输出

export default store;

```

```javascript
组件里面调用数据
<template>
    <div>
        news组件
        <h5>age={{age}}</h5>
        <p>count={{count}}</p>
        <p>
            <ul>
                <li v-for="user in users" :key='user.id'>
                    {{user.name}}-----  {{user.age}}
                </li>
            </ul>
        </p>
        <p>
            <ul>
                <li v-for="user in adults" :key='user.id'>
                    {{user.name}}-----  {{user.age}}
                </li>
            </ul>
        </p>
        <div>
            <h6>修改state中的数据</h6>
            <button @click='emitEvent'>更新</button>

        </div>
        <h6>
            age={{age}}
        </h6>
         <hr>
        <p>
            <input type="text" v-model="count">
        </p>
    </div>
</template>
<script>
//此页面都是借助 map***辅助函数{mapxxx，mapxxx}
import { mapGetters, mapMutations, mapState,mapActions } from 'vuex';
// import store from '../store/index.js';
export default {
    name:'news',
    //store数据，建议在computed属性中获取
    //computed:mapState({
        //    count:function(state){
        //        return state.count
        //    }

    //箭头函数 一种
        //    count:state=>state.count,
        //  users:state=>state.users,

    //字符串 二种 把state中的count对应的值，复制给计算属性count2  
    //  count2:'count',
    
    //    }),
    // 三种 state中的数据直接作为computed的属性，数组形式
    //  computed:mapState(['count','age','users']),
    
    //第四种 必须牢记！
     //既有本地数据又有store中的数据 ...mapState 对象展开运算符 (推荐使用)
    //计算属性 computed
   computed:{
           ...mapState(['count','age','users']),
           //使用mapGetters辅助函数引入store对象中的gettres数据
           ...mapGetters(['adults']),
           //设置count属性的getter和setter方法
           count:{
                get:function(){
                    return this.$store.state.count
                },
                //计算属性值发送变化 自动调用该犯法
                set:function(value){
                    this.$store.commit('mutationCount',value)
                }
           }
     },
    
     methods:{
         emitEvent(){
           this.mutationAge('79')
         },
      
      //使用mapMutations引入函数
         ...mapMutations(['mutationAge']),
       
       //使用mappActions引入函数
         ...mapActions(['actions'])
     }
}
</script>
```

**全局注册VuexStore**

·使用Vuex时，建议全局注册VuexStore，方便在单个组件内部直接通过**this.$store形式**获取状态信息。

-在main.js文件中，初始化Vue实例对象时，全局注册VuexStore

-在各个组件中，**直接使用this.$store 获取到VuexStore对象**

-**Vuex.Store按照单例模式实现**，保证各个组件访问到的$store为同一个实例对象，从而保证数据的统一

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### **state共享数据

·在Vuex.Store对象中，使用**state属性**表示状态信息（即共享的数据)

state数据应该被应用在组件的**computed属性**中，以实现响应式更新

-在组件中获取state信息时，可以使用**this.$store.state.*****形式获取状态数据

-使用之前，要首先引入mapState辅助函数

可以使用**mapState 辅助函数**，以简写形式在组件内获取state数据

-支持使用数组形式、字符串形式、对象展开运算符等方式引入到组件的computed属性中

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### **getters状态信息**

·在Vuex.Store对象中，使用**getters属性**表示状态信息

- getters相当于Store对象计算属性，其返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

-适合于获取满足指定条件的数据

-组件中使用**this.$store.getters.***形式获取getters中的数据**

-同样可以使用**mapGetters辅助函数**简化组件中使用getters数据的形式

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###  **mutations同步操作方法**

·在Vuex.Store对象中，使用**mutations**对外提供修改state数据的方法

-在组件中，**使用this.$store.commit()触发mutations修改动作**

-**可以为mutations方法传递附加参数**，一般通过对象形式提交参数

**-需要在组件的methods里使用该辅助函数**

-注意: mutations中的方法是**同步方法**，不允许执行异步方法（如Ajax获取数据)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### v异步操作方法**

在Vuex.Store对象中，**使用actions对外提供异步修改state数据的方法**

**在Store对象中定义actions方法**

**actions中的方法，接收一个context回调参数，表示当前Store对象实例（单模块情况下）**

·在Vuex.Store对象中，**使用actions对外提供异步修改state数据的方法**

-在组件内部使用**this.$store.dispatch( action方法名)来触发actions中的方法**

-也可以使用**mapActions辅助函数，简化在组件中触发action的方式**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### **SRC文件名：**

**components 放组件的**

**router 放路由的**

**main.js入口文件**

**store 状态管理**

**App.vue 组组件**

**assets 静态资源**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### @click事件修饰符

**@click.stop 阻止事件冒泡**

**@click.prevent 阻止事件的默认行为**

**@click.native是给组件绑定原生事件**

## URL解析

**协议：//主机：端口/路径？查询**

**seheme://host:port/path?query#fragment**

## git上面

把文件放到Git 上面

命令行-

git clone git地址 

会创建一个新得文件夹

把文件拷贝到新得文件

git status 查看状态

git add . 

git commit -m '初始化项目'

git push 提交 需要验证账户密码 密码输入第二次看不见得



npm install better-scroll --save 安装 better-scroll 框架





git remote add origin 'https://github.com/Ted0916/SupermallXD.git'

git push -u origin master