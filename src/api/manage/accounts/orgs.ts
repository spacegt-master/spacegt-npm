import axios from "@/axios/accounts-service";

export const OrgsApi = {
  list(childrenCount = false) {
    return axios({
      url: "/api/orgs/list",
      method: "get",
      params: {
        childrenCount,
      },
    });
  },
  listByPid(pid: string, childrenCount = false) {
    return axios({
      url: `/api/orgs/list/${pid}`,
      method: "get",
      params: {
        childrenCount,
      },
    });
  },
  oneById(id: string) {
    return axios({
      url: `/api/orgs/one/${id}`,
      method: "get",
    });
  },
  del(id: string) {
    return axios({
      url: `/api/orgs/del/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  edit(data: { id: string; pid: string; name: string; maxUser: number }) {
    return axios({
      url: "/api/orgs/edit",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
};
