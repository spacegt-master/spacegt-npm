import axios from "../axios/sms-service";

export const SMSApi = {
  sendUserRegistrationVerificationCode(phoneNumber: string) {
    return axios({
      url: "/api/SMS/send-user-registration-verification-code",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        phoneNumber,
      },
    });
  },
  verifyCode(phoneNumber: string, userCode: string) {
    return axios({
      url: "/api/SMS/verify-code",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        phoneNumber,
        userCode,
      },
    });
  },
};
