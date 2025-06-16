import axios from "@/axios/accounts-service";

export const RolesApi = {
  list(keys?: string) {
    return axios({
      url: "/api/roles/list",
      method: "get",
      params: {
        keys,
      },
    });
  },
  edit(data: object) {
    return axios({
      url: "/api/roles/edit",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
};
