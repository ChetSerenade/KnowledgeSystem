### 数组



使用new Array（）创建数组

空数组：var arr = new Array（)

初始化数组内容，Arry（值1，值2，值3）；  创建n个空数据的空数组：var arr=new Aeeay（n);  注：当小括号仅有一个数字，这个数字表示数组的个数，每个数据为空。

当有多个数字，则表示数据中的具体数据。使用[ ]创建数组

创建空数组：var arr=[ ] 创建数组的同时，初始化数组内容；var =arr[值1，值2 ]；

数组的length

默认情况：length，表示长度也是数组中元素的个数：arr.length arr.length永远等于最大下标+1 arr.length-1始终指最后一个元素的位置 js中，数组的length只是理论上元素的个数，有时无法反选真实元素个数 length的使用

数组的末尾追加一个新元素：arr[arr.length]=新值； 获取最后一个元素值；arr[arr.length-1] 获取倒数第n个元素值：arr[arr.length-n] length修改

修改数组的长度：arr.length=n; 删除末尾最后一个元素：arr.length-; 删除倒数第n个元素：arr.length-=n; 清空数组：arr.length=0； 关联数组 索引数组：下标都是数字的数组 关联数组：可自定义下标名称的数组 关联数组的创建： 创建一个空数组：var arr=[]; 像数组中添加新元素 下标为自定义的就是关路数组 访问2种方式： arr[""]; arr.下标名 可以快速用下标定位到想找的元素 不受到元素个数和储存位置影响 length属性不适用关联数组

数组的遍历 依次访问数组中的每一个元素，使用for循环遍历 用for....in遍历关联数组



**接下来我们看一下数组的API**

方法	描述

- concat()	连接两个或更多的数组，并返回结果。

- join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
- pop()	删除并返回数组的最后一个元素
- push()	向数组的末尾添加一个或更多元素，并返回新的长度。
- reverse()	颠倒数组中元素的顺序。
- shift()	删除并返回数组的第一个元素
- slice()	从某个已有的数组返回选定的元素
- sort()	对数组的元素进行排序
- splice()	删除元素，并向数组添加新元素。
- toSource()	返回该对象的源代码。
- toString()	把数组转换为字符串，并返回结果。
- toLocaleString()	把数组转换为本地数组，并返回结果。
- unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
- valueOf()	返回数组对象的原始值



- 
  Join（[str]） 将数组的所有元连接为一个字符串，返回一个字符串



 <script>
        // xxx.join() 将数组连接成一个字符串 返回字符串
        var num=[1,2,3,4,5];
        console.log(num); 
        console.log(num.join()); //默认得逗号
        console.log(num.join("-")) //加了一个 -
        var newxu= num.join("."); //加点 
        console.log(newxu);
 </script>


- concat(a1,[a2,a2...]) 拼接数组，返回新数组



 <script>
       //xxxx.concat() //拼接数组，将当前数组和其他数组元素拼接到一起 然后返回新数组
       var xu = [1, 2, 3, 45, 6];
       var xu2 = xu.concat(10, 11, 12, 13);
       console.log(xu2);
       var arr = [1, 2, 3, 4];
       var arr2 = [5, 6, 7, 8];
       var xuxu = arr.concat(arr2);
       console.log(xuxu);
       console.log(arr);
   </script>


- 
  slice（[star,end]） 选取数组中开始位置到结束位置，然后组成一个新数组



 <script>
        //slice() 选取当前数组种得指定开始得位置得元素，组成新的元素 截取数组
        var arr = [1, 2, 3, 4, 5, 6, 7,];
        var a1 = arr.slice(2, 5);// 3 4 5  //含头不含尾
        console.log(a1);
        var a2 = arr.slice(2, -2);//支持负数下标
        console.log(a2);
        var a3 = arr.slice(2);//如果省略第二个参数 直接到末尾
        console.log(a3);
        var a4 = arr.slice();//如果不写参数，代表复制整个按钮
        console.log(a4);
  </script>


- splice() 删除元素，也向数组添加新的元素 返回被删除的元素组成的数组



 <script>
        //splice()  删除元素，并向数组添加新能元素 返回被删除得元素组成新数组
        //功能一：删除功能 
        //删除从i得位置开始得第n个元素
        var a1 = [1, 2, 3, 4, 5, 6, 7, 8];
        var d1 = a1.splice(2, 4); //删除从下标2开始得4个元素
        console.log(a1);
        console.log(d1);  //返回被删元素得组成得新数组

        var xu = [1, 2, 3, 4, 5, 6, 7, 8];
        xu.splice(3); //省略第二个元素，代表从当前位置删除到末尾
        console.log(xu);
    
        //功能二：插入
        //从i得位置插入新数据  第二个参数为0
        var xu1 = [1, 2, 3, 4, 5, 6, 7, 8];
        xu1.splice(2, 0, "A"); //插入到3得前面 第二个参数0
        console.log(xu1); //1,2,A,3，4，5，6，7，8
    
        //功能三：替换
        //将从i得位置开始得n个数据，替换为新的数据
        var xu2 = [1, 2, 3, 4, 5, 6, 7, 8];
        xu2.splice(2, 3, "A", "B", "C");  //从下标2开始得三个数据 替换为 ABC
        console.log(xu2); //1，2，A,B,C 6 7 8 
    </script>

- 
  reverse（） 颠倒数组中元素的顺序



      reverse() 颠倒数组
      var xu = [6, 5, 4, 3, 2, 1];
      xu.reverse();
      console.log(xu);// 123456

- 
  sort([fn]) 对数组元素的排序



        sort()数组排序
        var mo = [2, 3, 5, 1, 7, 8];
        mo.sort(); //默认从小到大 排序
        console.log(mo);

- 
  pushu（a1,[a2,a3]） 像数组末尾添加一个或者多个新元素返回新长度


```
//push() 像数组末尾添加一个元素或者多个 返回新长度
        var xu = [1, 2, 3, 4, 5];
        var xu1 = xu.push(10, 11, 12);
        console.log(xu);
        console.log(xu1);   //返回得新长度 8
```

- 
  pop（）删除最后一个元素


```
 //pop() 删除数组最后一个元素， 返回被删除得元素
        var xu3 = xu.pop();
        console.log(xu);
        console.log(xu3); //返回被删除得元素 12 
```

- 
  unshift（a1,[a2,a3]） 像数组开头添加一个或者多个新元素


```
 //unshift() 像数组得开头添加一个 或者多个新元素 返回新长度 
        var xu4 = [1, 2, 3, 4, 5, 6, 7];
        var mo = xu4.unshift(6);  //返回是添加之后得数组
        console.log(mo);
        console.log(xu4);
```

- 
  shift（） 删除数组第一个元素


```
  //shuift() 删除之后得第一个元素 返回被删除得元素
        var mo1=xu4.shift();
        console.log(xu4);
        console.log(mo1);  //返回被删除得元素
```

