// Types
import type { App } from "vue";

import login from "@/components/login/index.vue";

import aippt from "@/components/aippt/index.vue";

import myaccount from "@/components/myaccount/index.vue";

import { useAccountsStore } from "@/stores/accounts";

import en from "@/locales/en";
import zhHans from "@/locales/zhHans";

const install = (app: App) => {
  app.component("spacegt-login", login);

  app.component("spacegt-aippt", aippt);

  app.component("spacegt-myaccount", myaccount);
};

export default {
  install,
  locales: { en, zhHans },
  stores: { useAccountsStore },
};
