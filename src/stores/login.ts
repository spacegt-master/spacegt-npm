import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useLoginStore = defineStore(
  "login",
  () => {
    const form = reactive({
      username: "",
      password: "",
    });

    const remember = ref(false);

    const tab = ref("login"); // sign-up / forgot-password

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
      },
    },
  }
);
