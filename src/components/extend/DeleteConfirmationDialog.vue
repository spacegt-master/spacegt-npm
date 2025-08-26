<template>
    <v-dialog v-model="dialogDelete" max-width="500">
        <v-card rounded="lg" :title="title">

            <template #prepend>
                <v-avatar color="error" icon="mdi-alert-outline" variant="tonal" />
            </template>

            <template #text>
                <div class="mb-4 text-body-2 text-medium-emphasis">
                    {{ subtitle }}
                </div>
            </template>

            <v-divider class="border-opacity-25" />

            <template #actions>
                <v-spacer />

                <v-btn border class="text-none" color="surface" text="取消" variant="flat" @click="closeDelete" />

                <v-btn class="text-none" color="error" text="删除" variant="flat" @click="deleteItemConfirm" />
            </template>
        </v-card>
    </v-dialog>

</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

defineProps({
    title: {
        type: String,
        default: '删除数据'
    },
    subtitle: {
        type: String,
        default: '警告：您即将执行不可逆的数据删除操作。所选数据将被永久删除且无法恢复。请仔细查看您要删除的数据，并确认您了解此操作的后果。您确定要继续吗？'
    },
})

const dialogDelete = ref(false)

const deleteItem = defineModel()

watch(deleteItem, () => {
    if (deleteItem.value) dialogDelete.value = true
    else dialogDelete.value = false
})

watch(dialogDelete, () => {
    if (dialogDelete.value == false) deleteItem.value = null
})

const emit = defineEmits(['close', 'delete'])

const closeDelete = () => {
    emit("close")
    nextTick(() => {
        dialogDelete.value = false;
    })
}

const deleteItemConfirm = async () => {
    emit("delete", deleteItem.value)
    closeDelete()
}
</script>

<style scoped></style>