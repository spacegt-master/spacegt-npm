<template>
  <v-layout class="h-100">
    <slot></slot>
    <v-main class="h-100 ">
      <v-locale-provider :locale="locale || $vuetify.locale.current">
        <v-container class="h-100 " fluid>
          <v-row align="center" class="h-100" justify="center">
            <v-sheet class="flex-1-1 px-4" color="background" max-width="550">
              <v-img class="mx-auto mb-4" max-width="60" :src="logo" />

              <login-panel v-if="loginStore.tab == 'login'" @login="handleLogin"></login-panel>

              <sign-up-panel v-if="loginStore.tab == 'sign-up'"></sign-up-panel>

              <forgot-password-panel v-if="loginStore.tab == 'forgot-password'"></forgot-password-panel>
            </v-sheet>
          </v-row>
        </v-container>
      </v-locale-provider>
    </v-main>

    <SSO v-if="sso" :service="sso" ref="ssoRef"></SSO>
  </v-layout>
</template>

<script setup>
import { UsersApi } from '@/api/manage/accounts/users';
import { useAuthorizationStore } from '@/stores/authorization';
import { useLoginStore } from '@/stores/login';
import { nextTick, ref } from 'vue';

const emit = defineEmits(['login'])

const loginStore = useLoginStore()

const authorizationStore = useAuthorizationStore()

const ssoRef = ref()

const props = defineProps({
  logo: {
    type: String,
    default: '/logo.png'
  },
  locale: {
    type: String,
  },
  sso: {
    type: [String, Boolean],
    default: false
  }
})

function handleLogin(event) {
  if (ssoRef.value)
    ssoRef.value.setToken(event.token)

  setTimeout(() => {
    emit('login', event)
  }, 200)
}

window.addEventListener("message", async (event) => {
  const receivedData = event.data;

  if (receivedData && receivedData.type === "token") {
    authorizationStore.token = receivedData.payload

    const Principal = await UsersApi.info()

    if (Principal) {
      emit('login', {
        code: 0,
        message: 'SSO Login Success',
        data: Principal,
        token: authorizationStore.token
      })
    }
  }
});
</script>

<style scoped></style>
