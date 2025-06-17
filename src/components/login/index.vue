<template>
  <v-layout class="h-100">
    <slot></slot>
    <v-main class="h-100 ">
      <v-locale-provider :locale="locale || $vuetify.locale.current">
        <v-container class="h-100 " fluid>
          <v-row align="center" class="h-100" justify="center">
            <v-sheet class="flex-1-1 px-4" color="background" max-width="550">
              <v-img class="mx-auto mb-4" max-width="60" :src="logo" />

              <Login v-if="loginStore.tab == 'login'" @login="$emit('login', $event)"></Login>

              <SignUp v-if="loginStore.tab == 'sign-up'"></SignUp>

              <ForgotPassword v-if="loginStore.tab == 'forgot-password'"></ForgotPassword>
            </v-sheet>
          </v-row>
        </v-container>
      </v-locale-provider>
    </v-main>
  </v-layout>

</template>

<script setup>
import { useLoginStore } from '@/stores/login';
import Login from './login.vue';
import SignUp from './sign-up.vue';
import ForgotPassword from './forgot-password.vue';

const loginStore = useLoginStore()

const props = defineProps({
  logo: {
    type: String,
    default: '/logo.png'
  },
  locale: {
    type: String,
  }
})

</script>

<style lang="scss" scoped></style>
