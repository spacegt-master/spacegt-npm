import type { App } from "vue";

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
  getFullToken: strin;
}

export interface SpacegtStores {
  useAccountsStore(): AccountsStore;
  useAuthorizationStore(): AuthorizationStore;
}

export interface SpacegtStatic {
  install(app: App): void;
  locales?: any;
  stores?: any;
}

declare const spacegt: SpacegtStatic;

export default spacegt;
