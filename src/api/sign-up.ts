import axios from "../axios/accounts-service";

export const SignUpApi = {
  signUp(data: any) {
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
