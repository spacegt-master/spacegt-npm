import axios from "../axios/accounts-service";

export const ForgotPasswordApi = {
    forgotPassword(data: any) {
    return axios({
      url: "/api/forgot-password",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
};
