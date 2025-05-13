<template>
  <!-- <login proxy="http://127.0.0.1:10002" email-proxy="http://127.0.0.1:13004" locale="zhHans" /> -->
  <aippt @export-images="handleExportImages"></aippt>
</template>

<script lang="ts" setup>
import login from '@/components/login/index.vue'
import aippt from '@/components/aippt/index.vue'

const handleExportImages = (data: any) => {
  console.log(data)
}
</script>
