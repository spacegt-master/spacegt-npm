<template>
    <v-container class="px-6 py-6 orgs-manage" fluid>
        <v-list class="px-2" lines="two" variant="flat">

            <div class="px-4">
                <h3 class="text-subtitle-1 font-weight-bold mb-2 d-flex justify-space-between align-center">
                    {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.title') }}
                </h3>

                <div class="text-body-2 text-medium-emphasis mb-4 w-100 w-md-75">
                </div>
            </div>

            <v-divider class="mt-6 mb-3" />

            <v-form class="pa-3" v-if="org">
                <v-row dense>

                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.code') }}
                        </label>

                        <v-text-field v-model="org.code" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.codePlaceholder')" disabled
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.name') }}
                        </label>

                        <v-text-field v-model="org.name" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.namePlaceholder')" disabled
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.shortName') }}
                        </label>

                        <v-text-field v-model="orgDetails.shortName" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.shortNamePlaceholder')"
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.website') }}
                        </label>

                        <v-text-field v-model="orgDetails.website" density="comfortable" persistent-placeholder
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.websitePlaceholder')"
                            prefix="https://" variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.contact') }}
                        </label>

                        <v-text-field v-model="orgDetails.contact" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.contactPlaceholder')"
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.contactNumber') }}
                        </label>

                        <v-text-field v-model="orgDetails.contactNumber" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.contactNumberPlaceholder')"
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.email') }}
                        </label>

                        <v-text-field v-model="orgDetails.email" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.emailPlaceholder')"
                            type="email" variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.comment') }}
                        </label>

                        <v-text-field v-model="orgDetails.comment" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.commentPlaceholder')"
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12">
                        <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                            {{ $vuetify.locale.t('$vuetify.orgDetailsComponent.address') }}
                        </label>

                        <v-text-field v-model="orgDetails.address" density="comfortable"
                            :placeholder="$vuetify.locale.t('$vuetify.orgDetailsComponent.addressPlaceholder')"
                            variant="outlined" />
                    </v-col>
                    <v-col cols="12">
                        <v-btn class="ma-auto d-flex" color="primary" size="large"
                            :text="$vuetify.locale.t('$vuetify.save')" prepend-icon="mdi-content-save-check-outline"
                            @click="save" />
                    </v-col>
                </v-row>
            </v-form>

            <v-empty-state v-else class="mt-12"
                image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png">
                <template v-slot:title>
                    <div class="text-subtitle-2 mt-8">
                        暂无数据
                    </div>
                </template>

                <template v-slot:text>
                    <div class="text-caption">
                        请检查组织是否存在
                    </div>
                </template>
            </v-empty-state>
        </v-list>
    </v-container>
</template>

<script setup lang="ts">
import { OrgsApi } from '@/api/manage/accounts/orgs';
import { useAccountsStore } from '@/stores/accounts';
import { snackbar } from '@/stores/snackbar';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['onSave'])

const props = defineProps({
    component: {
        type: Boolean,
        default: false
    },
    orgId: String
})

const accountsStore = useAccountsStore() as any

const org = ref({
    id: '',
    name: '',
    code: '',
})

const orgDetails = ref({
    shortName: '',
    website: '',
    contact: '',
    contactNumber: '',
    email: '',
    comment: '',
    address: ''
})

async function save() {
    const res = await OrgsApi.detailsSave({
        id: org.value.id,
        ...orgDetails.value
    })

    if (res) {
        snackbar({
            title: 'Save successful',
            type: 'success'
        })
    } else {
        snackbar({
            title: 'Save unsuccessful',
            type: 'error'
        })
    }

    emit('onSave')
}

async function load() {
    console.log(props.orgId)
    const orgData = await OrgsApi.oneById(props.component ? props.orgId : accountsStore.account?.orgs) as any
    console.log(orgData)
    if (!orgData) return;

    org.value.id = orgData.id
    org.value.name = orgData.name
    org.value.code = orgData.code

    const orgDetailsData = await OrgsApi.detailsInfo(orgData.id) as any

    if (!orgDetailsData) return;

    orgDetails.value.shortName = orgDetailsData.shortName
    orgDetails.value.website = orgDetailsData.website
    orgDetails.value.contact = orgDetailsData.contact
    orgDetails.value.contactNumber = orgDetailsData.contactNumber
    orgDetails.value.email = orgDetailsData.email
    orgDetails.value.comment = orgDetailsData.comment
    orgDetails.value.address = orgDetailsData.address
}

onMounted(() => {
    load()
})
</script>

<style lang="scss" scoped></style>