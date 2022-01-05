# 一、Vue3.0学习笔记

## 1、使用vue-cli 创建

### 使用webpack  vue-cli 进行创建项目

1. vue -V   必须高于 4.5.0以上
2.  npm install  -g @vue/cli     安装或者升级 cli
3. vue create   项目名称 
4. npm run  server   启动

### 使用最新的 vite 进行创建项目

vite的优势：

- 开发环境种，无需打包，可以快速冷启动
- 轻量级快速热重载
- 按需编译，不用等待整个应用编译完成

使用vite创建步骤：

1. npm i -g create-vite-app   全局安装
2. npm init   vite-app  项目名称
3. npm install  依赖
4. npm run dev  启动

## 二、常用Composition API

Composition-->组合式API

官方文档地址：https://v3.cn.vuejs.org/

### 1、setup函数

<font color='red'>setup “表演者舞台”</font>

理解：Vue3.0中的一个新配置，值为一个函数。

- 组件中的所有用到的：数据、方法等等，都要在setup里面配置。

- setup函数的两种返回值：

  1. ```
     若是返回对象，则对象中的属性、方法，在模板中可以直接使用。（重点）
     ```

  2. ```
     若是返回一个渲染函数：则可以自定义渲染内容。
     ```

- 注意点：

  1、尽量不要与vue2.0配置混用

  ​       Vue2.x配置（data、methos、computehd..）中可以访问到setup属性、方法，！！！但是在setup中不能访问到Vue2.x里面的配置data、methos、computehd..）

   2、如果有重名，setup优先

  3、setup不能是一个async函数，因为返回值不再是return的对象，而是 promise，模板看不到return对象中的属性值。（后期也可以返回一个Promise实列，但是想要Suspense和异步组件得配合）

### 2 、Ref函数（基本数据使用）

- ​	作用：ref 作为3.0的响应式核心

- ​	语法： const xxx = ref{initValue} 	

  - 创建一个包含响应式数据的**引用对象**（reference对象）（简称：ref对象）
  - JS中操做数据：xxx.value
  - 模板中读取数据：不需要.value 直接{{name}}

- ​	备注：

  - 接收的数据可以是：基本类型、也可以是对象类型

  - 基本类型的数据：响应式依然是Object.defieProperty()的get和set完成的

  - 对象类型的数据：内部“求助”了Vue3.0中的一个新函数——reactive函数（根源是Proxy）

  - 他把ES6的Proxy封装到了 reactive函数里面继续使用。

    

### 3、reactive函数（对象类型使用）（常用）

- 作用：定义一个**对象类型的响应式数据类型**（基本数据类型不要用它，要用ref函数）
- <font color='red'>语法：const 代理对象，reactive(源对象)，接收一个对象（或者数组），返回一个代理对象 （Proxy的实列对象）</font>
- reactive定义的响应式数据是 ：“深层次的”
- 内部基于ES6的Proxy实现的，通过代理对象操作源对象内部数据进行操作。

### 4、Vue3.0中的响应式原理

##### vue2.0的响应式：

- 实现原理：

  - 对象类型：用过Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）

  - 数组类型：通过重写更新数组的一系列方法来实现拦截，（对数组的变更方法进行了包裹）

  - ```
    Object.defineProperty(data, 'count',{
    	get() {},
    	set() {}
    })
    ```

- 存在的问题：

  - 新增属性、删除属性、界面不会更新。
  - 直接通过下标修改数组，界面不会自动更新。

##### vue3.0的响应式：

- 实现原理：
  - 通过Prxoy（代理）：拦截对象中任意属性得变化，包括：属性值得读写、属性得添加、属性得删除等
  - 通过Refiect（反射）：对被代理对象得属性进行操作。
  - MDN看详解    （Proxy  Reflect）

### 5、reactive和red的对比

从定义的数据角度对比：

- <font color='red'>ref用来定义：基本类型数据</font>
- <font color='red'>reactive用来定义：对象(或数组)类型数据</font>font>
- 备注：ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转为代理对象

从原理的角度对比：

- ref通过Object.definProperty()的get和set来实现响应式（数据劫持）
- reactive则是通过使用Proxy来实现数据劫持的，并通过Reflect操作源对象内部的数据。

从使用角度对比：

- ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value
- reactive定义的数据：操作数据与读取数据：均不需要.value

### 6、setup的两个注意点

- setup执行的时机：
  - <font color='red'>在beforeCreate之前执行一次，this是undefined</font>
