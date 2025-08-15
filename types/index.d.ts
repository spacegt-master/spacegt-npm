import { App } from "vue";
import { AxiosInstance } from "axios";
import type { SnackbarOptions } from "@/types/snackbar";

export interface Users {
  id?: string;
  username: string;
  nickname: string;
  email?: string;
  phone?: string;
  avatar?: string;
  password?: string;
  orgs?: string;
}

export interface Authorities {
  authority: string;
  key: string;
  name: string | null;
}

export interface AccountsStore {
  account?: Users;
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
declare var fileService: AxiosInstance;
declare var fileServiceConfig: AxiosInstance;
declare var smsService: AxiosInstance;
declare var smsServiceConfig: AxiosInstance;

declare var useAccountsStore: () => AccountsStore;
declare var useAuthorizationStore: () => AuthorizationStore;
declare var useLoginStore: () => any;
declare var useSnackbarStore: () => any;
declare var useFileStore: () => any;

declare var FileApi: {
  filePath: string;
  upload(file: any, path: string, hide?: boolean): Promise<any>;
  download(url: string): Promise<any>;
  downloadTxt(url: string): Promise<any>;
  ppt2image(file: any): Promise<any>;
  delete(url: string): Promise<any>;
};

declare var EmailApi: {
  codeSignUp(email: string, username: string): Promise<any>;
  codeForgotPassword(email: string): Promise<any>;
  verify(email: string, code: string): Promise<any>;
};

declare var ForgotPasswordApi: {
  forgotPassword(data: any): Promise<any>;
};

declare var LoginApi: {
  login(username: string, password: string): Promise<any>;
  uniqueVerification(username: string): Promise<any>;
};

declare var SignUpApi: {
  signUp(data: any): Promise<any>;
};

declare var AuthoritiesApi: {
  list(): Promise<any>;
  listByRole(role: string): Promise<any>;
};

declare var RolesApi: {
  list(keys?: string): Promise<any>;
  edit(data: object): Promise<any>;
};

declare var OrgsApi: {
  list(childrenCount?: boolean): Promise<any>;
  listByPid(pid: string, childrenCount?: boolean): Promise<any>;
  listByCodes(codes: string): Promise<any>;
  oneById(id: string): Promise<any>;
  del(id: string): Promise<any>;
  edit(data: {
    id: string;
    pid: string;
    name: string;
    maxUser: number;
  }): Promise<any>;
};

declare var UsersApi: {
  info(): Promise<any>;
  list(ids: string): Promise<any>;
  edit(data: Users): Promise<any>;
  del(id: string): Promise<any>;
  repwd(id: string, newPwd: string): Promise<any>;
  changePwd(newPwd: string, oldPwd: string): Promise<any>;
  page(params: {
    current: number;
    size: number;
    sortKey: string;
    sortOrder: string;
    name: string;
    role: string;
    org: string;
  }): Promise<any>;
  batch(data: object): Promise<any>;
};

declare var TokenApi: {
  validate(token: string): Promise<any>;
};

declare var SMSApi: {
  sendUserRegistrationVerificationCode(phoneNumber: string): Promise<any>;
  verifyCode(phoneNumber: string, userCode: string): Promise<any>;
};

declare var snackbar: (options: SnackbarOptions) => void;

export interface SpacegtStatic {
  install(app: App): void;
  locales: any;
}

declare const spacegt: SpacegtStatic;

export default spacegt;

export {
  // Service
  accountsService,
  accountsServiceConfig,
  emailService,
  emailServiceConfig,
  fileService,
  fileServiceConfig,
  smsService,
  smsServiceConfig,
  // Store
  useAccountsStore,
  useAuthorizationStore,
  useLoginStore,
  useSnackbarStore,
  useFileStore,
  // API
  FileApi,
  EmailApi,
  ForgotPasswordApi,
  LoginApi,
  SignUpApi,
  AuthoritiesApi,
  RolesApi,
  OrgsApi,
  UsersApi,
  TokenApi,
  SMSApi,
  //fn
  snackbar,
};
