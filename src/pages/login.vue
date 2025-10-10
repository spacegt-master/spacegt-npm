<template>
    <login title="易格登录" :sign-up="false" :sliderCaptcha="true" @login="handleLogin" />
</template>

<script setup lang="ts">
import login from '@/components/login/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// 登录成功回调
const handleLogin = (data: any) => {
    router.push('/')
}
</script>

<style scoped></style>