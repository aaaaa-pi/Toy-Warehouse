import { image } from "../services/images"
import config from "../config"
export default class straw {
    constructor(protected canvas: CanvasRenderingContext2D,protected position: {x: number,y: number}){
        this.canvas.drawImage(image.get('straw')!,position.x,position.y,config.model.width,config.model.height)
    }
}