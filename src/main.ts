import "@unocss/reset/tailwind.css";
import "uno.css";
import "@/styles/index.less";
import "vant/lib/index.css";

import { createApp } from "vue";
import { setupRouterGuard } from "./router/guard";
import App from "./App";

import { router, setupRouter } from "./router";
import { setupStore } from "./store";

(() => {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  setupRouterGuard(router);

  app.mount("#app");
})();
