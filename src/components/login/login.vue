<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">Log into your account</div>

    <v-text-field v-model="loginStore.form.username" color="primary" label="Username" variant="outlined" />

    <v-text-field v-model="loginStore.form.password" color="primary" label="Password" variant="outlined"
      :type="loginStore.showPassword ? 'text' : 'password'"
      :append-inner-icon="loginStore.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="loginStore.showPassword = !loginStore.showPassword" @keyup.enter="login" />

    <div class="py-4">
      <div class="d-flex justify-space-between align-center">
        <v-checkbox-btn v-model="loginStore.remember" class="ms-n3" color="primary" label="Remember me">
          <template #label>
            <span class="text-body-2">Remember me</span>
          </template>
        </v-checkbox-btn>

        <v-btn class="text-decoration-none text-primary text-body-2 font-weight-medium" variant="text"
          @click="loginStore.tab = 'forgot-password'">
          Forgot password?</v-btn>
      </div>
    </div>

    <v-btn block class="text-none mb-8" color="primary" flat rounded="lg" text="Log In"
      :disabled="!(loginStore.form.username && loginStore.form.password)" @click="login" />

    <div class="text-center text-body-2 ">
      Don't have an account?
      <v-btn class="text-body-2 text-caption text-decoration-none text-primary font-weight-medium" variant="text"
        @click="loginStore.tab = 'sign-up'">Sign
        up</v-btn>
    </div>
  </div>
</template>

<script setup>
import { LoginApi } from '@/api/login';
import { useLoginStore } from '../../stores/login';

const loginStore = useLoginStore()
const emit = defineEmits(['login'])

const login = async () => {
  const res = await LoginApi.login(loginStore.form.username, loginStore.form.password);
  emit('login', res)
};

</script>

<style lang="scss" scoped></style>
