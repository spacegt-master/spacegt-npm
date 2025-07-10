<template>
  <v-locale-provider locale="zhHans">
    <!-- <login @login="handleLogin" /> -->
    <!-- <aippt @export-images="handleExportImages" @create-outline="handleCreateOutline" @createPPT="handleCreatePPT"></aippt> -->
    <!-- <v-app-bar>
    <myaccount :account="{ nickname: '王硕', avatar: 'https://cdn.vuetifyjs.com/images/john.png' }"
      proxy="https://myaccount.spacegt.com" @logout="handleLogout" @login="handleLogin" @settings="handleSettings">
    </myaccount>
  </v-app-bar> -->
    <!-- <Roles></Roles>
    <Orgs></Orgs>
    <Users></Users> -->
    <!-- <selection-orgs-btn></selection-orgs-btn>
    <selection-users-btn multiple :items="users" org-id="a6f7d3eef2986db22ae0456786dd46f2" role-key="USER"
      @change="(value: any[]) => users = value" @clear="users = []"></selection-users-btn> -->
  </v-locale-provider>
  <v-date-time-input></v-date-time-input>
  <Snackbar></Snackbar>
</template>

<script lang="ts" setup>
import login from '@/components/login/index.vue'
import aippt from '@/components/aippt/index.vue'
import myaccount from '@/components/myaccount/index.vue'
import { useAuthorizationStore } from '@/stores/authorization'
import { useAccountsStore } from '@/stores/accounts'
import { useRouter } from 'vue-router'
import { config as accountsServiceConfig } from '@/axios/accounts-service'
import { config as emailServiceConfig } from '@/axios/email-service'
import { snackbar } from '@/stores/snackbar';
import { ref } from 'vue'

const router = useRouter()
const authorizationStore = useAuthorizationStore()
const accountsStore = useAccountsStore()

// 更换代理方式
accountsServiceConfig.baseURL = 'http://127.0.0.1:10002'
emailServiceConfig.baseURL = 'http://127.0.0.1:13004'


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

// 登录成功回调
const handleLogin = (data: any) => {
  if (data.code === 0) {
    authorizationStore.token = data.token
    accountsStore.account = data.data
    accountsStore.authorities = data.data.authorities
    router.push('/')
  } else {
    snackbar({
      title: data.message,
      type: 'warning',
    })
  }
}
</script>
