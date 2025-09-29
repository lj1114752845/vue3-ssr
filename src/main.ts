import {createSSRApp} from "vue";
import App from "./App.vue";
import {createAppRouter} from "./router/router.ts";
import "./style.css";
import {createPinia} from "pinia";


export function createApp() {
    const app = createSSRApp(App);
    const router = createAppRouter();
    const pinia = createPinia();
    app.use(router);
    app.use(pinia);
    return {app, router,pinia};
}