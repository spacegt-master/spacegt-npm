<template>
    <v-btn prepend-icon="mdi-account-multiple-outline" class="flex-1-1" min-height="48px" variant="tonal">
        <div v-if="items.length > 0">{{ names.join(" / ") }}</div>
        <div v-else>
            <slot>
                {{ $vuetify.locale.t('$vuetify.selectionUsersBtnComponent.text') }}
            </slot>
        </div>

        <SelectionUsers :multiple="multiple" :role-key="roleKey" :orgId="orgId" :exclude="exclude" :tags="tags"
            @confirm="handleConfirm">
        </SelectionUsers>

        <v-tooltip v-if="items.length > 0" activator="parent" location="top">
            {{ names.join(" / ") }}
        </v-tooltip>

        <template #append>
            <v-btn icon="mdi-close" variant="plain" size="small" density="comfortable" v-if="items.length > 0"
                @click.stop="$emit('clear')"></v-btn>
        </template>
    </v-btn>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['change', 'clear'])

const props = defineProps({
    items: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    orgId: { type: String, default: null },
    exclude: { type: String, default: null },
    tags: { type: String, default: null }
})

const names = computed(() => {
    return props.items.map(item => item.nickname);
})

const handleConfirm = async (value) => {
    emit('change', value)
}
</script>

<style scoped></style>
