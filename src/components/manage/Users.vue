<template>
  <v-container class="px-6 py-6 mb-6" fluid>
    <v-list class="px-2" lines="two" variant="flat">
      <v-list-subheader>Users</v-list-subheader>

      <div class="text-caption ps-4">
        Ensure the security and privacy of user data.
      </div>

      <div class="text-right">
        <v-btn variant="text" prepend-icon="mdi-account-multiple-plus-outline" @click="addItem()">
          Add User
        </v-btn>
        <v-btn variant="text" prepend-icon="mdi-database-import">
          Batch Users
          <batch-users :role="search.role" @change="handleBatchUsersChange"></batch-users>
        </v-btn>
      </div>

      <v-divider class="mt-6 mb-3" />

      <div class="pa-3">
        <div class="d-flex">
          <selection-orgs-btn :org="search.orgItem"
            @change="(value) => { search.orgItem = value; search.org = value.id }"
            @clear="search.orgItem = null; search.org = null"></selection-orgs-btn>

          <v-select v-if="roleItems.length > 1" v-model="search.role" hide-details placeholder="筛选角色..."
            :items="roleItems" item-title="name" item-value="key" density="comfortable" class="ml-2"></v-select>

          <v-text-field hide-details v-model="search.name" placeholder="Search Name..." append-inner-icon="mdi-magnify"
            clearable density="comfortable" class="ml-2"></v-text-field>
        </div>

        <v-data-table-server v-model:options="options" v-model="selected" item-value="id" :show-select="enableSelection"
          :headers="headers" :items="items" :items-length="totalItems" :loading="loading"
          :search="`${search.name},${search.role},${search.org}`" :mobile="$vuetify.display.smAndDown"
          @update:options="loadItems">
          <template v-slot:top>
            <div class="d-flex">

            </div>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{ item }" v-if="!enableSelection">
            <VBtn icon="mdi-rename" variant="text" density="comfortable" size="small" @click="editItem(item)"></VBtn>
            <VBtn icon="mdi-lock-reset" variant="text" density="comfortable" size="small" @click="repwdItem(item)">
            </VBtn>
            <VBtn icon="mdi-delete" variant="text" density="comfortable" size="small" @click="deleteItem(item)"></VBtn>
          </template>
        </v-data-table-server>
      </div>
    </v-list>
    <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.display.smAndDown" scrollable>
      <v-card prepend-icon="mdi-pencil" :title="formTitle">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.username" label="Username" :disabled="!!editedItem.id"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.password" label="Password" :disabled="!!editedItem.id"
                  type="password"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.nickname" label="Nickname"></v-text-field>
              </v-col>
              <v-col cols="12">
                <selection-orgs-btn class="mb-4" width="100%" min-height="50" :org="editedItem.orgItem"
                  @change="(value) => { editedItem.orgItem = value; editedItem.orgs = value.id.join(',') }"
                  @clear="editedItem.orgItem = null; editedItem.orgs = null"></selection-orgs-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.avatar" label="Avatar (Url)"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="close"></v-btn>
          <v-btn text="Save" color="primary" variant="tonal" @click="save"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" contained max-width="500">
      <v-card rounded="lg" title="Delete User">
        <template #prepend>
          <v-avatar color="error" icon="mdi-alert-outline" variant="tonal" />
        </template>

        <template #text>
          <div class="mb-4 text-body-2 text-medium-emphasis">
            Warning: You are about to perform irreversible data deletion. The selected data is permanently deleted and
            cannot be recovered. Carefully review the data you are deleting and confirm that you understand the
            consequences of this action. Are you sure you want to continue?
          </div>
        </template>

        <v-divider />

        <template #actions>
          <v-spacer />

          <v-btn border class="text-none" color="surface" text="Cancel" variant="flat" @click="closeDelete" />

          <v-btn class="text-none" color="error" text="Delete" variant="flat" @click="deleteItemConfirm" />
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRepwd" max-width="600">
      <v-card prepend-icon="mdi-lock-reset" title="Reset Password">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.password" label="New Password" autofocus></v-text-field>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">* Be careful to reset the password, you will not be able to
            login
            with the original password.</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeRepwd"></v-btn>

          <v-btn text="Save" variant="tonal" color="primary" @click="repwdConfirm"></v-btn>
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

const selected = defineModel()
const props = defineProps({
  rids: { type: [String, Number, Array] },
  enableSelection: { type: Boolean, default: false }
})
const search = reactive({ name: '', role: null, org: null, orgItem: null })
const options = ref({ page: 1, itemsPerPage: 5 })
const headers = ref([
  { title: 'Username', key: 'username' },
  { title: 'Nickname', key: 'nickname' },
  { title: 'Phone', key: 'phone', },
  { title: 'Email', key: 'email', },
  // { title: '组织', key: 'orgName', sortable: false, },
  // { title: '最近登录时间', key: 'lastLoginTime', },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
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
const formTitle = computed(() => editedIndex.value === -1 ? 'Add User' : 'Update User')

watch(() => [props.rids], () => {
  options.value.page = 1

  loadRoles()
})

const handleBatchUsersChange = () => {
  loadItems(options.value)
}

const addItem = () => {
  editedItem.value = Object.assign({}, defaultItem.value)

  editedIndex.value = -1;

  dialog.value = true
}

const editItem = async (item) => {
  editedIndex.value = items.value.indexOf(item)

  editedItem.value = Object.assign({}, item)

  editedItem.value.orgItem = await OrgsApi.oneById(item.orgs)

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

const save = async () => {
  editedItem.value.roles = search.role

  editedItem.value.orgItem = null

  await UsersApi.edit(editedItem.value)

  loadItems(options.value)

  close()
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
      org: search.org?.join(',')
    })
    items.value = res.records
    totalItems.value = res.total
  }
  loading.value = false
}

const loadRoles = async () => {
  roleItems.value = await RolesApi.list(props.rids)

  if (roleItems.value.length > 0) search.role = roleItems.value[0].key
}

onMounted(() => {
  loadRoles()
})

</script>


<style scoped></style>
