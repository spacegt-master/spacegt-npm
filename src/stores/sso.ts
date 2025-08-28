import { defineStore } from "pinia";
import { ref } from "vue";
import { useAccountsStore } from "@/stores/accounts";
import { useAuthorizationStore } from "@/stores/authorization";
import { UsersApi } from "@/api/manage/accounts/users";

export const useSSOStore = defineStore("sso", () => {
  const authorizationStore = useAuthorizationStore();
  const accountsStore = useAccountsStore();

  const token = ref("");

  const setToken = (value: any) => {
    token.value = value;
  };

  async function handleMessage(event: any) {
    const receivedData = event.data;

    if (receivedData && receivedData.type === "token") {
      authorizationStore.token = receivedData.payload;

      const Principal = (await UsersApi.info()) as any;

      if (Principal) {
        accountsStore.account = Principal;
        accountsStore.authorities = Principal.authorities;
      }
    }
    if (receivedData && receivedData.type === "token_expired") {
      authorizationStore.token = "";
      accountsStore.account = undefined;
      accountsStore.authorities = [];
    }
  }

  return {
    token,
    setToken,
    handleMessage,
  };
});
