import config from "../config";
import position from "../services/position"

export default abstract class canvasAbstract {
    protected items = []
    abstract render(): void
    constructor(
        protected app = document.querySelector('#app') as HTMLDivElement,
        protected el = document.createElement('canvas'),
        protected canvas = el.getContext('2d')!
    ) {
       this.createCanvas()
    }

    // 创建画布
    protected createCanvas() {
       this.el.width = config.canvas.width
       this.el.height = config.canvas.height

       this.app.insertAdjacentElement('afterbegin',this.el)
    }

    protected drawModel(num: number,model: ModelConstructor) {
        position.getCollextion(num).forEach(position => {
            const instance = new model(this.canvas,position.x,position.y)
            instance.render()
        })          
    }
}