<template>
  <v-container class="px-6 py-6" fluid>
    <v-list class="px-2" lines="two" variant="flat">

      <div class="px-4" v-if="!enableSelection">
        <h3 class="text-subtitle-1 font-weight-bold mb-2 d-flex justify-space-between align-center">
          {{ $vuetify.locale.t('$vuetify.usersComponent.title') }}

          <div class="d-flex ga-2">
            <div v-show="selected && selected.length > 0">
              <DeleteConfirmationDialogBtn variant="text" prepend-icon="mdi-delete" color="error"
                @delete="batchDelUser">
                {{ $vuetify.locale.t('$vuetify.usersComponent.batchDelete') }}
              </DeleteConfirmationDialogBtn>
            </div>

            <v-btn variant="text" prepend-icon="mdi-account-multiple-plus-outline" @click="addItem()">
              {{ $vuetify.locale.t('$vuetify.usersComponent.addUser') }}
            </v-btn>

            <v-btn variant="text" prepend-icon="mdi-database-import">
              {{ $vuetify.locale.t('$vuetify.usersComponent.batchUsers') }}
              <batch-users :role="search.role" @change="handleBatchUsersChange"></batch-users>
            </v-btn>
          </div>
        </h3>

        <div class="text-body-2 text-medium-emphasis mb-4 w-100 w-md-75">
          {{ $vuetify.locale.t('$vuetify.usersComponent.subtitle') }}
        </div>
      </div>

      <v-divider class="mt-6 mb-3" v-if="!enableSelection" />

      <div class="pa-3">
        <div class="d-flex">
          <selection-orgs-btn v-if="orgId == null" :org="search.orgItem"
            @change="(value) => { search.orgItem = value; search.org = value.id }"
            @clear="search.orgItem = null; search.org = null"></selection-orgs-btn>

          <v-select v-if="roleItems.length > 1" v-model="search.role" hide-details
            :placeholder="$vuetify.locale.t('$vuetify.usersComponent.selectRole')" :items="roleItems" item-title="name"
            item-value="key" density="comfortable" class="ml-2"></v-select>

          <v-text-field hide-details v-model="search.name"
            :placeholder="$vuetify.locale.t('$vuetify.usersComponent.searchName')" append-inner-icon="mdi-magnify"
            clearable density="comfortable" class="ml-2"></v-text-field>
        </div>

        <v-data-table-server v-model:options="options" v-model="selected" item-value="id" :show-select="true"
          :headers="headers" :items="items" :items-length="totalItems" :loading="loading"
          :search="`${search.name},${search.role},${search.org}`" :mobile="$vuetify.display.smAndDown"
          @update:options="loadItems">
          <template v-slot:top>
            <div class="d-flex">

            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <VBtn icon="mdi-rename" variant="text" density="comfortable" size="small" @click="editItem(item)"></VBtn>
            <VBtn icon="mdi-lock-reset" variant="text" density="comfortable" size="small" @click="repwdItem(item)">
            </VBtn>
            <VBtn icon="mdi-delete" variant="text" density="comfortable" size="small" @click="deleteItem(item)"></VBtn>
          </template>
        </v-data-table-server>
      </div>
    </v-list>
    <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.display.smAndDown" scrollable>
      <v-form @submit.prevent="save">
        <v-card prepend-icon="mdi-pencil" :title="formTitle">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.username"
                    :label="$vuetify.locale.t('$vuetify.usersComponent.form.username')" :disabled="!!editedItem.id"
                    :rules="rules.username"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.password"
                    :label="$vuetify.locale.t('$vuetify.usersComponent.form.password')" :disabled="!!editedItem.id"
                    type="password" :rules="editedItem.id ? [] : rules.password"></v-text-field>

                  <small class="text-caption text-medium-emphasis">* 密码长度保持在8到20位之间,（字母/数字/符号的任意组合）至少包括两种</small>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.nickname"
                    :label="$vuetify.locale.t('$vuetify.usersComponent.form.nickname')"
                    :rules="rules.nickname"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <selection-orgs-btn class="mb-4" width="100%" min-height="50" :org="editedItem.orgItem"
                    @change="(value) => { editedItem.orgItem = value; editedItem.orgs = value.id.join(',') }"
                    @clear="editedItem.orgItem = null; editedItem.orgs = null"></selection-orgs-btn>
                  <small class="text-caption text-medium-emphasis">* 请选择组织, 必选项</small>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.phone"
                    :label="$vuetify.locale.t('$vuetify.usersComponent.form.phone')"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.email"
                    :label="$vuetify.locale.t('$vuetify.usersComponent.form.email')"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.avatar"
                    :label="$vuetify.locale.t('$vuetify.usersComponent.form.avatar')"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :text="$vuetify.locale.t('$vuetify.close')" variant="plain" @click="close"></v-btn>
            <v-btn :text="$vuetify.locale.t('$vuetify.save')" color="primary" variant="tonal" type="submit"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="dialogDelete" contained max-width="500">
      <v-card rounded="lg" :title="$vuetify.locale.t('$vuetify.usersComponent.deleteTitle')">

        <template #prepend>
          <v-avatar color="error" icon="mdi-alert-outline" variant="tonal" />
        </template>

        <template #text>
          <div class="mb-4 text-body-2 text-medium-emphasis">
            {{ $vuetify.locale.t('$vuetify.usersComponent.deleteSubtitle') }}
          </div>
        </template>

        <v-divider />

        <template #actions>
          <v-spacer />

          <v-btn border class="text-none" color="surface" :text="$vuetify.locale.t('$vuetify.confirmEdit.cancel')"
            variant="flat" @click="closeDelete" />

          <v-btn class="text-none" color="error" :text="$vuetify.locale.t('$vuetify.delete')" variant="flat"
            @click="deleteItemConfirm" />
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRepwd" max-width="600">
      <v-card prepend-icon="mdi-lock-reset" :title="$vuetify.locale.t('$vuetify.usersComponent.repwdTitle')">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.password"
                :label="$vuetify.locale.t('$vuetify.usersComponent.repwdNewPassword')" autofocus></v-text-field>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">
            {{ $vuetify.locale.t('$vuetify.usersComponent.repwdTip') }}
          </small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$vuetify.locale.t('$vuetify.close')" variant="plain" @click="closeRepwd"></v-btn>

          <v-btn :text="$vuetify.locale.t('$vuetify.save')" variant="tonal" color="primary"
            @click="repwdConfirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script setup>
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { RolesApi } from '@/api/manage/accounts/roles';
import { UsersApi } from '@/api/manage/accounts/users';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { VSpacer } from 'vuetify/components';
import { useLocale } from 'vuetify'
import { snackbar } from '@/stores/snackbar';
import { useAccountsStore } from '@/stores/accounts';
import { useOrgsExtractIds } from '@/composables/useOrgsExtractIds';

