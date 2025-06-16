import axios from "@/axios/accounts-service";

export const AuthoritiesApi = {
  list() {
    return axios({
      url: "/api/authorities/list",
      method: "get",
    });
  },
  listByRole(role: string) {
    return axios({
      url: "/api/authorities/listByRole",
      method: "get",
      params: { role },
    });
  },
};
