<template>
  <v-container class="pa-md-4 position-fixed bottom-0 right-0" style="z-index: 2500;" max-width="max-content"
    v-show="(!$vuetify.display.smAndDown) && fileStore.dialog">
    <v-list border density="compact" max-width="420" min-width="300" rounded="lg">
      <v-card-item>
        <template v-slot:prepend>
          <v-card-title class="text-subtitle-1">
            <v-icon icon="mdi-view-list" start></v-icon>
            文件列表
          </v-card-title>
        </template>
        <template v-slot:append>
          <v-btn icon="$close" variant="text" density="comfortable" @click="fileStore.dialog = false"></v-btn>
        </template>
      </v-card-item>
      <v-list-item v-for="item in fileStore.items" :key="item.id">
        <template #prepend>
          <v-avatar size="x-small">
            <v-progress-circular v-if="item.state === 0" :model-value="item.progress" :size="20"></v-progress-circular>
            <v-icon v-if="item.state === 1" color="green" icon="mdi-check-circle-outline" />
            <v-icon v-if="item.state === 2" color="red" icon="mdi-close-circle-outline" />
          </v-avatar>
        </template>

        <template #title>
          <div class="d-flex">
            <span class="text-medium-emphasis">{{ useTimeAgo(new Date()) }}</span>
            <span class="mx-2">&bull;</span>
            <div class="text-truncate">{{ item.name }}</div>
          </div>
        </template>
      </v-list-item>

    </v-list>
  </v-container>
</template>

<script setup>
import { useFileStore } from '@/stores/file';
import { useTimeAgo } from "@vueuse/core";

const fileStore = useFileStore()

</script>
