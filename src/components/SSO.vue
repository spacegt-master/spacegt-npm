<template>
    <iframe :src="`${service}?token=${SSOStore.token}`"></iframe>
</template>

<script setup lang="ts">
import { useSSOStore } from '@/stores/sso'

const SSOStore = useSSOStore();

defineProps({
    service: {
        type: String,
        default: import.meta.env.VITE_APP_ACCOUNTS_SSO_SERVICE,
    }
})

window.addEventListener("message", SSOStore.handleMessage);
</script>

<style scoped>
iframe {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
}
</style>