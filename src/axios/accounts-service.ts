import { useAuthorizationStore } from "@/stores/authorization";
import axios from "axios";
import { reactive, ref } from "vue";
import { snackbar } from "@/stores/snackbar";
import router from "@/router";

const axiosConfig = reactive({
  baseURL: import.meta.env.VITE_APP_ACCOUNTS_SERVICE,
  withCredentials: false,
  tokenExpiredRouter: "/login",
  tokenExpiredFunction: () => {},
});

const service = axios.create(axiosConfig);

service.interceptors.request.use(
  (config) => {
    config.baseURL = axiosConfig.baseURL;

    const authorizationStore = useAuthorizationStore();
    config.headers[authorizationStore.head] = authorizationStore.getFullToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (
      error.status === 403 &&
      error.response.headers["content-type"] === "application/problem+json"
    ) {
      if (
        "Token validation failed due to invalid signature or expiration" ==
        error.response.data.detail
      ) {
        axiosConfig.tokenExpiredFunction()
        router.push(axiosConfig.tokenExpiredRouter);
      } else {
        snackbar({
          title: error.response.data.detail,
          type: "error",
          text: undefined,
          timeout: undefined,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default service;

export { axiosConfig as config };
