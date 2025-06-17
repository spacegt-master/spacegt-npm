import { App } from "vue";
import { AxiosInstance } from "axios";

export interface Users {
  id: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Authorities {
  authority: string;
  key: string;
  name: string | null;
}

export interface AccountsStore {
  account: Users;
  authorities: Authorities[];
  matchAuthorities(
    authorities: Authorities[],
    hasAuthority: string[] | undefined
  ): any;
  hasAuthority(authority: string): any;
}

export interface AuthorizationStore {
  head: string;
  prefix: string;
  token: string;
  getFullToken: StringConstructor;
}

export interface AxiosConfig {
  baseURL: string;
  withCredentials: boolean;
}

declare var accountsService: AxiosInstance;
declare var accountsServiceConfig: AxiosConfig;
declare var emailService: AxiosInstance;
declare var emailServiceConfig: AxiosConfig;
declare var useAccountsStore: () => AccountsStore;
declare var useAuthorizationStore: () => AuthorizationStore;
declare var useLoginStore: () => any;
declare var useSnackbarStore: () => any;

export interface SpacegtStatic {
  install(app: App): void;
  locales: any;
}

declare const spacegt: SpacegtStatic;

export default spacegt;

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