- setup的参数：
  - props：值为对象，包含：组件外部传递过来，但是没有在props配置中声明的属性，相当于this.$attrs
  - context:上下文对象
    - <font color='cornflowerblue'>attrs</font>：值为对象，包含：组件外部传递过来，但是没有在props配置中声明的属性，相当于this.$attrs
    - <font color='cornflowerblue'>slots</font>:收到的插槽内容，相当与this.$slots.
    - <font color='cornflowerblue'>emit</font>：分发自定义事件的函数，相当于this.$emit

### 7、计算属性与监视

#### 1、computed函数

- 与Vue2.x中的computed配置功能一致
- 写法

1. ```
   import {reactive, computed} from 'vue'
   
    setup() {
       let person = reactive({
         firstName: '徐',
         lastName: '名字',
       })
   
       //计算属性  3.0写法一  (没有考虑计算属性被修改的情况) 只读情况
       /*  person.funllNmae = computed(() => {
         return person.firstName + person.lastName
       })*/
   
       //完整写法   3.0写法二   考虑了读和写
       person.funllNmae = computed({
         get(){
           return person.firstName +'-'+ person.lastName
         },
         set(value){
          const  nameArr = value.split('-')
           person.firstName = nameArr[0]
           person.lastName = nameArr[1]
         }
       })
   
       return {
         person
       }
     }
   ```

#### 2、watch函数

- 与Vue2.x中watch配置功能一样

- 两个小 ” 坑 “：

  - 监视reactive定义的响应式数据时：oldValue（<font color='red'>更新之前</font>）无法正确获取、前置开启了深度监听（deep配置失效）
  - <font color='red'>监视reactive定义的响应式数据中的某一个属时：deep配置有效</font>

  ```vue
      // watch  3.0  可以传递三个参数  (第一个是数据源  第二个是监听的结果  第三个是配置(深度监听、立即监听))
  
      //情况一：监视ref所定义的一个响应式数据
      /* watch(sum, (newValue, oldValue) => {
         console.log('sum值变化了', newValue, oldValue)
       }, {immediate: true})*/
  
      //deep: true 目前不知道 还有没有问题
  
      //情况二：监视ref所定义的多个个响应式数据
      /*  watch([sum, msg], (newValue, oldValue) => {
          console.log('sum或msg变化了', newValue, oldValue)
        })*/
  
      //情况三：监视reactive所定义的一个响应式数据.  (最长用得)
      /*问题一 ：此处无法正确获取oldValue（修改之前的值无法正确获取）
      解决方式： 就是把 reactive里面的对象 单独拿出去 给ref，然后你再操作，可以避免这个情况。
               ref 监测到你是对象时,还是会调用reactive,所有单独在源数据哪里无法去避免这个小问题
      问题二 ：强制开启了深度监听(并且无法关掉)*/
      /*  watch(person, (newValue, oldValue) => {
          console.log('person值变化了', newValue, oldValue)
        })*/
  
      //情况四:监视reactive所定义的一个响应式数据中的某一个属性
      /* watch(()=>person.age, (newValue, oldValue) => {
         console.log('person值变化了', newValue, oldValue)
       })*/
  
      //情况五:监视reactive所定义的一个响应式数据中的多个属性
      /*watch([()=>person.age,()=>person.name], (newValue, oldValue) => {
        console.log('person值变化了', newValue, oldValue)
      })*/
  
  
      //特殊情况  深度监视对象里面套对象的值 需要开启deep
      /*  watch([()=>person.obj,()=>person.name], (newValue, oldValue) => {
          console.log('person值变化了', newValue, oldValue)
        },{deep:true})  //此处监听的是reactive定义对象中的某一个属性 所以得配置 deep*/
  
  
      //监听ref 的对象
      //如果想监听ref下的对象值， 因为red会监测是不是基本数据类型，如果是对象的话，则去调用 reactive 会在value里面生产proxy函数
      //所以当你想监听的时候，需要写 personRef.value
      //或者开启深度监听 deep：true
      // RefImpl --->    value ---> obj  + name  等属性
      //一个注意点 如果在 ref的基本类型值，写了.value  watch(msg.value, () => {}  他则会监听的是 值的本身，所以这样并并可行
  
      watch(personRef.value, (qian, hou) => {
        console.log('person值变化了', qian, hou)
      })
  ```



#### 3、watchEffect函数

- watch的套路：既要指明监视属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视的那个属性，监视的<font color='red'>回调函数中用到哪个属性</font>，那就监视那个属性

