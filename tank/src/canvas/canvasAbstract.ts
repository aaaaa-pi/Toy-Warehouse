import config from "../config";
import { image } from "../services/images";

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

    protected createCanvas() {
       this.el.width = config.canvas.width
       this.el.height = config.canvas.height

       this.app.insertAdjacentElement('afterbegin',this.el)
    }

    protected drawModel(num: number) {
        this.positionCollextion(num).forEach(position => {
            this.canvas.drawImage(image.get('straw')!,position.x,position.y,config.model.width,config.model.height)
        })          
    }

    // 批量生成唯一坐标
    protected positionCollextion(num: number){
        const collection = [] as {x:number,y: number}[]
        for(let i = 0; i < num; i ++){
            while(true){
                const position = this.position()
                const exists = collection.some(c => c.x == position.x && c.y == position.y)
                if(!exists){
                    collection.push(position)
                    break
                }
            }
        }
        return collection
    }
    protected position(){
        return {
            x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
            y: Math.floor(Math.random() * (config.canvas.height / config.model.height))* config.model.height
        }
    }
}