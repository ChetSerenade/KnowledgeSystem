(function(){

    // 属性的封装主要是 为了 让属性变的更加安全 不轻易被修改

    //定义一个人的类
    class Person{
        // TS可以在属性前添加属性值

        /* 
        *  public  修饰符属性可以在任意位置访问（修改） 默认值
        *  private 私有属性,私有属性只能在类内部进行访问（修改）
        *       -  通过在类中添加方法使用得私有属性可以被外部访问
        *  protected 受包含得属性,只能在当前类和当前类得子类中使用
        * 
        */

        private _name:string;
        private _age:number;

        constructor(_name:string,_age:number) {
            this._name= _name;
            this._age=_age
        }

        /* 
        *  getter 用来读取属性
        *  setter 用来修改属性
        *         他们被称为属性得存取器
        */

        // 定义方法: 用来获取name属性 
        /*   getName() {
            return this._name
        }
        setName() {
            return this._age
        } */


        // 重点！！！ TS中得get set使用
        get name() {
            return this._name
        }

        set name(value:string) {
           this._name = value
        }

        get age() {
            return this._age
        }
        
        set age(value:number) {
            if(value>=0){
                this._age = value
            }else{
                console.log('不能为负数！');
            }
        }

    } 
    const per = new Person('凌晨',22);
    per.age = -1  //不能为负数！
    console.log(per);


    // protected的使用

    class A{
        // 只能在类里面去访问 不能子外面访问
        protected num:number;
        constructor(num:number){
            this.num = num
        }
    }

    class B extends A{
        tes(){
            console.log(this.num);
        }
    }

    const b = new B(123)
    // b.num = 22
    console.log(b);
    


    // 语法糖 简便写法
    class C{
        // 可以直接将属性定义在构造函数中
        constructor(public name:string,public age:number) {

        }
    }

    const c = new C('xxx',333)
    console.log(c);
    

})()