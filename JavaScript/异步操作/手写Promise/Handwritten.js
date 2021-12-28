// 前沿知识点
// class里面创建方法是不需要写function关键字的 也不需要this来this去
// constructor是class里面的一个方法
//每次new的时候就会触发这个  constructor
// extend 是进行继承  如果是在子类调用了 constructor 必须要调用super
// static 关键字 创建方法
// 好吧目前 setter 和 getter 不懂...
// 在一个静态方法里面去调用另一个静态方法是可以用this的吗？  可以  this是绑定类的本身 不绑定的实列
// 静态方法是需要类调用的，而不是实列去调用的
// 静态方法只能函数自己来调用，它的实例对象不能调用，而实例方法只能通过它的实例对象来调用，它本身不能调用。

// 手写的Promise
class Commitment {
    // 3、static静态属性
    static PENDING = '待定';
    static FULFILLED = '成功';
    static REJECTED = '拒绝';

    //1、 func作为形参
    constructor(func) {
        // 4、为每一个static添加了一个状态属性默认状态为待定状态
        // 4、这样每一个实例被创建之后就会有自身得状态属性可以进行判断和变动
        this.status = Commitment.PENDING;
        // 6、定义一个参数（不管是成功还是拒绝两者选其一）
        // 6、这里给null是因为 执行resolve或者是reject得时候会给结果赋值
        this.result = null;
        this.resolveCallbacks = []; //15、保存resolve函数数组 因为数组是先入先出得顺序所以选择是数组
        this.rejectCallbacks = []; //15、保存reject函数数组
        // 11、在执行之前进行判断
        try {
            // 8、解决class里面的this指向问题 方便后面函数调用   因为改变this执行得时候不会调用constructor里面得this.status
            // 2、传入resolve和 resolve两个参数
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            // 12、看看生产实列得时候有没有报错 如果没有就正常执行那二个方法
            // 12、如果有报错就把错误信息传入给reject 并且直接执行 reject
            this.reject(error)
        }
    }

    // 17、因为 resolve 和 reject 是要在事件末尾执行这里加上一次定时器 让变成在末尾执行
    // 7、添加参数 result 并且把参数赋值给实列得result属性
    resolve(result) {
        setTimeout(() => {
            // 5、首先执行得时候判断状态是否为待定  如果是待定就改为成功
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.FULFILLED;
                // 7、添加参数 result 并且把参数赋值给实列得result属性
                this.result = this.result;
                // 16、看看数组里面有没有then那边保留过来的待执行函数然后逐个执行里面的函数 执行的时候会传入相应的参数
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    }

    reject(result) {
        setTimeout(() => {
            //5、 首先执行得时候判断状态是否为待定  如果是待定就改为拒绝
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.REJECTED;
                this.result = this.result;
                // 16、看看数组里面有没有then那边保留过来的待执行函数然后逐个执行里面的函数 执行的时候会传入相应的参数
                this.rejectCallbacks.forEach(callback => {
                        callback(result)
                    }
                )
            }
        })
    }

    // 9、then是创建实列后在进行调用得
    // 9、onFULFILLED 成功时
    // 9、onREJECTED 拒绝时
    then(onFULFILLED, onREJECTED) {
        // 18、返回一个新的then方法 实现链式
        return new Commitment((resolve, reject) => {
            //13、原生得Promise里面规定then里面得两个参数如果不是函数得话就要被忽略
            //13、解决执行异常 如果传进来得是undefined把不是函数得参数改为参数
            onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {
            };
            onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {
            };
            // 15、如果发现是待定的状态 就把函数参数放到数组里面保存起来
            if (this.status === Commitment.PENDING) {
                this.resolveCallbacks.push(onFULFILLED);
                this.rejectCallbacks.push(onREJECTED)
            }
            // 14、设置异步setTimeout
            // 10、如果传进来得状态为成功得话，我们就执行onFULFILLED
            // 10、并且为onFULFILLED函数传入前面保留得result属性值
            if (this.status === Commitment.FULFILLED) {
                setTimeout(() => {
                    onFULFILLED(this.result);
                })
            }
            // 10、如果传进来得状态为拒绝得话，我们就执行onREJECTED
            // 10、并且为onREJECTED函数传入前面保留得result属性值
            if (this.status === Commitment.REJECTED) {
                setTimeout(() => {
                    onREJECTED(this.result);
                })
            }
        })
    }
}

// 调用
console.log("第一步"); //1
let commitment = new Commitment((resolve, reject) => {
    console.log("第二步"); //2
    setTimeout(() => { //走到这里进行异步操作 
        resolve('这次一定') //3 之后回头执行 这里  发现里面有个 定时器  ||  执行了第四步之后， 也就是改变了状态 改变了结果值  并且遍历了刚刚保存的数组对象 最后执行刚刚保存的函数对象
        reject('下次一定')
        console.log('第四步'); //遇到了定时器 就跑到这里执行了 
    })
})
commitment.then( //运行实列的then方法  发现是待定的状态就把函数放到了数组里面保存起来了
    result => {
        console.log(result)
    },
    result => {
        console.log(result.message);
    }
// 链式功能
).then(
    result => {
        console.log(result);
    },
    result => {
        console.log(result.message);
    }
)
console.log('第三步'); //3