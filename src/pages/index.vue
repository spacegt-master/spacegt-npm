<template>
  <!-- <login proxy="http://127.0.0.1:10002" email-proxy="http://127.0.0.1:13004" locale="zhHans" /> -->
  <!-- <aippt @export-images="handleExportImages" @create-outline="handleCreateOutline"
          @createPPT="handleCreatePPT"></aippt> -->
  <v-app-bar>
    <myaccount :account="{ nickname: '王硕', avatar: 'https://cdn.vuetifyjs.com/images/john.png' }"
      proxy="https://myaccount.spacegt.com" @logout="handleLogout" @login="handleLogin" @settings="handleSettings">
    </myaccount>
  </v-app-bar>
</template>

<script lang="ts" setup>
import login from '@/components/login/index.vue'
import aippt from '@/components/aippt/index.vue'
import myaccount from '@/components/myaccount/index.vue'

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

const handleLogin = () => {
  console.log("to login")
}

const handleSettings = () => {
  console.log("to settings")
}
</script>
