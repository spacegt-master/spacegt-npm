// Types
import type { App } from "vue";
import login from "@/components/login/index.vue";

const install = (app: App) => {
  app.component("spacegt-login", login);
};

export default {
  install,
};
