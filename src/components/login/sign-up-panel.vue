<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">
      {{ $vuetify.locale.t('$vuetify.signUp.title') || $vuetify.locale.messages.en.signUp.title }}
    </div>

    <v-stepper v-model="signupStore.steps" :items="[
      $vuetify.locale.t('$vuetify.signUp.steps.account.label') || $vuetify.locale.messages.en.signUp.steps.account.label,
      $vuetify.locale.t('$vuetify.signUp.steps.password.label') || $vuetify.locale.messages.en.signUp.steps.password.label,
      $vuetify.locale.t('$vuetify.signUp.steps.email.label') || $vuetify.locale.messages.en.signUp.steps.email.label,
      $vuetify.locale.t('$vuetify.signUp.steps.verification.label') || $vuetify.locale.messages.en.signUp.steps.verification.label,
    ]" max-width="100%">
      <template v-slot:item.1>
        <v-card class="text-center" flat
          :title="$vuetify.locale.t('$vuetify.signUp.steps.account.title') || $vuetify.locale.messages.en.signUp.steps.account.title">
          <template #text>
            <v-text-field v-model="signupStore.form.username" color="primary" required variant="outlined" class="mt-4"
              :label="$vuetify.locale.t('$vuetify.signUp.steps.account.username') || $vuetify.locale.messages.en.signUp.steps.account.username" />

            <v-text-field v-model="signupStore.form.nickname" color="primary" required variant="outlined" class="mt-4"
              :label="$vuetify.locale.t('$vuetify.signUp.steps.account.nickname') || $vuetify.locale.messages.en.signUp.steps.account.nickname" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="text-center" flat
          :title="$vuetify.locale.t('$vuetify.signUp.steps.password.title') || $vuetify.locale.messages.en.signUp.steps.password.title">
          <template #subtitle>
            <div
              v-html="$vuetify.locale.t('$vuetify.signUp.steps.password.subtitle') || $vuetify.locale.messages.en.signUp.steps.password.subtitle">
            </div>
          </template>
          <template #text>
            <v-text-field v-model="signupStore.form.password" color="primary" class="mt-4" required variant="outlined"
              type="password"
              :label="$vuetify.locale.t('$vuetify.signUp.steps.password.label') || $vuetify.locale.messages.en.signUp.steps.password.label" />

            <v-text-field v-model="signupStore.form.confirmPassword" color="primary" required variant="outlined"
              type="password"
              :label="$vuetify.locale.t('$vuetify.signUp.steps.password.confirmPassword') || $vuetify.locale.messages.en.signUp.steps.password.confirmPassword" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card class="text-center" flat
          :title="$vuetify.locale.t('$vuetify.signUp.steps.email.title') || $vuetify.locale.messages.en.signUp.steps.email.title">

          <template #text>
            <v-text-field v-model="signupStore.form.email" color="primary" class="mt-4" required variant="outlined"
              type="email"
              :label="$vuetify.locale.t('$vuetify.signUp.steps.email.label') || $vuetify.locale.messages.en.signUp.steps.email.label" />
          </template>
        </v-card>
      </template>


      <template v-slot:item.4>
        <v-card class="text-center" flat
          :title="$vuetify.locale.t('$vuetify.signUp.steps.verification.title') || $vuetify.locale.messages.en.signUp.steps.verification.title">

          <template #text>
            <div class="d-flex flex-column">
              <v-otp-input v-model="signupStore.form.verificationCode"></v-otp-input>

              <v-btn class="mt-4 " color="success" rounded="lg" size="large"
                :disabled="signupStore.form.verificationCode.length < 6"
                :text="$vuetify.locale.t('$vuetify.signUp.steps.verification.submit') || $vuetify.locale.messages.en.signUp.steps.verification.submit"
                @click="signupStore.submit()" />

              <v-btn class="mt-4 " variant="plain" @click="signupStore.sendCode()">
                {{ $vuetify.locale.t('$vuetify.signUp.steps.verification.sendCode') ||
                  $vuetify.locale.messages.en.signUp.steps.verification.sendCode }}
              </v-btn>
            </div>
          </template>
        </v-card>
      </template>

      <template #actions="{ prev, next }">
        <v-stepper-actions :disabled="!stepperActionsAvailable" @click:next="next"
          @click:prev="prev"></v-stepper-actions>
      </template>
    </v-stepper>

    <v-btn class="text-none w-100 mt-4" prepend-icon="mdi-arrow-left" variant="plain"
      @click="signupStore.tab = 'login'">
      {{ $vuetify.locale.t('$vuetify.signUp.back') ||
        $vuetify.locale.messages.en.signUp.back }}
    </v-btn>
  </div>
</template>

<script setup>
import { LoginApi } from '@/api/login';
import { useSignupStore } from '@/stores/login';
import { watchThrottled } from '@vueuse/core'
import { computed, ref, watch } from 'vue';

const signupStore = useSignupStore()

const uniqueVerification = ref(false)

const passwordVerification = computed(() => signupStore.form.password == signupStore.form.confirmPassword)

const emailVerification = computed(() => (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/i.test(signupStore.form.email)))

const stepperActionsAvailable = computed(() => {
  if (signupStore.steps == 1) {
    return uniqueVerification.value;
  } else if (signupStore.steps == 2 && signupStore.form.password.length >= 6) {
    return passwordVerification.value;
  } else if (signupStore.steps == 3) {
    return emailVerification.value
  }
  return false;
})

watchThrottled(() => signupStore.form.username, async () => {
  if (signupStore.form.username.length >= 8) {
    uniqueVerification.value = await LoginApi.uniqueVerification(signupStore.form.username)
  } else {
    uniqueVerification.value = false

  }
}, { throttle: 500 })

watch(() => signupStore.steps, () => {
  if (signupStore.steps == 4) {
    signupStore.sendCode()
  }
})

</script>

<style   scoped></style>