- watchEffect有点想computed： <font color='red'> (重点,面试可以聊)</font>

  - 但computed的计算出来的值（回调函数的返回值），所以必须要写返回值
  - 而watchEffect更注重的过程（回调函数的函数体），所以不用写返回值

  ```
  
  ```

### 8、生命周期

​	vue3.0中可以继续使用vue2.x中的生命周期函数,<font color='red'>但有两个被更名 (销毁的生命周期变成 取消挂载)</font>

​		beforeDestroy ====>  beforeUnmount  ( 卸载 )

​		destroyed   =======> unmounted

​	vue3.0也提供了 组合式api ( <font color='red'>使用是需要引入</font> ) ,与vue2.x对应关系如下

​		 beforeCreate ====> setup ( 创建 )

​		 Created		 ====> setup

​		 beforeMount  ===> onbeforeMount  ( 绑定 )

​		 mounted =======>onmounted

​		 beforeUpdate  ===>onbeforeUpdate  ( 修改 )

​		 updated ========>onupdated

​		beforeUnmount ====>  onbeforeUnmount  ( 卸载 )

​		unmounted   =======> onunmounted

### 9、自定义hook函数（重点）

- 什么是hook？ 本质是一个函数，把setup函数中使用的Composition API进行了<font color='orange'>封装</font>。
- 类似于vue2.0中的<font color='orange'>mixin</font>。
- 自定义hook的优势：<font color='red'>复用代码</font>，让setup中的逻辑更清楚易懂

### 10、toRef （重点）

- 作用：创建一个ref对象，其中value值指向另一个对象中的某一个属性
- 语法：const name = toRef(person, 'name')
- 应用：要将响应式对象中的某一个属性单独提供给外部使用时
- 扩展：toRefs与toRef功能一致，但是可以批量创建多个ref对象，语法：toRefs（person）

## 三、其他Composition API       不常用

### 1.shallowReactive 与 shallowRef    shallow（晒豆 ）

- shallowReactive：<font color='red'>只处理对象最外层的属性的响应式（浅响应式）</font>
- shallowRef：<font color='red'>只处理基本数据类型的响应式，不进行对象的响应式处理</font>
- 什么时候使用？
  - <font color='red'>如果有一个对象数据，结构比较深，但变化时只是最外层属性变化 ===> shallowReactive</font>
  - <font color='red'>如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef</font>

### 2.readonly与shallowReadonly      readonly（ 软的欧蕾）

readonly: <font color='red'>让一个响应式数据边为只读的（深只读）</font>

shallowReadonly：<font color='red'>让一个响应式数据变为只读的（浅只读）</font>

应用场景：不希望数据被修改时

### 3、toRaw和markRaw

- toRaw：
  - 作用：将一个**<font color='red'>reactive</font>**生产的**响应式对象**转为**普通对象**
  - 使用场景：用于读取响应式对象的普通对象，对这个普通对象的所有操作，不会引起页面的更新
- markRaw：**（应用场景 挺多的）**
  - 作用：**<font color='red'>标记一个对象，使其永远不会在成为响应式对象</font>**
  - 应用场景：
    -  1、有些值不应设置为响应式的，例如复杂的第三方类库等
    - 2、当渲染具有不可变数据源的大列表时，跳过转换可以提高性能、

### 4、customRef

作用：创建一个自定义的ref，并对齐依赖项进行更新触发进行显示控制

实现防抖效果：

```vue
    //自定义一个myref
    function myRef(value,delay) {
      return customRef((track,trigger) => {
        //解决定时器的bug，必须要清除定时器
        let  timer
        return {
          //读数据找 get
          get() {
              console.log(`有人从myRef这个容器中读取了数据！,我把${value}给他了`)
              track() //  (踹可)追踪数据 通知Vue 追踪数据（value的变化）
					  // 提前和get商量一下，让他认为这个Value是有用的！
              return value
          },
          set(newValue) {
            console.log(`有人从myRef这个容器中数据改为${newValue}给他了`)
            clearTimeout(timer)  // 只要前面有定时器就清除上一个定时器
            timer = setTimeout(()=>{
              //这里很重要 因为这里 是让页面显示的
              value = newValue
              trigger() //  (锤可)解析模板  通知Vue 重新解析 模板
            },delay)
          }
        }
      })
    }
    // let keyWord = ref('hello')   //使用vue提供的ref
    let keyWord = myRef('hello',500)   //使用程序员自定义的ref
```





