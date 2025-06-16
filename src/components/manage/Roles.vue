<template>
  <v-container class="px-6 py-6 mb-6" fluid>
    <v-list class="px-2" lines="two" variant="flat">
      <v-list-subheader>Update Roles</v-list-subheader>

      <div class="text-caption ps-4">
        By restricting the authorities of users, the risk of misoperation and
        malicious behavior can be reduced.
      </div>

      <v-divider class="mt-6 mb-3" />

      <div class="pa-3">
        <v-list-item v-for="item in items" :key="item.title" base-color="surface-light" class="mt-2" rounded>
          <template #prepend>
            <v-icon icon="mdi-shield-account-outline"></v-icon>
          </template>

          <template #title>
            <span class="text-subtitle-2 font-weight-bold">{{ item.name }}</span>
          </template>

          <template #subtitle>
            <span class="text-caption">{{ item.description }}</span>
          </template>

          <template #append v-if="accountsStore.hasAuthority('ROLES_EDIT')">
            <v-btn class="text-none text-disabled" prepend-icon="mdi-shield-edit-outline" text="Edit" variant="tonal"
              @click="editItem(item)" />
          </template>
        </v-list-item>
      </div>
    </v-list>

    <v-dialog v-model="dialog" max-width="600" scrollable>
      <v-card prepend-icon="mdi-shield-account-variant-outline" title="Setting role authorities" :loading="loading">
        <v-list v-model:selected="selected" lines="three" select-strategy="leaf">
          <v-list-subheader>Authorities</v-list-subheader>
          <v-list-item v-for="item in authorities" :key="item.id" :subtitle="item.description" :title="item.name"
            :value="item.key">
            <template v-slot:prepend="{ isSelected }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>

                <v-icon class="mx-2" icon="mdi-shield-lock-outline"></v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <small class="text-caption text-medium-emphasis ml-4">* Modify role authorities carefully to avoid
            unpredictable
            errors.</small>
          <v-spacer></v-spacer>
          <v-btn text="close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn color="primary" text="save" variant="tonal" @click="save()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { AuthoritiesApi } from '@/api/manage/accounts/authorities';
import { RolesApi } from '@/api/manage/accounts/roles';
import { useAccountsStore } from '@/stores/accounts';
import { snackbar } from '@/stores/snackbar';
import { onMounted, ref } from 'vue';
import { config as accountsServiceConfig } from '@/axios/accounts-service'

const props = defineProps({
  proxy: {
    type: String,
  },
})

if (props.proxy) {
  accountsServiceConfig.baseURL = props.proxy
}

const accountsStore = useAccountsStore()

const items = ref([])
const dialog = ref(false)
const editedId = ref()
const selected = ref([])
const authorities = ref([])
const loading = ref(true)

const editItem = async (item) => {
  loading.value = true
  dialog.value = true
  editedId.value = item.id
  selected.value = []
  authorities.value = await AuthoritiesApi.list()
  const res = await AuthoritiesApi.listByRole(item.key)
  if (res) selected.value = res.map((item) => item.key)
  loading.value = false
}

const save = async () => {
  const res = await RolesApi.edit({ id: editedId.value, authorities: selected.value.join(',') })
  if (res) {
    snackbar({
      title: 'Edit successfully',
      type: 'success'
    })
  } else {
    snackbar({
      title: 'Edit failure',
      type: 'error'
    })
  }
  selected.value = []
  editedId.value = null
  dialog.value = false
}

onMounted(async () => {
  items.value = await RolesApi.list()
})
</script>

<style scoped></style>
