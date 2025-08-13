<template>
  <v-container class="px-6 py-6 orgs-manage" fluid>
    <v-list class="px-2" lines="two" variant="flat">

      <div class="px-4" v-if="!enableSelection">
        <h3 class="text-subtitle-1 font-weight-bold mb-2 d-flex justify-space-between align-center">
          {{ $vuetify.locale.t('$vuetify.org.manage.title') }}

          <div class="d-flex ga-2">
            <v-btn variant="text" prepend-icon="mdi-bank-plus" @click="newItem(defaultItem)">
              {{ $vuetify.locale.t('$vuetify.org.manage.add') }}
            </v-btn>

            <export-orgs></export-orgs>
            <import-orgs @imported="load"></import-orgs>
          </div>
        </h3>

        <div class="text-body-2 text-medium-emphasis mb-4 w-100 w-md-75">
          {{ $vuetify.locale.t('$vuetify.org.manage.subtitle') }}
        </div>
      </div>

      <v-divider class="mt-6 mb-3" v-if="!enableSelection" />

      <div class="pa-3">
        <v-skeleton-loader :loading="loading" type="table">
          <v-responsive>
            <v-treeview v-model:activated="selected" :items="serverItems" item-value="id" :load-children="fetchOrgs"
              color="primary" density="compact" :activatable="enableSelection" :open-on-click="!enableSelection"
              transition item-props>
              <template #title="{ item }">
                <v-chip class="mr-2">组织代码 : {{ item.code ? item.code : '暂无' }} </v-chip>

                {{ item.name }}

                <v-badge v-if="item.childrenCount > 0" class="ml-2" color="info" :content="item.childrenCount"
                  inline></v-badge>
              </template>
              <template #append="{ item, isFirst, isLast }" v-if="!enableSelection">
                <v-btn variant="text" density="comfortable" :disabled="isFirst" icon="mdi-arrow-up-thick"
                  @click.stop="move(item, 'up')"></v-btn>
                <v-btn variant="text" density="comfortable" :disabled="isLast" icon="mdi-arrow-down-thick"
                  @click.stop="move(item, 'down')"></v-btn>

                <v-btn variant="text" min-width="30px" class="pa-2 ml-4" @click.stop="newItem(item)">
                  <v-icon icon="mdi-subdirectory-arrow-right"></v-icon>
                  <span class="ml-1" v-show="!$vuetify.display.smAndDown">
                    {{ $vuetify.locale.t('$vuetify.org.manage.addChild') }}
                  </span>
                </v-btn>
                <v-btn variant="text" min-width="30px" class="pa-2" @click.stop="updateNameItem(item)">
                  <v-icon icon="mdi-rename"></v-icon>
                  <span class="ml-1" v-show="!$vuetify.display.smAndDown">
                    {{ $vuetify.locale.t('$vuetify.edit') }}
                  </span>
                </v-btn>

                <review-orgs-btn :orgId="item.id">
                  <template #default="{ activatorProps }">
                    <v-btn v-bind="activatorProps" variant="text" min-width="30px" class="pa-2">
                      <v-icon icon="mdi-card-account-mail-outline"></v-icon>
                      <span class="ml-1" v-show="!$vuetify.display.smAndDown">
                        {{ $vuetify.locale.t('$vuetify.org.manage.reivew') }}
                      </span>
                    </v-btn>
                  </template>
                </review-orgs-btn>

                <v-btn style="pointer-events: all; opacity: 1;" variant="text" min-width="30px" class="pa-2"
                  @click.stop="switchStatus(item)">
                  <v-icon v-if="item.enabled" icon="mdi-toggle-switch-outline"></v-icon>
                  <v-icon v-else icon="mdi-toggle-switch-off-outline"></v-icon>
                  <span class="ml-1" v-show="!$vuetify.display.smAndDown">
                    {{ item.enabled ? $vuetify.locale.t('$vuetify.disabled') : $vuetify.locale.t('$vuetify.enabled') }}
                  </span>
                </v-btn>

                <v-btn variant="text" min-width="30px" class="pa-2" @click.stop="deleteItem(item)">
                  <v-icon icon="mdi-delete"></v-icon>
                  <span class="ml-1" v-show="!$vuetify.display.smAndDown">
                    {{ $vuetify.locale.t('$vuetify.delete') }}
                  </span>
                </v-btn>
              </template>
            </v-treeview>
          </v-responsive>
        </v-skeleton-loader>
      </div>
    </v-list>

    <v-dialog v-model="dialogDelete" contained max-width="500">
      <v-card rounded="lg" :title="$vuetify.locale.t('$vuetify.org.manage.deleteTitle')">
        <template #prepend>
          <v-avatar color="error" icon="mdi-alert-outline" variant="tonal" />
        </template>

        <template #text>
          <div class="mb-4 text-body-2 text-medium-emphasis">
            {{ $vuetify.locale.t('$vuetify.org.manage.deleteText') }}
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

    <v-dialog v-model="dialogUpdateName" max-width="500" scrollable>
      <v-card prepend-icon="mdi-pencil" :title="$vuetify.locale.t('$vuetify.rename')">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.name" :label="$vuetify.locale.t('$vuetify.org.manage.orgName')"
                required></v-text-field>
              <v-text-field v-model="editedItem.code" :label="$vuetify.locale.t('$vuetify.org.manage.organizationCode')"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="$vuetify.locale.t('$vuetify.close')" variant="plain" @click="closeUpdateName"></v-btn>
          <v-btn color="primary" :text="$vuetify.locale.t('$vuetify.save')" variant="tonal"
            @click="updateNameItemConfirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNew" max-width="500" scrollable>
      <v-card prepend-icon="mdi-pencil" :title="$vuetify.locale.t('$vuetify.org.manage.addOrg')">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.name" :label="$vuetify.locale.t('$vuetify.org.manage.orgName')"
                required></v-text-field>
              <v-text-field v-model="editedItem.code" :label="$vuetify.locale.t('$vuetify.org.manage.organizationCode')"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="$vuetify.locale.t('$vuetify.close')" variant="plain" @click="closeNew"></v-btn>
          <v-btn color="primary" :text="$vuetify.locale.t('$vuetify.save')" variant="tonal"
            @click="newItemConfirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { nextTick, onMounted, ref } from 'vue';

