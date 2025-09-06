<template>
  <v-dialog v-model="dialog" activator="parent" max-width="1600px" :fullscreen="$vuetify.display.smAndDown" scrollable>

    <template #default>
      <v-card prepend-icon="mdi-account-multiple-outline"
        :title="$vuetify.locale.t('$vuetify.selectionUsersComponent.title')">
        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <Users enable-selection :role-key="roleKey" :orgId="orgId" :exclude="exclude" :tags="tags" v-model="selected">
          </Users>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :text="$vuetify.locale.t('$vuetify.close')" @click="close()"></v-btn>

          <v-spacer></v-spacer>

          <span v-if="multiple == false && selected.length > 1" class="text-caption text-medium-emphasis">
            {{ $vuetify.locale.t('$vuetify.selectionUsersComponent.multipleChoiceTip') }}
          </span>

          <v-btn color="surface-variant" :text="$vuetify.locale.t('$vuetify.save')" variant="flat"
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
  orgId: { type: String, default: null },
  exclude: { type: String, default: null },
  tags: { type: String, default: null }
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

<style scoped></style>