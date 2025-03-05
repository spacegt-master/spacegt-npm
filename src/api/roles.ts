import axios from "../axios/accounts-service";

export interface Role {
  id: string;
  name: string;
}

export const RoleApi = {
  list(ids?: string) {
    return axios({
      url: "/user/role/list",
      method: "get",
      params: {
        ids,
      },
    });
  },
  save(data: object) {
    return axios({
      url: "/user/role/save",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
  listByUserPermission() {
    return axios({
      url: "/user/role/listByUserPermission",
      method: "get",
    });
  },
};
