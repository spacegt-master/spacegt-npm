<template>
    <v-btn class="text-none" prepend-icon="mdi-database-import-outline" rounded="lg" slim text="导入组织数据" variant="flat"
        @click="importXlsxDialog = true" />

    <v-dialog v-model="importXlsxDialog" max-width="600">
        <v-card rounded="lg" prepend-icon="mdi-database-import-outline" :loading="importXlsxLoading">
            <template #title>
                导入组织数据
            </template>
            <template #append>
                <v-btn prepend-icon="mdi-download" @click="download"> 下载模板 </v-btn>
            </template>
            <template #text>
                <section>
                    <h3 class="text-subtitle-1 font-weight-bold mb-4">
                        导入格式
                    </h3>
                </section>
                <v-table class="border mb-2">
                    <thead>
                        <tr>
                            <th class="text-left">
                                组织代码
                            </th>
                            <th class="text-left">
                                学校名称
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>北京易格xx大学</td>
                        </tr>
                    </tbody>
                </v-table>

                <v-file-upload v-model="importXlsxFile"></v-file-upload>
            </template>

            <v-divider />

            <template #actions>
                <v-spacer />

                <v-btn class="text-none" prepend-icon="mdi-check-all" color="surface-variant" text="确定导入组织数据"
                    variant="flat" :loading="importXlsxLoading" @click="importXlsx" />
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

const emit = defineEmits(['imported'])

const importXlsxFile = ref()
const importXlsxDialog = ref(false)
const importXlsxLoading = ref(false)

async function importXlsx() {
    importXlsxLoading.value = true
    const buffer = await importXlsxFile.value.arrayBuffer()
    /* parse workbook */
    const workbook = XLSX.read(buffer);
    /* get first worksheet */
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any;
    raw_data.shift()

    for (let index = 0; index < raw_data.length; index++) {
        const item = raw_data[index];
        await OrgsApi.edit({
            name: item[1],
            code: item[0],
            orderIndex: index
        })
    }

    importXlsxLoading.value = false
    importXlsxDialog.value = false
    emit('imported')
}

const download = () => {
    FileSaver.saveAs('/template/template-orgs.xlsx', 'template-orgs.xlsx')
}
</script>

<style scoped></style>