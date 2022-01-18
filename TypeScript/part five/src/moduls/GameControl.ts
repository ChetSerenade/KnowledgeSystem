//引入其他得类
import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

// 游戏控制
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    score: ScorePanel;

    //创建一个属性来存储蛇移动得方法 （按键方向）
    direction: string = '';
    // 记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = new ScorePanel()

        this.init();
    }

    //初始化游戏  调用就可以开始游戏
    init() {
        //  绑定键盘按下得事件 修改this指向 bind
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        //   调用run 方法
        this.run()
    }

    /*
    *   ArrowUP
    *   ArrowDown
    *   ArrLeft
    *   ArrowRight
    * */

    // 创建一个键盘按下得响应函数
    keydownHandler(event: KeyboardEvent) {
        //  修改direction属性
        //检查用户是否 合法进行按键
        this.direction = event.key
    }

    //  创建控制蛇移动得方法
    run() {
        /*
        *
        * 根据方法（this.direction） 来使蛇得位置改变
        *   上 top 减少
        *   下 top 增加
        *   左 left 减少
        *   右 right 增加
        *
        * */

        //  获取蛇现在得坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        console.log(this.direction)
        // 根据按键方法 修改方法XY值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                //    向上移动得话 去减top
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                //    向下移动得话 去加top
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                //    向左移动得话 去减left
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                //    向左移动得话 去加left
                X += 10;
                break;
        }

        //检查蛇 是否吃到食物
        this.checkEat(X, Y);


        //错误捕获 简化代码
        try {
            //  修改蛇的XY的值
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert("游戏结束!")
            this.isLive = false
        }

        // 开启定时调用
        // 300 - (this.scorePanel.level - 1) * 30 随着等级的提高 速度变快
        // this.isLive 开关
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.score.level - 1) * 30)

    }


    //    定义一个方法, 用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();  //重置食物位置
            this.score.addScore(); //分数增加
            this.snake.addBody();
        }
    }

}

export default GameControl;
