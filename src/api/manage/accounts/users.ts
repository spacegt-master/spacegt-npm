import axios from "@/axios/accounts-service";
import { usePagingProcessor } from "@/composables/usePagingProcessor";

export const UsersApi = {
  info() {
    return axios({
      url: "/api/users/info",
      method: "get",
    });
  },
  edit(data: object) {
    return axios({
      url: "/api/users/edit",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
  del(id: string) {
    return axios({
      url: `/api/users/del/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  repwd(id: string, newPwd: string) {
    return axios({
      url: "/api/users/repwd",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        id,
        newPwd,
      },
    });
  },
  changePwd(newPwd: string, oldPwd: string) {
    return axios({
      url: "/api/users/changePwd",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        newPwd,
        oldPwd,
      },
    });
  },
  page(params: {
    current: number;
    size: number;
    sortKey: string;
    sortOrder: string;
    name: string;
    role: string;
    org: string;
  }) {
    usePagingProcessor(params);

    return axios({
      url: "/api/users/page",
      method: "get",
      params,
    });
  },
  batch(data: object) {
    return axios({
      url: "/api/users/batch",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
  },
};
