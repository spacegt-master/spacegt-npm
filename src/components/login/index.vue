<template>
  <v-layout class="h-100">
    <slot></slot>
    <v-main class="h-100 ">
      <v-locale-provider :locale="locale || $vuetify.locale.current">
        <v-container class="h-100 " fluid>
          <v-row align="center" class="h-100" justify="center">
            <v-sheet class="flex-1-1 px-4" color="background" max-width="550">
              <v-img class="mx-auto mb-4" max-width="60" :src="logo" />

              <login-panel v-if="loginStore.tab == 'login'" @login="$emit('login', $event)"></login-panel>

              <sign-up-panel v-if="loginStore.tab == 'sign-up'"></sign-up-panel>

              <forgot-password-panel v-if="loginStore.tab == 'forgot-password'"></forgot-password-panel>
            </v-sheet>
          </v-row>
        </v-container>
      </v-locale-provider>
    </v-main>
  </v-layout>

</template>

<script setup>
import { useLoginStore } from '@/stores/login';

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

<style scoped></style>
