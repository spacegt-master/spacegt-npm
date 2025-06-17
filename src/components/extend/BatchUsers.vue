<template>
  <v-dialog v-model="dialog" activator="parent" max-width="1000" scrollable>
    <template v-slot:default>
      <v-card prepend-icon="mdi-import" title="Batch Users Import">
        <template #append>
          <v-btn prepend-icon="mdi-download" @click="download">Download The Template</v-btn>
        </template>
        <v-divider></v-divider>

        <v-file-upload v-model="file" accept=".xlsx" :density="file ? 'compact' : 'default'"
          @update:model-value="handleFileUpdate"></v-file-upload>

        <v-card-text v-if="file" class="px-4 d-flex">
          <v-data-table-virtual v-model="selected" :headers="headers" :items="items" fixed-header item-value="index"
            show-select height="100%" :loading="saving">
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.status="{ item }">
              <div v-show="item.status == 0"> - </div>
              <div v-show="item.status == 1"> Loading </div>
              <div v-show="item.status == 2" class="text-red"> Failure
                <v-tooltip v-if="item.message" :text="item.message">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" icon="mdi-help-circle-outline" size="20px" class="ml-2"></v-icon>
                  </template>
                </v-tooltip>
              </div>
              <div v-show="item.status == 3" class="text-teal"> Success </div>
            </template>
          </v-data-table-virtual>
        </v-card-text>

        <orgs-btn v-show="file" :org="org" class="mb-4" width="100%" min-height="50"
          @change="(value) => { org = value }" @clear="org = null"></orgs-btn>

        <v-divider></v-divider>

        <v-card-actions>

          <v-spacer></v-spacer>

          <v-btn text="Close" @click="close()"></v-btn>

          <v-btn text="Import" color="surface-variant" variant="flat" :disabled="!org || selected.length == 0"
            :loading="saving" @click="save()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { read, utils } from "xlsx";
import FileSaver from 'file-saver';
import { nextTick, ref } from 'vue';
import { UsersApi } from '@/api/manage/accounts/users';

const props = defineProps({
  role: String
})
const emit = defineEmits(['change'])

const dialog = ref(false)
const file = ref()
const org = ref()

const headers = ref([
  { title: 'Nickname', align: 'start', key: 'nickname' },
  { title: 'Username', align: 'start', key: 'username' },
  { title: 'Password', align: 'start', key: 'password' },
  { title: 'Phone', align: 'start', key: 'phone' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Status', align: 'end', key: 'status' },
])
const items = ref([])
const selected = ref([])

const saving = ref(false)

const handleFileUpdate = async (file) => {
  items.value = []
  selected.value = []

  if (file) {
    const buf = await file.arrayBuffer()
    const workbook = read(buf);
    const worksheet = workbook.Sheets.Sheet1

    var data = utils.sheet_to_json(worksheet);

    data.forEach((item, index) => {
      items.value.push({
        index,
        nickname: item['姓名'],
        username: item['账号'],
        password: item['密码'],
        phone: item['手机号'],
        email: item['邮箱'],
        status: 0,
        message: null
      })
      selected.value.push(index)
    })
  }
}

const download = () => {
  FileSaver.saveAs('/template/template-users.xlsx', 'template-users.xlsx')
}

const close = () => {
  dialog.value = false

  nextTick(() => {
    file.value = null
    items.value = []
  })
}

const save = async () => {
  saving.value = true
  const results = await UsersApi.batch({
    orgs: org.value.id?.join(','),
    roles: props.role,
    users: selected.value.map(index => items.value[index])
  })
  if (results) {
    results.forEach(result => {
      items.value[result.index].status = result.status
      items.value[result.index].message = result.message
    })
  }
  setTimeout(() => saving.value = false, 200)
  emit('change')
}
</script>

<style lang="scss" scoped></style>
