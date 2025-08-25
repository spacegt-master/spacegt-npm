<template>
  <v-dialog v-model="dialog" activator="parent" max-width="1100" scrollable>
    <template v-slot:default>
      <v-card prepend-icon="mdi-import" :title="$vuetify.locale.t('$vuetify.batchUsersComponent.title')">
        <template #append>
          <v-btn prepend-icon="mdi-download" @click="download">{{
            $vuetify.locale.t('$vuetify.batchUsersComponent.downloadTemplate') }}</v-btn>
        </template>
        <v-divider></v-divider>

        <v-file-upload v-model="file" accept=".xlsx" :density="file ? 'compact' : 'default'"
          @update:model-value="handleFileUpdate"></v-file-upload>

        <v-card-text v-if="file" class="px-4 d-flex">
          <v-data-table-virtual v-model="selected" :headers="headers" :items="items" fixed-header item-value="index"
            show-select height="100%" :loading="saving">
            <template v-slot:item.orgs="{ item }">
              {{ item.orgs?.name ?? "<无组织或组织代码错误>" }}
            </template>

            <template v-slot:item.status="{ item }">
              <div v-if="item.status == 0"> - </div>
              <div v-if="item.status == 1">
                {{ $vuetify.locale.t('$vuetify.batchUsersComponent.status.loading') }}
              </div>
              <div v-if="item.status == 2" class="text-red d-flex align-center justify-end">
                {{ $vuetify.locale.t('$vuetify.batchUsersComponent.status.failure') }}

                <v-tooltip v-if="item.message" :text="item.message">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" icon="mdi-help-circle-outline" size="20px" class="ml-2"></v-icon>
                  </template>
                </v-tooltip>
              </div>
              <div v-if="item.status == 3" class="text-teal">
                {{ $vuetify.locale.t('$vuetify.batchUsersComponent.status.success') }}
              </div>
            </template>
          </v-data-table-virtual>
        </v-card-text>

        <div v-show="file && optionOrg" class="text-subtitle-2 font-weight-light mb-3 ml-6">
          tip: 导入的用户以表格中填入的代码为准，若表格中未填写组织代码，则需要手动选择组织添加至系统。
        </div>
        <selection-orgs-btn v-show="file && optionOrg" :org="org" class="mb-4" width="100%" min-height="50"
          @change="(value) => { org = value }" @clear="org = null"></selection-orgs-btn>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$vuetify.locale.t('$vuetify.close')" @click="close()"></v-btn>

          <v-btn :text="$vuetify.locale.t('$vuetify.import')" color="surface-variant" variant="flat"
            :disabled="(optionOrg && !org) || selected.length == 0" :loading="saving" @click="save()"></v-btn>
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
import { useLocale } from 'vuetify'
import { OrgsApi } from '@/api/manage/accounts/orgs';

const { t } = useLocale()

const props = defineProps({
  role: String
})
const emit = defineEmits(['change'])

const dialog = ref(false)
const file = ref()
const org = ref()
const optionOrg = ref(false)

const headers = ref([
  { title: t("$vuetify.batchUsersComponent.headers.nickname"), align: 'start', key: 'nickname' },
  { title: t("$vuetify.batchUsersComponent.headers.username"), align: 'start', key: 'username' },
  { title: t("$vuetify.batchUsersComponent.headers.password"), align: 'start', key: 'password' },
  { title: t("$vuetify.batchUsersComponent.headers.phone"), align: 'start', key: 'phone' },
  { title: t("$vuetify.batchUsersComponent.headers.email"), align: 'start', key: 'email' },
  { title: t("$vuetify.batchUsersComponent.headers.org"), align: 'start', key: 'orgs' },
  { title: t("$vuetify.batchUsersComponent.headers.status"), align: 'end', key: 'status' },
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

    // 获取所有的组织代码
    const codes = data.map(item => item['组织代码']).filter(item => item)
    const uniqueCodes = [...new Set(codes)];

    const orgs = uniqueCodes.length > 0 ? await OrgsApi.listByCodes(uniqueCodes.join(',')) : null

    data.forEach((item, index) => {
      items.value.push({
        index,
        nickname: item['*姓名'],
        username: item['*账号'],
        password: item['*密码'],
        phone: item['手机号'],
        email: item['邮箱'],
        orgs: orgs ? orgs.find(org => org.code == item['组织代码']) : null,
        status: 0,
        message: null
      })
      selected.value.push(index)
    })

    optionOrg.value = items.value.some(item => item.orgs == null)
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

  const users = selected.value.map(index => items.value[index])
    .map(user => {
      return {
        ...user,
        orgs: getOrgCompleteID(user.orgs)
      }
    })

  const results = await UsersApi.batch({
    orgs: org.value?.id?.join(','),
    roles: props.role,
    users
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


function getOrgCompleteID(orgs) {
  if (!orgs || !orgs.id) return null;

  if (orgs.parent) {
    return [getOrgCompleteID(orgs.parent), orgs.id].join(',')
  }
  return orgs.id
}
</script>

<style scoped></style>