defineProps({
  enableSelection: { type: Boolean, default: false }
})

const selected = defineModel()
const loading = ref(false)

const serverItems = ref([])
const dialogDelete = ref(false)
const dialogUpdateName = ref(false)
const dialogNew = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({
  id: null,
  pid: null,
  name: '',
  code: '',
  admin: '',
  parent: null
})
const defaultItem = ref({
  id: null,
  pid: null,
  name: '',
  code: '',
  admin: '',
  parent: null
})

function findItemBefore(item) {
  if (item.parent) {
    return item.parent.children
      .find((_, i, all) => all[i + 1]?.id === item.id)
  } else {
    return serverItems.value
      .find((_, i, all) => all[i + 1]?.id === item.id)
  }
}
function findItemAfter(item) {
  if (item.parent) {
    return item.parent.children
      .find((_, i, all) => all[i - 1]?.id === item.id)
  } else {
    return serverItems.value
      .find((_, i, all) => all[i - 1]?.id === item.id)
  }
}
function detach(item) {
  if (item.parent) {
    const parent = item.parent
    parent.children.splice(parent.children.indexOf(item), 1)
    if (parent.children.length === 0) parent.children = undefined
  } else {
    serverItems.value.splice(serverItems.value.indexOf(item), 1)
  }
}
function injectNextTo(item, target, after = true) {
  detach(item)

  if (item.parent) {
    const targetParent = item.parent
    targetParent.children.splice(targetParent.children.indexOf(target) + (after ? 1 : 0), 0, item)
  } else {
    serverItems.value.splice(serverItems.value.indexOf(target) + (after ? 1 : 0), 0, item)
  }
}
function move(item, direction) {
  switch (direction) {
    case 'up':
      injectNextTo(item, findItemBefore(item), false)
      break
    case 'down':
      injectNextTo(item, findItemAfter(item))
      break
  }

  if (item.parent) {
    ordering(item.parent.children)
  } else {
    ordering(serverItems.value)
  }
}

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
  console.log(editedItem.value)
  await OrgsApi.edit({ id: editedItem.value.id, pid: editedItem.value.pid, name: editedItem.value.name, code: editedItem.value.code, enabled: editedItem.value.enabled })
  if (editedItem.value.parent) {
    fetchOrgs(editedItem.value.parent)
  } else
    load()
  closeUpdateName()
}
const newItemConfirm = async () => {
  await OrgsApi.edit({ id: editedItem.value.id, pid: editedItem.value.pid, name: editedItem.value.name, code: editedItem.value.code })
  if (editedItem.value.parent.id) {
    fetchOrgs(editedItem.value.parent)
  } else
    load()
  closeNew()
}
async function switchStatus(item) {
  item.enabled = !item.enabled

  item.disabled = !item.enabled

  await OrgsApi.switchStatus(item.id, item.enabled)
}

const fetchOrgs = async (item) => {
  const res = await OrgsApi.listByPid(item.id, true)
  item.childrenCount = res.length
  if (res.length > 0) {
    return item.children = res.map(child => {
      child.parent = item
      return wrap(child)
    })
  }
  return item.children = null
}

const wrap = (item) => {
  return {
    ...item,
    children: (item.childrenCount > 0 ? [] : null),
    disabled: !item.enabled
  }
}

const ordering = async (items) => {
  await OrgsApi.ordering(items.map(item => item.id).join(','))
}

const load = async () => {
  loading.value = true

  const res = await OrgsApi.list(true)

  if (res.length === 0) {
    serverItems.value = []
    return
  }

  serverItems.value = res.map(item => wrap(item))

  loading.value = false
}

onMounted(() => {
  load()
})

</script>
<style>
.orgs-manage .v-list-item--disabled {
  opacity: 1 !important;
}

.orgs-manage .v-list-item--disabled .v-list-item__content {
  opacity: 0.6;
}

.orgs-manage .v-list-item--disabled .v-btn {
  opacity: 0.6;
}
</style>