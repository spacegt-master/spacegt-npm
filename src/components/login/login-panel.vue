<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium " style="position: relative; height: 40px;">
      <div style=" flex-flow: nowrap; width:800px; position: absolute; transform: translate(-50%, 0); left: 50%;">
        {{ title || $vuetify.locale.t('$vuetify.loginComponent.title') }}</div>
    </div>
    <v-text-field v-model="loginStore.form.username" color="primary"
      :label="$vuetify.locale.t('$vuetify.loginComponent.username')" variant="outlined" @keyup.enter="login" />

    <v-text-field v-model="loginStore.form.password" color="primary"
      :label="$vuetify.locale.t('$vuetify.loginComponent.password')" variant="outlined"
      :type="loginStore.showPassword ? 'text' : 'password'"
      :append-inner-icon="loginStore.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="loginStore.showPassword = !loginStore.showPassword" @keyup.enter="login" />

    <v-btn v-if="sliderCaptcha" width="100%" prepend-icon="mdi-shield-check" variants="tonal" size="large"
      :disabled="sliderCaptchaSuccess" :color="sliderCaptchaSuccess ? 'success' : ''">
      {{ sliderCaptchaSuccess ? $vuetify.locale.t('$vuetify.loginComponent.authenticated') :
        $vuetify.locale.t('$vuetify.loginComponent.startVerification') }}

      <v-dialog v-model="sliderCaptchaDialog" activator="parent" max-width="400" @after-enter="createCaptcha">
        <template v-slot:default="{ isActive }">
          <v-card prepend-icon="mdi-shield-check"
            :title="$vuetify.locale.t('$vuetify.loginComponent.startVerification')">
            <template #text>
              <div id="stage"></div>
            </template>
          </v-card>
        </template>
      </v-dialog>
    </v-btn>

    <div class="py-4">
      <div class="d-flex justify-space-between align-center">
        <v-checkbox-btn v-model="loginStore.remember" class="ms-n3" color="primary" label="Remember me">
          <template #label>
            <span class="text-body-2">
              {{ $vuetify.locale.t('$vuetify.loginComponent.remember') }}
            </span>
          </template>
        </v-checkbox-btn>

        <v-btn class="text-decoration-none text-primary text-body-2 font-weight-medium" variant="text"
          @click="loginStore.tab = 'forgot-password'">
          {{ $vuetify.locale.t('$vuetify.loginComponent.forgotPassword') }}
        </v-btn>
      </div>
    </div>

    <v-btn block class="text-none mb-8" color="blue-grey-darken-4" flat rounded="lg" size="large"
      :text="$vuetify.locale.t('$vuetify.loginComponent.logIn')"
      :disabled="!(loginStore.form.username && loginStore.form.password) || !sliderCaptchaSuccess" @click="login" />

    <div v-if="signUp" class="text-center text-body-2 d-flex justify-center align-center ga-2">
      {{ $vuetify.locale.t('$vuetify.loginComponent.donHaveAccount') }}
      <v-btn class="text-body-2 text-caption text-decoration-none text-primary font-weight-medium" variant="text"
        @click="loginStore.tab = 'sign-up'">
        {{ $vuetify.locale.t('$vuetify.loginComponent.signUp') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { LoginApi } from '@/api/login';
import { useLoginStore } from '../../stores/login';
import SliderCaptcha from "slider-captcha-js";
import "slider-captcha-js/slider-captcha.css";
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const emit = defineEmits(['login'])
const props = defineProps({
  title: {
    type: String
  },
  signUp: {
    type: Boolean,
    default: true
  },
  sliderCaptcha: {
    type: Boolean,
    default: false
  }
})

const theme = useTheme()
const loginStore = useLoginStore()

const sliderCaptchaDialog = ref(false)
const sliderCaptchaSuccess = ref(!props.sliderCaptcha)

const login = async () => {
  const res = await LoginApi.login(loginStore.form.username, loginStore.form.password);
  emit('login', res)
};

function createCaptcha(event) {
  const captcha = new SliderCaptcha({
    root: "#stage",
    width: 350,
    height: 160,
    theme: theme.current.value.dark ? 'dark' : "light", // dark light
    onSuccess: () => {
      console.log('onSuccess')
      sliderCaptchaDialog.value = false
      sliderCaptchaSuccess.value = true
    },
    onRefresh: () => {
      captcha.status.innerText = "滑动验证";
    },
    
  });
  captcha.opt.failText = '❌ 再试一次!'
  captcha.opt.successText = '✅ 已验证!'
  captcha.status.innerText = "滑动验证";
}

</script>

<style scoped></style>
