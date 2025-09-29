/*
* 作者：李健
* 邮箱：lj2690@163.com
* */
import express from 'express'
import {createServer as createViteServer} from 'vite'
import fs from "node:fs/promises";

const PROT: number = 3005;
const isProduction = process.env.NODE_ENV === 'production'

async function startServer() {
    const app = express();

    let vite: any = null;
    if (!isProduction) {
        vite = await createViteServer({
            server: {
                middlewareMode: true,
            },
            appType: 'custom'
        });

        app.use(vite.middlewares);
    } else {
        // 拦截静态资源 转到 指定位置
        app.use('/assets', express.static('./dist/client/assets'));
    }

    app.get('*all', async (req, res) => {
        const url = req.url;
        try {
            let template: string = '';
            let render;
            if (isProduction) {
                template = await fs.readFile('dist/client/index.html', {encoding: 'utf-8'});
                render = (await import('./dist/server/entry-server.js')).render;
            } else {
                template = await fs.readFile('./index.html', {encoding: 'utf-8'});
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule('./src/entry-server.ts')).render;
            }
            const {appHtml, data} = await render(url);
            const html = template.replace('<!--app-html-->', appHtml).replace('<!--pinia-data-->', JSON.stringify(data));
            res.status(200).set("Content-Type", "text/html").end(html, 'utf-8');
        } catch (e) {
            res.status(500).set("Content-Type", "text/html").end('服务器发生错误：500', 'utf-8');
            vite?.ssrFixStacktrace(e);
        }
    });
    app.listen(PROT, () => {
        console.log(`服务已启动：http://localhost:${PROT}`);
    });
}

startServer();