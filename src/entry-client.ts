/*
* 作者：李健
* 邮箱：lj2690@163.com
* */

import {createApp} from "./main.ts";

const {app, router, pinia} = createApp();

router.isReady().then(() => {
    const win = (window as any);
    if (win.__INITIAL_STATE__) {
        pinia.state.value = JSON.parse((window as any).__INITIAL_STATE__);
    }
    app.mount('#app');
});