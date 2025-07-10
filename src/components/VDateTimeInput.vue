<template>
    <v-text-field v-model="model" width="300px" :active="menu" :focus="menu" prepend-icon="mdi-clock-time-four-outline"
        readonly>
        <v-menu v-model="menu" :close-on-content-click="false" activator="parent" transition="scale-transition">
            <v-card min-width="300">
                <v-card-text class="d-flex ga-4 justify-center">
                    <v-date-picker v-model="date"></v-date-picker>

                    <v-time-picker v-model="time"></v-time-picker>
                </v-card-text>
            </v-card>
        </v-menu>
    </v-text-field>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

import { ref, watch } from 'vue';

const model = defineModel<string | number | undefined>()

const date = ref<any>(null)

const time = ref<any>(null)

const menu = ref(false)

watch(model, () => {
    if (model.value) {
        const modelDate = new Date(model.value)

        date.value = modelDate.toISOString()

        time.value = useDateFormat(modelDate, 'HH:mm').value
    }
}, { immediate: true })

watch([date, time], () => {
    if (date.value && time.value) {
        const dateFormat = useDateFormat(new Date(date.value), 'YYYY-MM-DD').value

        model.value = `${dateFormat} ${time.value}`
    }
})

</script>

<style scoped></style>