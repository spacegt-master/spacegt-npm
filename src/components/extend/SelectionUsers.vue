<template>
  <v-dialog v-model="dialog" activator="parent" max-width="1600px" :fullscreen="$vuetify.display.smAndDown" scrollable>

    <template #default>
      <v-card prepend-icon="mdi-account-multiple-outline" title="Selection Users">
        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <Users enable-selection :role-key="roleKey" :orgId="orgId" v-model="selected"></Users>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text="Close" @click="close()"></v-btn>

          <v-spacer></v-spacer>

          <span v-if="multiple == false && selected.length > 1" class="text-caption text-medium-emphasis">
            Only one can be chosen.
          </span>

          <v-btn color="surface-variant" text="Save" variant="flat"
            :disabled="selected.length == 0 || (multiple == false && selected.length > 1)" @click="save()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { UsersApi } from '@/api/manage/accounts/users';
import { nextTick, ref } from 'vue';

const emit = defineEmits(['confirm'])
const props = defineProps({
  roleKey: { type: String },
  multiple: { type: Boolean, default: false },
  orgId: { type: String, default: null }
})

const dialog = ref(false)
const selected = ref([])

const close = () => {
  dialog.value = false
  nextTick(() => {
    selected.value = []
  })
}

const save = async () => {
  const users = await UsersApi.list(selected.value.join(','))

  emit('confirm', users)

  close()
}
</script>

<style lang="scss" scoped></style>