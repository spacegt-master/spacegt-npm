<template>
  <v-layout class="h-100">
    <slot></slot>
    <v-main class="h-100 ">
      <v-locale-provider :locale="locale || $vuetify.locale.current">
        <v-container class="h-100 " fluid>
          <v-row align="center" class="h-100" justify="center">
            <v-sheet class="flex-1-1 px-4" color="background" max-width="550">
              <v-img class="mx-auto mb-4" max-width="60" :src="logo" />

              <login-panel v-if="loginStore.tab == 'login'" :title="title" :sign-up="signUp"
                @login="handleLogin"></login-panel>

              <sign-up-panel v-if="loginStore.tab == 'sign-up'" :title="title"></sign-up-panel>

              <forgot-password-panel v-if="loginStore.tab == 'forgot-password'" :title="title"></forgot-password-panel>
            </v-sheet>
          </v-row>
        </v-container>
      </v-locale-provider>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useAccountsStore } from '@/stores/accounts';
import { useAuthorizationStore } from '@/stores/authorization';
import { useLoginStore } from '@/stores/login';
import { useSSOStore } from '@/stores/sso';
import { onMounted } from 'vue';

const emit = defineEmits(['login'])

const loginStore = useLoginStore()

const authorizationStore = useAuthorizationStore()
const accountsStore = useAccountsStore()
const SSOStore = useSSOStore()

const props = defineProps({
  logo: {
    type: String,
    default: '/logo.png'
  },
  locale: {
    type: String,
  },
  title: {
    type: String
  },
  signUp: {
    type: Boolean,
    default: true
  }
})

function handleLogin(event) {
  if (event.code === 0) {
    authorizationStore.token = event.token
    accountsStore.account = event.data
    accountsStore.authorities = event.data.authorities
    SSOStore.setToken(event.token)
    emit('login', event)
  } else {
    snackbar({
      title: event.message,
      type: 'warning',
    })
  }
}

onMounted(() => {
  authorizationStore.token = ""
  accountsStore.account = undefined
  accountsStore.authorities = []
})
</script>

<style scoped></style>
