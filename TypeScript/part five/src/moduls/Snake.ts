class Snake {
    //获取蛇头
    head: HTMLElement;
    // 蛇身体 (包括头部)
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        //返回的html元素 类型会不匹配 所以加一个 as 断言
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')
    }

    //获取蛇的坐标（蛇头）
    get X() {
        return this.head.offsetLeft;
    }

    //获取蛇的 Y轴坐标
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头坐标
    set X(value) {

        //如果新值和老值相同 则直接返回不在进行修改
        if (this.X === value) {
            return
        }

        //X的值合法范围是 0-290
        if (value < 0 || value > 290) {
            //说明蛇 撞墙了
            throw new Error('游戏结束!')
        }
        //this.bodies[1] 检查有没有
        //this.bodies[1] as HTMLElement).offsetLeft    如果存在 第二节，而且还等于你的 蛇头坐标 你方向的新值value
        console.log('按键之前value', value)
        console.log('按键之前得X', this.X)
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //  如果发生了掉头 让蛇头方向继续移动
            //value向右是大值,增加
            //value > this.X 这是正常得走
            if (value > this.X) {
                //你想 向右走，我给你减10 我继续让你左走。
                //向右--> 140 150 160
                // 减10  130 140 150
                value = this.X - 10
            } else {
                // 向左走
                // 你这里发生了 掉头, 我给你加10
                // 你继续得向右走
                // debugger
                console.log(value)
                console.log(this.X)
                console.log(this.X + 10)
                value = this.X + 10
            }
        }

        //移动身体
        this.moveBody()

        this.head.style.left = value + 'px';

        //检查有没有撞到自己
        this.checkHeadBody()
    }

    set Y(value) {

        //如果新值和老值相同 则直接返回不在进行修改
        if (this.Y === value) {
            return
        }

        //Y的值合法范围是 0-290
        if (value < 0 || value > 290) {
            //说明蛇撞墙了
            throw new Error('游戏结束!')
        }

        // 修改Y时,再修改水平坐标，蛇再上下移动，蛇再向左移动时,不能向下掉头,反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            //  如果发生了掉头 让蛇头方向继续移动
            if (value > this.Y) {
                // 如果value 大于老值 则说明蛇再向右走 此时发生掉头,应该让蛇继续前进
                value = this.Y - 10
            } else {
                // 向左
                value = this.Y + 10
            }
        }


        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px';

        //检查有没有撞到自己
        this.checkHeadBody()
    }

    //   蛇增加身体的
    addBody() {
        //    向element 添加身体（div）
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

    //  身体移动方法
    moveBody() {
        /*
        * 将后的身体设置为前边身体的位置
        *   列子:
        *       4节 = 3节
        *       3节 = 2节
        *       2节 = 蛇头位置
        *
        * */
        //    遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //   获取前面身体位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //    将设置当前身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }

    //检查蛇头是否 撞到自己
    checkHeadBody() {
        //  获取所有的身体，检查是否和蛇头进行发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                //  检查判断说明蛇头 撞到了自己 游戏结束
                throw new Error('撞到了自己!')
            }
        }
    }

}

export default Snake;
