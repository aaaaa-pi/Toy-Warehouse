import { image } from "../services/images"
import config from "../config"

type mapKey = keyof typeof config.images
export default abstract class modelAbstract {
    abstract render(): void
    constructor(protected canvas: CanvasRenderingContext2D,protected x: number,protected y: number){}

    protected draw(modelName: mapKey) {
        this.canvas.drawImage(image.get(modelName)!,this.x,this.y,config.model.width,config.model.height)
    }
}