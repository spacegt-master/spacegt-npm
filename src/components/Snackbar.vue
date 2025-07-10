<template>
  <v-snackbar v-model="snackbarStore.snackbar" color="surface" contained location="top end" rounded="lg"
    :text="snackbarStore.text" :title="snackbarStore.title" :timeout="snackbarStore.timeout" class="mt-16 pt-2">
    <template #text>
      <div class="d-flex align-start">
        <v-icon v-if="snackbarStore.type" :color="snackbarStore.type" :icon="`$${snackbarStore.type}`" start />
        <div>
          <strong v-if="snackbarStore.title" class="d-inline-block text-subtitle-2 "
            :class="{ 'mb-1': snackbarStore.text }">
            {{ snackbarStore.title }}
          </strong>
          <div>
            {{ snackbarStore.text }}
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <v-btn density="comfortable" icon="$close" size="small" @click="snackbarStore.snackbar = false" />
    </template>
  </v-snackbar>
</template>

<script setup>
import { useSnackbarStore } from '@/stores/snackbar';

const snackbarStore = useSnackbarStore()
</script>

<style  scoped></style>
