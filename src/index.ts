// Types
import type { App } from "vue";

import login from "@/components/login/index.vue";

import aippt from "@/components/aippt/index.vue";

import myaccount from "@/components/myaccount/index.vue";

import snackbar from "@/components/Snackbar.vue";

import manageRoles from "@/components/manage/Roles.vue";

import manageOrgs from "@/components/manage/Orgs.vue";

import manageUsers from "@/components/manage/Users.vue";

import { useAccountsStore } from "@/stores/accounts";

import { useAuthorizationStore } from "@/stores/authorization";

import { useLoginStore } from "@/stores/login";

import { useSnackbarStore } from "@/stores/snackbar";

import accountsService from "@/axios/accounts-service";

import { config as accountsServiceConfig } from "@/axios/accounts-service";

import emailService from "@/axios/email-service";

import { config as emailServiceConfig } from "@/axios/email-service";

import en from "@/locales/en";
import zhHans from "@/locales/zhHans";

const install = (app: App) => {
  app.component("spacegt-login", login);

  app.component("spacegt-aippt", aippt);

  app.component("spacegt-myaccount", myaccount);

  app.component("spacegt-snackbar", snackbar);

  app.component("spacegt-manage-roles", manageRoles);

  app.component("spacegt-manage-orgs", manageOrgs);

  app.component("spacegt-manage-users", manageUsers);
};

export default {
  install,
  locales: { en, zhHans },
};

export {
  accountsService,
  accountsServiceConfig,
  emailService,
  emailServiceConfig,
  useAccountsStore,
  useAuthorizationStore,
  useLoginStore,
  useSnackbarStore,
};

declare module "vue" {
  export interface GlobalComponents {
    login: typeof login;
    aippt: typeof aippt;
    myaccount: typeof myaccount;
    snackbar: typeof snackbar;
    manageRoles: typeof manageRoles;
    manageOrgs: typeof manageOrgs;
    manageUsers: typeof manageUsers;
  }
}
