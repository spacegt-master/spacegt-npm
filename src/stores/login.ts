import { EmailApi } from "@/api/email";
import { ForgotPasswordApi } from "@/api/forgot-password";
import { SignUpApi } from "@/api/sign-up";
import { useWebNotification } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

const { show } = useWebNotification();

const tab = ref("login"); // sign-up / forgot-password

export const useLoginStore = defineStore(
  "login",
  () => {
    const form = reactive({
      username: "",
      password: "",
    });

    const remember = ref(false);

    const showPassword = ref(false);

    const otp = ref("");

    return {
      form,
      remember,
      tab,
      showPassword,
      otp,
    };
  },
  {
    persist: {
      afterHydrate: (ctx) => {
        if (!ctx.store.remember) {
          ctx.store.form.username = "";
          ctx.store.form.password = "";
        }
        ctx.store.showPassword = false;
      },
    },
  }
);

export const useForgotPasswordStore = defineStore("forgot-password", () => {
  const steps = ref(1);

  const form = reactive({
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    const res = await ForgotPasswordApi.forgotPassword({
      ...form,
      code: form.verificationCode,
    });

    if (res) {
      tab.value = "login";

      form.email = "";
      form.verificationCode = "";
      form.password = "";
      form.confirmPassword = "";

      steps.value = 1;

      show({
        title: "密码修改成功",
        icon: "/favicon.png",
        renotify: true,
        tag: "sendCode",
      });
    } else {
      show({
        title: "密码修改失败",
        icon: "/favicon.png",
        renotify: true,
        tag: "sendCode",
      });
    }
  };

  const sendCode = () => {
    EmailApi.codeForgotPassword(form.email);

    show({
      title: "已发送验证码",
      icon: "/favicon.png",
      renotify: true,
      tag: "sendCode",
    });
  };

  const verifyCode = () => {
    EmailApi.verify(form.email, form.verificationCode);
  };

  return { tab, steps, form, submit, sendCode, verifyCode };
});