const { t } = useLocale()
const accountsStore = useAccountsStore()
const selected = defineModel()

const props = defineProps({
  roleKey: { type: String },
  enableSelection: { type: Boolean, default: false },
  orgId: { type: String, default: null },
  exclude: { type: String, default: null },
  tags: { type: String, default: null }
})
const search = reactive({ name: '', role: null, org: null, orgItem: null })

const options = ref({ page: 1, itemsPerPage: 5 })
const headers = ref([
  { title: t("$vuetify.usersComponent.form.username"), key: 'username' },
  { title: t("$vuetify.usersComponent.form.nickname"), key: 'nickname' },
  { title: t("$vuetify.usersComponent.form.orgName"), key: 'orgName' },
  { title: t("$vuetify.usersComponent.form.phone"), key: 'phone', },
  { title: t("$vuetify.usersComponent.form.email"), key: 'email', },
  !props.enableSelection ? { title: t("$vuetify.actions"), key: 'actions', sortable: false, align: 'end' } : {},
])
const roleItems = ref([])
const items = ref([])
const loading = ref(true)
const totalItems = ref(0)
const dialogDelete = ref(false)
const dialog = ref(false)
const dialogRepwd = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({
  id: null,
  username: '',
  password: '',
  nickname: '',
  phone: '',
  email: '',
  avatar: '',
  orgs: null,
  roles: null,
  orgItem: null
})
const defaultItem = ref({
  id: null,
  username: '',
  password: '',
  nickname: '',
  phone: '',
  email: '',
  avatar: '',
  orgr: null,
  roles: null,
  orgItem: null
})
const rules = {
  username: [
    v => !!v || t("$vuetify.usersComponent.rules.usernameIsRequired"),
  ],
  password: [
    v => !!v || t("$vuetify.usersComponent.rules.passwordIsRequired"),
    v => (v && v.length >= 8 && v.length <= 20) || t("$vuetify.usersComponent.rules.passwordLength"),
  ],
  nickname: [
    v => !!v || t("$vuetify.usersComponent.rules.nicknameIsRequired"),
  ]
}

