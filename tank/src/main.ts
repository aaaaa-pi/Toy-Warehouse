import './style.scss'
import config from './config'
import straw from './canvas/straw'
import { promises } from './services/images'

const app = document.querySelector<HTMLDivElement>('#app')!
app.style.width = config.canvas.width + 'px'
app.style.height = config.canvas.height + 'px'

async function bootstrap() {
    // 先加载贴图
    await Promise.all(promises)
    // 再渲染画布
    straw.render()
}

void bootstrap()