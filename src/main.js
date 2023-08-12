import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 样式
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "normalize.css";
import "./assets/css/reset.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