const formTitle = computed(() => editedIndex.value === -1 ? t("$vuetify.usersComponent.addUser") : t("$vuetify.usersComponent.updateUser"))

const handleBatchUsersChange = () => {
  loadItems(options.value)
}

const addItem = () => {
  editedItem.value = Object.assign({}, defaultItem.value)

  if (search.org && search.orgItem) {
    editedItem.value.orgItem = search.orgItem
    editedItem.value.orgs = search.org
  }

  editedIndex.value = -1;

  dialog.value = true
}

const editItem = async (item) => {
  editedIndex.value = items.value.indexOf(item)

  editedItem.value = Object.assign({}, item)

  const res = await OrgsApi.oneById(item.orgs)

  editedItem.value.orgItem = res
  editedItem.value.orgs = useOrgsExtractIds(res)

  dialog.value = true
}

const deleteItem = (item) => {
  editedIndex.value = items.value.indexOf(item);

  editedItem.value = Object.assign({}, item)

  dialogDelete.value = true;
}

const repwdItem = (item) => {
  editedIndex.value = items.value.indexOf(item);

  editedItem.value = Object.assign({}, item)

  dialogRepwd.value = true;
}

const close = () => {
  dialog.value = false

  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)

    editedIndex.value = -1
  })
}

const closeDelete = () => {
  dialogDelete.value = false;

  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)

    editedIndex.value = -1;
  })
}

const closeRepwd = () => {
  dialogRepwd.value = false;

  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)

    editedIndex.value = -1;
  })
}

const deleteItemConfirm = async () => {
  await UsersApi.del(editedItem.value.id)

  loadItems(options.value)

  closeDelete()
}

const repwdConfirm = async () => {
  await UsersApi.repwd(editedItem.value.id, editedItem.value.password)

  loadItems(options.value)

  closeRepwd()
}

const save = async (event) => {
  const results = await event

  if (results.valid) {

    if (editedItem.value.orgs == null) {
      snackbar({
        title: '请选择组织, 必选项',
        type: "error",
        text: undefined,
        timeout: undefined,
      });
      return;
    }

    editedItem.value.roles = search.role

    await UsersApi.edit(editedItem.value)

    editedItem.value.orgItem = null
    editedItem.value.orgs = null

    loadItems(options.value)

    close()
  }
}

async function batchDelUser() {
  for (let index = 0; index < selected.value.length; index++) {
    await UsersApi.del(selected.value[index])
  }
  loadItems(options.value)
  selected.value = []
}

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true
  if (search.role) {
    const res = await UsersApi.page({
      current: page,
      size: itemsPerPage,
      sortKey: sortBy[0] ? sortBy[0].key : null,
      sortOrder: sortBy[0] ? sortBy[0].order : '',
      name: search.name,
      role: search.role,
      org: search.org?.join(','),
      exclude: props.exclude,
      tags: props.tags
    })
    items.value = res.records
    totalItems.value = res.total
  }
  loading.value = false
}

const loadRoles = async () => {
  roleItems.value = await RolesApi.list(props.roleKey)

  if (roleItems.value.length > 0) search.role = roleItems.value[0].key
}

watch(() => [props.roleKey], () => {
  options.value.page = 1
  loadRoles()
}, { immediate: true })

watch(() => [props.orgId], () => {
  options.value.page = 1
  search.org = [props.orgId]
}, { immediate: true })

onMounted(async () => {
  const res = await OrgsApi.oneById(accountsStore.account.orgs)
  if (res) {
    search.org = useOrgsExtractIds(res)
    search.orgItem = res
  }
})
</script>


<style scoped></style>
