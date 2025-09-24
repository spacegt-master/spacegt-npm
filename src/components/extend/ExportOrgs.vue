<template>
    <v-btn class="text-none" prepend-icon="mdi-database-export-outline" rounded="lg" slim
        :text="$vuetify.locale.t('$vuetify.org.manage.exportOrgs')" variant="flat" @click="exportXlsx" />
</template>

<script setup lang="ts">
import { OrgsApi } from '@/api/manage/accounts/orgs';
import * as XLSX from 'xlsx';

const wrap = (item: any) => {
    return {
        ...item,
        children: (item.childrenCount > 0 ? [] : null),
        disabled: !item.enabled
    }
}

const fetchOrgs = async (item: any) => {
    const res = await OrgsApi.listByPid(item.id, true) as any
    item.childrenCount = res.length
    if (res.length > 0) {
        item.children = res.map((child: any) => {
            child.parent = item
            return wrap(child)
        })

        for (let index = 0; index < item.children.length; index++) {
            const child = item.children[index];
            await fetchOrgs(child)
        }
    } else {
        item.children = null
    }
}

function toRows(items: any[]) {
    const rows: any[] = []

    items.forEach(item => {
        rows.push([`${item.name}${item.code ? '|' + item.code : ''}`])

        if (item.childrenCount > 0) {
            const children = toRows(item.children)

            children.forEach(child => {
                rows.push([`${item.name}${item.code ? '|' + item.code : ''}`, ...child])
            })
        }
    })

    return rows;
}

async function exportXlsx() {
    const items = await OrgsApi.list(true) as any

    console.log(items)

    for (let index = 0; index < items.length; index++) {
        const item = items[index];

        await fetchOrgs(item)
    }

    const rows = toRows(items)

    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [["组织结构"]], { origin: "A1" });

    const columnSize = rows.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue.length), 1)

    worksheet["!cols"] = Array.from({ length: columnSize }, () => ({ wch: 25 }))

    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, "Export Orgs Data.xlsx", { compression: true });
}
</script>

<style scoped></style>