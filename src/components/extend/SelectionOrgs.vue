<template>
  <v-dialog v-model="dialog" activator="parent" max-width="600px" :fullscreen="$vuetify.display.smAndDown" scrollable>

    <template #default>
      <v-card prepend-icon="mdi-bank" title="Selection Orgs">
        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <Orgs enable-selection v-model="selected"></Orgs>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text="Close" @click="close()"></v-btn>

          <v-spacer></v-spacer>

          <v-btn color="surface-variant" text="Save" variant="flat" :disabled="selected.length == 0"
            @click="save()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { nextTick, ref } from 'vue';

const emit = defineEmits(['confirm'])
const dialog = ref(false)
const selected = ref([])

const close = () => {
  dialog.value = false
  nextTick(() => {
    selected.value = []
  })
}

const save = async () => {
  const org = await OrgsApi.oneById(selected.value.join(''))
  
  emit('confirm', org)

  close()
}
</script>

<style lang="scss" scoped></style>
