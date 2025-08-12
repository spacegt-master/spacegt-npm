import type { Users } from "types";
import axios from "../axios/accounts-service";

export const SignUpApi = {
  signUp(data: Users) {
    return axios({
      url: "/api/sign-up",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
};
