/*
* 作者：李健
* 邮箱：lj2690@163.com
* */
import {renderToString} from "vue/server-renderer"
import {createApp} from "./main.ts";

export async function render(url: string) {
    const {app, router, pinia} = createApp();
    await router.push(url);
    await router.isReady();
    let ctx = {};
    const appHtml = await renderToString(app, ctx);
    const data = pinia.state.value;
    return {appHtml, data};
}