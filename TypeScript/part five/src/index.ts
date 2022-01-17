//引入样式
import './style/style.less'

//定义食物类Food
class Food {
    //  定义个属性 表示食物对应的元素
    element: HTMLElement;

    constructor() {
        //获取页面中的food元素并将其复制给element
        this.element = document.getElementById('food')!
    }

    //    定义一个获取食物的X轴坐标方法
    get X() {
        return this.element.offsetLeft;
    }

    //    定义一个获取食物的Y轴坐标方法
    get Y() {
        return this.element.offsetTop;
    }

    //   修改食物的位置
    change() {
        //生成随机数  最小0 最大 290
        //食物的坐标 必须是整数  蛇移动一次就是一格 一格大小是10
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = top + 'px'
        this.element.style.top = left + 'px'

    }
}
//测试
const food = new Food()
food.change()

