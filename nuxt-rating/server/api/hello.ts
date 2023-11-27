import {H3Event} from 'h3';
export default defineEventHandler(async(event: H3Event): Promise<unknown> => {
    return 'hello' + event.node.req.url;
})