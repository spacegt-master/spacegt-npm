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
    <v-btn v-else class="me-2" append-icon="mdi-login" text="Login" @click="toLogin"> </v-btn>

    <SSO v-if="sso" :service="sso" ref="ssoRef"></SSO>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const props = defineProps({
    account: Object,
    proxy: String,
    enabledSettings: {
        type: Boolean,
        default: true
    },
    sso: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['logout', 'settings', 'login'])

const ssoRef = ref()

const logout = () => {
    if (ssoRef.value)
        ssoRef.value.setToken('remove')

    setTimeout(() => {
        emit('logout')
    }, 200)
}

const toLogin = () => {
    emit('login')
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