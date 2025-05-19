import type { Authorities, Users } from "types";
import { defineStore } from "pinia";
import { ref } from "vue";

const account = ref<Users>();

const authorities = ref<Authorities[]>([]);

export const useAccountsStore = defineStore(
  "data-accounts",
  () => {
    return { account, authorities, matchAuthorities, hasAuthority };
  },
  { persist: true }
);

function matchAuthorities(
  authorities: Authorities[],
  hasAuthority: string[] | undefined
) {
  if (!hasAuthority) return true;

  if (hasAuthority) {
    return (
      authorities.findIndex((item) => hasAuthority.includes(item.key)) > -1
    );
  }
}

function hasAuthority(authority: string) {
  return authorities.value.findIndex((item) => item.key == authority) > -1;
}
