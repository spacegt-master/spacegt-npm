<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">
      {{ $vuetify.locale.t('$vuetify.loginComponent.title') || $vuetify.locale.messages.en.login.title }}
    </div>
    <v-text-field v-model="loginStore.form.username" color="primary"
      :label="$vuetify.locale.t('$vuetify.loginComponent.username') || $vuetify.locale.messages.en.login.username"
      variant="outlined" @keyup.enter="login" />

    <v-text-field v-model="loginStore.form.password" color="primary"
      :label="$vuetify.locale.t('$vuetify.loginComponent.password') || $vuetify.locale.messages.en.login.password"
      variant="outlined" :type="loginStore.showPassword ? 'text' : 'password'"
      :append-inner-icon="loginStore.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="loginStore.showPassword = !loginStore.showPassword" @keyup.enter="login" />

    <div class="py-4">
      <div class="d-flex justify-space-between align-center">
        <v-checkbox-btn v-model="loginStore.remember" class="ms-n3" color="primary" label="Remember me">
          <template #label>
            <span class="text-body-2">
              {{ $vuetify.locale.t('$vuetify.loginComponent.remember') || $vuetify.locale.messages.en.login.remember }}
            </span>
          </template>
        </v-checkbox-btn>

        <v-btn class="text-decoration-none text-primary text-body-2 font-weight-medium" variant="text"
          @click="loginStore.tab = 'forgot-password'">
          {{ $vuetify.locale.t('$vuetify.loginComponent.forgotPassword') ||
            $vuetify.locale.messages.en.login.forgotPassword }}
        </v-btn>
      </div>
    </div>

    <v-btn block class="text-none mb-8" color="primary" flat rounded="lg"
      :text="$vuetify.locale.t('$vuetify.loginComponent.logIn') || $vuetify.locale.messages.en.login.logIn"
      :disabled="!(loginStore.form.username && loginStore.form.password)" @click="login" />

    <div class="text-center text-body-2 d-flex justify-center align-center ga-2">
      {{ $vuetify.locale.t('$vuetify.loginComponent.donHaveAccount') || $vuetify.locale.messages.en.login.donHaveAccount
      }}
      <v-btn class="text-body-2 text-caption text-decoration-none text-primary font-weight-medium" variant="text"
        @click="loginStore.tab = 'sign-up'">
        {{ $vuetify.locale.t('$vuetify.loginComponent.signUp') || $vuetify.locale.messages.en.login.signUp }}
      </v-btn>
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

<style scoped></style>
