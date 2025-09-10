<template>
    {{ model }}
    <v-autocomplete v-model="model" :label="title" :items="items" item-value="id" item-title="name"></v-autocomplete>
</template>

<script setup lang="ts">
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { onMounted, ref } from 'vue';

const props = defineProps({
    title: String
})

const model = defineModel({ default: null })

const items = ref([])

async function load() {
    items.value = await OrgsApi.AutocompleteList() as any
}

onMounted(() => {
    load()
})
</script>

<style scoped></style>