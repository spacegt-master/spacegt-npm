<template>
    <v-btn prepend-icon="mdi-bank" class="flex-1-1" min-height="48px" variant="tonal">
        <div v-if="org">{{ searchOrgItemNames.at(-1) }} </div>
        <div v-else> Selection Orgs</div>

        <SelectionOrgs @confirm="handleConfirm"></SelectionOrgs>

        <v-tooltip v-if="org" activator="parent" location="top">
            {{ searchOrgItemNames.join(' / ') }}
        </v-tooltip>

        <template #append>
            <v-btn icon="mdi-close" variant="plain" size="small" density="comfortable" v-if="org"
                @click.stop="$emit('clear')"></v-btn>
        </template>
    </v-btn>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['change', 'clear'])

const props = defineProps({
    org: Object
})

const searchOrgItemNames = computed(() => {
    if (props.org) {
        return orgNames(props.org).reverse()
    }
    return null;
})

const orgNames = (org) => {
    if (org.parent) return [org.name, ...orgNames(org.parent)]
    else return [org.name]
}

const handleConfirm = async (value) => {
    const extractIds = (org) => {
        let ids = []
        if (org?.id)
            ids.push(org.id)
        if (org?.parent)
            ids.push(...extractIds(org.parent))
        return ids
    }

    const ids = extractIds(value).reverse()

    value.id = ids

    emit('change', value)
}

</script>

<style lang="scss" scoped></style>