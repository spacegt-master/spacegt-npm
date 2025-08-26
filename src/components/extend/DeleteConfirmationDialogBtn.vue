<template>
    <v-btn prepend-icon="mdi-delete">
        <slot>
            删除
        </slot>

        <delete-confirmation-dialog v-model="deleteItem" activator="parent" @delete="$emit('delete')"
            @close="$emit('close')"></delete-confirmation-dialog>
    </v-btn>
</template>

<script setup>
const deleteItem = defineModel()
const emit = defineEmits(['delete', 'close'])
</script>

<style lang="scss" scoped></style>