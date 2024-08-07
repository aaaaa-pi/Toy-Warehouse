import config from "../config";

type positionType = {x: number,y: number}
class position {
    // 批量生成唯一坐标
    collection: positionType[] = []
    public getCollextion(num: number){
        for(let i = 0; i < num; i ++){
            while(true){
                const position = this.position()
                const exists = this.collection.some(c => c.x == position.x && c.y == position.y)
                if(!exists){
                    this.collection.push(position)
                    break
                }
            }
        }
        return this.collection
    }

    // 随机生成坐标
    protected position(){
        return {
            x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
            y: Math.floor(Math.random() * (config.canvas.height / config.model.height - 5))* config.model.height + config.model.height * 2
        }
    }
}

export default new position()