<template>
  <v-layout class="h-100">
    <slot></slot>
    <v-main class="h-100 ">
      <v-container class="h-100 " fluid>
        <v-row align="center" class="h-100" justify="center">
          <v-sheet class="flex-1-1 px-4" color="background" max-width="500">
            <v-img class="mx-auto mb-4" max-width="60" :src="logo" />

            <Login v-if="loginStore.tab == 'login'" @login="$emit('login', $event)"></Login>

            <SignUp v-if="loginStore.tab == 'sign-up'"></SignUp>

            <ForgotPassword v-if="loginStore.tab == 'forgot-password'"></ForgotPassword>
          </v-sheet>
        </v-row>
      </v-container>
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
  }
})
</script>

<style lang="scss" scoped></style>
