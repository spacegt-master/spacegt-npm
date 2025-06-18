<template>
  <v-container class="px-6 py-6" fluid>
    <v-list class="px-2" lines="two" variant="flat">
      <v-list-subheader v-if="!enableSelection">Update Orgs</v-list-subheader>

      <div class="text-caption ps-4" v-if="!enableSelection">
        Avoid excessive organizational structure and layers.
      </div>

      <div class="text-right" v-if="!enableSelection">
        <v-btn variant="text" prepend-icon="mdi-bank-plus" @click="newItem(defaultItem)">add root</v-btn>
      </div>

      <v-divider class="mt-6 mb-3" v-if="!enableSelection" />

      <div class="pa-3">
        <v-treeview v-model:activated="selected" :items="serverItems" item-value="id" :load-children="fetchOrgs"
          color="primary" density="compact" :activatable="enableSelection" :open-on-click="!enableSelection" transition>
          <template #title="{ item }">
            {{ item.name }} {{ item.childrenCount > 0 ? ` ( ${item.childrenCount} ) ` : `` }}
          </template>
          <template #append="{ item }" v-if="!enableSelection">
            <v-btn variant="text" min-width="30px" class="pa-2" @click.stop="newItem(item)">
              <v-icon icon="mdi-subdirectory-arrow-right"></v-icon>
              <span class="ml-1" v-show="!$vuetify.display.smAndDown">Add Child </span>
            </v-btn>
            <v-btn variant="text" min-width="30px" class="pa-2" @click.stop="updateNameItem(item)">
              <v-icon icon="mdi-rename"></v-icon>
              <span class="ml-1" v-show="!$vuetify.display.smAndDown">Rename</span>
            </v-btn>
            <v-btn variant="text" min-width="30px" class="pa-2" @click.stop="deleteItem(item)">
              <v-icon icon="mdi-delete"></v-icon>
              <span class="ml-1" v-show="!$vuetify.display.smAndDown">Delete</span>
            </v-btn>
          </template>
        </v-treeview>
      </div>
    </v-list>

    <v-dialog v-model="dialogDelete" contained max-width="500">
      <v-card rounded="lg" title="Delete Org">
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

    <v-dialog v-model="dialogUpdateName" max-width="500" scrollable>
      <v-card prepend-icon="mdi-pencil" title="Rename">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.name" label="Org Name" required></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeUpdateName"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="updateNameItemConfirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNew" max-width="500" scrollable>
      <v-card prepend-icon="mdi-pencil" title="Add Org">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.name" label="Name" required></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeNew"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="newItemConfirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { nextTick, onMounted, ref } from 'vue';
import { VTreeview } from 'vuetify/labs/VTreeview'

defineProps({
  enableSelection: { type: Boolean, default: false }
})

const selected = defineModel()

const serverItems = ref([])
const dialogDelete = ref(false)
const dialogUpdateName = ref(false)
const dialogNew = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({
  id: null,
  pid: null,
  name: '',
  admin: '',
  parent: null
})
const defaultItem = ref({
  id: null,
  pid: null,
  name: '',
  admin: '',
  parent: null
})

const deleteItem = (item) => {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true;
}
const updateNameItem = (item) => {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item)
  dialogUpdateName.value = true;
}
const newItem = (item) => {
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem.value)
  editedItem.value.pid = item.id
  editedItem.value.parent = item
  dialogNew.value = true;
}
const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1;
  })
}
const closeUpdateName = () => {
  dialogUpdateName.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1;
  })
}
const closeNew = () => {
  dialogNew.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1;
  })
}
const deleteItemConfirm = async () => {
  try {
    await OrgsApi.del(editedItem.value.id)
    if (editedItem.value.parent) {
      fetchOrgs(editedItem.value.parent)
    } else
      load()
  } catch (e) { /* empty */ }
  closeDelete()
}
const updateNameItemConfirm = async () => {
  await OrgsApi.edit({ id: editedItem.value.id, pid: editedItem.value.pid, name: editedItem.value.name })
  if (editedItem.value.parent) {
    fetchOrgs(editedItem.value.parent)
  } else
    load()
  closeUpdateName()
}
const newItemConfirm = async () => {
  await OrgsApi.edit({ id: editedItem.value.id, pid: editedItem.value.pid, name: editedItem.value.name })
  if (editedItem.value.parent.id) {
    fetchOrgs(editedItem.value.parent)
  } else
    load()
  closeNew()
}

const fetchOrgs = async (item) => {
  const res = await OrgsApi.listByPid(item.id, true)
  item.childrenCount = res.length
  if (res.length > 0) {
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    return item.children = res.map(child => {
      child.parent = item
      return wrap(child)
    })
  }
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  return item.children = null
}

const wrap = (item) => {
  return { ...item, children: (item.childrenCount > 0 ? [] : null) }
}

const load = async () => {
  const res = await OrgsApi.list(true)

  if (res.length === 0) {
    serverItems.value = []
    return
  }
  
  serverItems.value = res.map(item => wrap(item))
}

onMounted(() => {
  load()
})

</script>
<script>


</script>
