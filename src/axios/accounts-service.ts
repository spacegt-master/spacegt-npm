import { useAuthorizationStore } from "@/stores/authorization";
import axios from "axios";
import { reactive, ref } from "vue";
import { snackbar } from "@/stores/snackbar";

const axiosConfig = reactive({
  baseURL: import.meta.env.VITE_APP_ACCOUNTS_SERVICE,
  withCredentials: false,
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
      console.log(error.response.data.detail)
      snackbar({
        title: error.response.data.detail,
        type: "error",
        text: undefined,
        timeout: undefined,
      });
    }
    return Promise.reject(error);
  }
);

export default service;

export { axiosConfig as config };
