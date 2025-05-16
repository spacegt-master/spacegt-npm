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
                    <v-list-item prepend-icon="mdi-account-cog" link title="Settings" @click="toSettings" />
                    <v-list-item prepend-icon="mdi-logout" link title="Logout" to="/" @click="logout" />
                </v-list>
            </v-card>
        </v-menu>
    </v-btn>
    <v-btn v-else class="me-2" append-icon="mdi-login" text="Login" :to="login"> </v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'


const props = defineProps({
    account: Object,
    proxy: String,
    settings: {
        type: String,
        default() {
            return "/account/settings"
        }
    },
    login: {
        type: String,
        default() {
            return "/login"
        }
    }
})

const emit = defineEmits(['logout'])

const router = useRouter()

const logout = () => {
    emit('logout')
}

const toSettings = () => {
    if (props.proxy) {
        window.open(props.proxy)
    } else {
        router.push(props.settings)
    }
}
</script>

<style lang="scss" scoped></style>