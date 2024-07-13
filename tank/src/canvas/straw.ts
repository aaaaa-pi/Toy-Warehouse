import config from "../config";
import canvasAbstract from "./canvasAbstract";

class straw extends canvasAbstract {
    render(): void {
       super.drawModel(config.straw.num)
    }
    
}

export default new straw()