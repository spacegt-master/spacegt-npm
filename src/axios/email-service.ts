import axios, { type CreateAxiosDefaults } from "axios";
import { reactive, ref } from "vue";

const axiosConfig = reactive({
  baseURL: import.meta.env.VITE_APP_EMAIL_SERVICE,
  withCredentials: false,
});

const service = axios.create(axiosConfig);

service.interceptors.request.use(
  (config) => {
    config.baseURL = axiosConfig.baseURL;
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
    return Promise.reject(error);
  }
);

export default service;

export { axiosConfig as config };
