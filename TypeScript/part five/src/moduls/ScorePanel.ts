//记分牌
class ScorePanel {
    //记录分数等级
    score = 0;
    level = 1;
    //分数和等级所再元素,再构造函数进行初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    //设置一个变量 限制等级
    maxLevel: number;
    //设置变量表示多少分时升级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //    加分方法
    addScore() {
        //    分数自增
        this.scoreEle.innerHTML = ++this.score + ''
        //    判断分数是多少
        if (this.score % this.upScore === 0) {
            this.leveLup()
        }
    }

    //    等级提升
    leveLup() {
        //    等级提升
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel;
