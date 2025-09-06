<template>
  <v-locale-provider locale="zhHans">
    <v-app-bar>
      <myaccount :account="accountsStore.account" proxy="https://myaccount.spacegt.com" @logout="handleLogout"
        @toLogin="router.push('/login')" @settings="handleSettings">
      </myaccount>
    </v-app-bar>
    <!-- <aippt @export-images="handleExportImages" @create-outline="handleCreateOutline" @createPPT="handleCreatePPT">
      <template #default="{ props: activatorProps }">
        <v-btn v-bind="activatorProps">你好</v-btn>
      </template>
</aippt> -->

    <!-- <Roles></Roles> -->
    <!-- <Orgs></Orgs> -->
    <!-- <orgs-details></orgs-details> -->
    <Users tags="empty"></Users>
    <!-- <selection-orgs-btn></selection-orgs-btn> -->
    <!-- <selection-users-btn multiple :items="users" org-id="a6f7d3eef2986db22ae0456786dd46f2" role-key="USER"
      @change="(value: any[]) => users = value" @clear="users = []"></selection-users-btn> -->
  </v-locale-provider>
  <!-- <v-date-time-input></v-date-time-input> -->
  <Snackbar></Snackbar>
  <SSO service="http://192.168.124.10:3003"></SSO>
</template>

<script lang="ts" setup>
import aippt from '@/components/aippt/index.vue'
import myaccount from '@/components/myaccount/index.vue'
import { useAuthorizationStore } from '@/stores/authorization'
import { useAccountsStore } from '@/stores/accounts'
import { useRouter } from 'vue-router'

import { snackbar } from '@/stores/snackbar';
import { ref } from 'vue'
import { FileApi } from '@/api/file'
import { UsersApi } from '@/api/manage/accounts/users'

const router = useRouter()
const authorizationStore = useAuthorizationStore()
const accountsStore = useAccountsStore()

const users = ref([
  { id: 1, nickname: '王硕' },
  { id: 2, nickname: '张三' },
  { id: 3, nickname: '李四' },
])

const handleExportImages = (data: any) => {
  console.log(data)
}

const handleCreateOutline = (data: any) => {
  console.log(data)
}
const handleCreatePPT = (data: any) => {
  console.log(data)
}

const handleLogout = () => {
  console.log("is logouted")
}

const handleSettings = () => {
  console.log("to settings")
}

 
</script>
