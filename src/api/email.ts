import axios from "../axios/email-service";

export const EmailApi = {
  codeSignUp(email: string, username: string) {
    return axios({
      url: "/api/code/sign-up",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        email,
        username,
      },
    });
  },

  codeForgotPassword(email: string) {
    return axios({
      url: "/api/code/forgot-password",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        email,
      },
    });
  },
  verify(email: string, code: string) {
    return axios({
      url: "/api/code/verify",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        email,
        code,
      },
    });
  },
};
