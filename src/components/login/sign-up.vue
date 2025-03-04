<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">Sign up your account</div>

    <v-text-field v-model="loginStore.form.username" color="primary" label="Username" variant="outlined" />

    <v-text-field v-model="loginStore.form.password" color="primary" label="Password" variant="outlined"
      :type="loginStore.showPassword ? 'text' : 'password'"
      :append-inner-icon="loginStore.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="loginStore.showPassword = !loginStore.showPassword" />

    <v-btn block class="text-none mb-8 mt-4" color="primary" flat rounded="lg" text="Sign up"
      @click="loginStore.tab = 'login'" />

    <div class="text-center text-body-2 ">
      Have an account?
      <v-btn class="text-body-2 text-caption text-decoration-none text-primary font-weight-medium" variant="text"
        @click="loginStore.tab = 'login'">Login</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '../../stores/login';

const loginStore = useLoginStore()
</script>

<style lang="scss" scoped></style>
