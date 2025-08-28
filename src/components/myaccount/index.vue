<template>
    <v-btn v-if="account" class="text-none me-2" height="48" icon slim>
        <v-avatar size="32">
            <v-img v-if="account.avatar" :src="account.avatar" width="32" height="32"></v-img>
            <v-icon v-else icon="mdi-account-circle" size="32"></v-icon>
        </v-avatar>

        <v-menu activator="parent" width="280">
            <v-card variant="text" class="rounded-lg border ">
                <v-responsive class="bg-surface-light rounded-0" style="height: 88px;"></v-responsive>
                <div class="text-center mt-n9 mb-4">
                    <v-avatar class="border-surface-light border-opacity-100" border="md" size="80">
                        <v-img v-if="account.avatar" :src="account.avatar" width="80" height="80"></v-img>
                        <v-icon v-else icon="mdi-account-circle" size="80"></v-icon>
                    </v-avatar>

                    <div class="text-h6 mt-3">{{ account.nickname }}</div>
                </div>
                <VDivider></VDivider>
                <v-list density="compact" nav>
                    <v-list-item v-if="enabledSettings" prepend-icon="mdi-account-cog" link
                        :title="$vuetify.locale.t('$vuetify.settings')" @click="toSettings" />
                    <v-list-item prepend-icon="mdi-logout" link :title="$vuetify.locale.t('$vuetify.logout')"
                        @click="logout" />
                </v-list>
            </v-card>
        </v-menu>
    </v-btn>
    <v-btn v-else class="me-2" append-icon="mdi-login" text="Login" @click="toLogin"></v-btn>
</template>

<script setup>
import { TokenApi } from '@/api/manage/accounts/token'
import { useAccountsStore } from '@/stores/accounts'
import { useAuthorizationStore } from '@/stores/authorization'
import { snackbar } from '@/stores/snackbar'
import { useSSOStore } from '@/stores/sso'
import { useWindowFocus } from '@vueuse/core'
import { watch } from 'vue'

const authorizationStore = useAuthorizationStore()
const accountsStore = useAccountsStore()
const SSOStore = useSSOStore()

const focused = useWindowFocus()

const props = defineProps({
    account: Object,
    proxy: String,
    enabledSettings: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['logout', 'settings', 'toLogin'])

watch(focused, async () => {
    if (focused.value) {
        const check = await TokenApi.validate(authorizationStore.token)

        if (!check) {
            snackbar({
                title: "凭证过期，请重新登录。",
                type: "warning",
            })
            logout()
        }
    }
})

const logout = () => {
    // 清除 token 以及用户信息
    authorizationStore.token = ""
    accountsStore.account = undefined
    accountsStore.authorities = []
    SSOStore.setToken('remove')

    setTimeout(() => {
        emit('logout')
    }, 200)
}

const toLogin = () => {
    emit('toLogin')
}

const toSettings = () => {
    if (props.proxy) {
        window.open(props.proxy)
    } else {
        emit('settings')
    }
}
</script>

<style scoped></style>