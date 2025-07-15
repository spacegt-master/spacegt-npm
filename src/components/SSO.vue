<template>
    <iframe :src="`${service}?token=${token}`"></iframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';


defineProps({
    service: {
        type: String,
        default: import.meta.env.VITE_APP_ACCOUNTS_SSO_SERVICE,
    }
})

const token = ref('')

const setToken = (value: any) => {
    token.value = value
}

defineExpose({
    setToken
})
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