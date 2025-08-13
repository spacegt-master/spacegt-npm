<template>

    <v-dialog max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
            <slot :activatorProps="activatorProps">
            </slot>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <OrgsDetails component :orgId="orgId" @on-save="isActive.value = false"></OrgsDetails>
            </v-card>
        </template>
    </v-dialog>

</template>

<script setup lang="ts">
import OrgsDetails from '../manage/OrgsDetails.vue';

defineProps({
    orgId: String
})
</script>

<style scoped></style>