### 5.provide和inject （祖孙之前通讯）

- 作用：实现 <font color='red'>祖孙组件间通讯 </font>
- 套路：祖组件有一个 **provide** 选项来提供数据，后代组件有一个  **inject**  选项来使用这些数据
- 写法：
- 祖先的写法：

```
import {reactive,toRefs,provide } from  'vue'
setup(){
    let  cra  = reactive({name:'宝马',piece:'40w'})
    provide('cra',cra)  // 给自己的后代进行传递数据
    return {
     ...toRefs(cra)
    }
```

- 孙子的写法：

```
import  {inject} from 'vue'
 setup(){
   let car =  inject('cra')
    console.log(car)
    return{
     car
    }
  }
```

### 6.响应式数据的判断

- isRef：检查一个值是否为一个 ref 对象
- isReactive：检查一个对象是否是由 Reactive 创建的响应式代理
- isReadonly：检查一个对象是否是由 readonly 创建的只读代理
- isProxy：检查一个对象是否是由 Reactive或者 Readonly 方法创建的代理



## 四.Composition API 的优势

### 1.Options API存在的问题（vue2 配置式api）

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods,computed中分别修改，太过于分散

### 2.Composition API的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能更加有序的组织在一起，**重点**（使用 <font color='red'>hook函数</font>）

## 五.新的组件

### 1.Fragment (就不需要最外层写一层div)

- ​	在Vue2中：组件必须有一个根标签
- ​    在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个 **Fragment** 中
- ​    好处：减少标签层级，减小内存占用

### 2.Teleport (非常有用) 

什么式Teleport？ ---是一种能够将我们的组件html结构 <font color='red'>移动到指定位置</font> 的技术

```vue
<teleport to="body"  v-if="isShow">  //to属性可以实现 指定进行跳转div窗口
      <div class="mack">
        <div class="dia">
          <h1>我是弹窗</h1>
          <h4>我是内容</h4>
          <h4>我是内容</h4>
          <h4>我是内容</h4>
          <h4>我是内容</h4>
          <button @click="isShow=false">关闭弹窗</button>
        </div>
      </div>
    </teleport>
```

### 3.Suspense 等待异步组件

- ​	等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤

  1. 异步引入组件

     ```
     import {defineAsyncComponent} from 'vue'
     const HelloWorld=defineAsyncComponent(()=>import('./components/HelloWorld'))//动态引入组件
     ```

  2.使用Suspense包裹组件，并配置好  **default和fallback**

  ```
  <template>
    <div id="app">
      <h3>我是祖先</h3>
      <suspense>
        <template v-slot:default> <!--加载完成时展示的内容-->
          <hello-world></hello-world>
        </template>
        <template v-slot:fallback> <!--没加载完成时展示的内容-->
          <h3>我在加载中...</h3>
        </template>
      </suspense>
    </div>
  </template>
  ```

## 六.其他

### 1.全局API的转移

​	Vue 2.x中有许多全局API和配置

- 例如注册全局组件，注册全局指令等

- ```
  Vue.component('',{
    data:()=>({
      name:'zhao'
    }),
    template:'<a>{{name}}</a>'
  })
  ```

Vue3.0中对api做了调整

​	将全局的API，即Vue.xxx调整到应用实例（app）上

​	

| 2.x全局API（Vue）                    | 3.x实例API（APP）           |
| ------------------------------------ | --------------------------- |
| Vue.config.xxx                       | app.config.xxx              |
| Vue.config.producyionTip (vue提示语) | 移除                        |
| Vue.component                        | app.component               |
| Vue.directive                        | app.directive               |
| Vue.mixin                            | app.mixin                   |
| Vue.use                              | app.use                     |
| Vue.prototype                        | app.config.globalProperties |
|                                      |                             |

### 2.其他改变

- ​	**vue过渡 transition 中的类名改变 Vue3.0写法**

  ​	**.v-enter-from,**

  ​	**.v-leave-to**{

  ​		opacity:0;

  ​	}

  ​	**.v-enter-from,**

  ​	**.v-leave-to**{

  ​		opacity:1;

  ​	}

  **移除keyCode作为v-on的修饰符，**

  **移除v-on.native修饰符**

  ​	父组件中绑定事件

  ```
  <sun
    v-on:close="hand"
    v-on:click="hands"
  ></sun>
  ```

  ​	子组件中声明自定义事件

  ```
  export default {
    emits:['close'],
    }
  ```

​	**移除过滤器**（filter）