import config from "../config";
import canvasAbstract from "./canvasAbstract";
import model from "../model/straw"

class straw extends canvasAbstract {
    render(): void {
       super.drawModel(config.straw.num,model)
    }
    
}

export default new straw()