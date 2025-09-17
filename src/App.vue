<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { config as accountsServiceConfig } from '@/axios/accounts-service'
import { config as emailServiceConfig } from '@/axios/email-service'
import { config as fileServiceConfig } from '@/axios/file-service'

// 更换代理方式
accountsServiceConfig.baseURL = 'http://127.0.0.1:10002'
// emailServiceConfig.baseURL = 'http://127.0.0.1:13004'
// fileServiceConfig.baseURL = 'http://8.156.67.247:14004'
</script>
