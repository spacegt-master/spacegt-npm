<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">
      {{ $vuetify.locale.t('$vuetify.forgotPassword.title') || $vuetify.locale.messages.en.forgotPassword.title }}
    </div>

    <v-stepper v-model="forgotPasswordStore.steps" :items="[
      $vuetify.locale.t('$vuetify.forgotPassword.steps.email.label') || $vuetify.locale.messages.en.forgotPassword.steps.email.label,
      $vuetify.locale.t('$vuetify.forgotPassword.steps.verification.label') || $vuetify.locale.messages.en.forgotPassword.steps.verification.label,
      $vuetify.locale.t('$vuetify.forgotPassword.steps.changePassword.label') || $vuetify.locale.messages.en.forgotPassword.steps.changePassword.label
    ]" max-width="100%">
      <template v-slot:item.1>
        <v-card class="text-center" flat
          :title="$vuetify.locale.t('$vuetify.forgotPassword.steps.email.title') || $vuetify.locale.messages.en.forgotPassword.steps.email.title">
          <template #text>
            <v-text-field v-model="forgotPasswordStore.form.email" color="primary" class="mt-4" required
              variant="outlined" type="email"
              :label="$vuetify.locale.t('$vuetify.forgotPassword.steps.email.label') || $vuetify.locale.messages.en.forgotPassword.steps.email.label" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="text-center" flat
          :title="$vuetify.locale.t('$vuetify.forgotPassword.steps.verification.title') || $vuetify.locale.messages.en.forgotPassword.steps.verification.title">
          <template #subtitle>
            <div
              v-html="$vuetify.locale.t('$vuetify.forgotPassword.steps.verification.subtitle') || $vuetify.locale.messages.en.forgotPassword.steps.verification.subtitle">
            </div>
          </template>
          <template #text>
            <div class="d-flex flex-column">
              <v-otp-input v-model="forgotPasswordStore.form.verificationCode"></v-otp-input>

              <v-btn class="mt-4 " variant="plain" @click="forgotPasswordStore.sendCode()">
                {{ $vuetify.locale.t('$vuetify.forgotPassword.steps.verification.sendCode') ||
                  $vuetify.locale.messages.en.forgotPassword.steps.verification.sendCode }}
              </v-btn>
            </div>
          </template>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card class="text-center"
          :title="$vuetify.locale.t('$vuetify.forgotPassword.steps.changePassword.title') || $vuetify.locale.messages.en.forgotPassword.steps.changePassword.title"
          flat>
          <template #text>
            <v-text-field v-model="forgotPasswordStore.form.password" color="primary" class="mt-4" required
              variant="outlined" type="password"
              :label="$vuetify.locale.t('$vuetify.forgotPassword.steps.changePassword.password') || $vuetify.locale.messages.en.forgotPassword.steps.changePassword.password" />

            <v-text-field v-model="forgotPasswordStore.form.confirmPassword" color="primary" required variant="outlined"
              type="password"
              :label="$vuetify.locale.t('$vuetify.forgotPassword.steps.changePassword.confirmPassword') || $vuetify.locale.messages.en.forgotPassword.steps.changePassword.confirmPassword" />

            <v-btn class="mt-4 " color="success" rounded="lg" size="large" :disabled="!passwordVerification"
              :text="$vuetify.locale.t('$vuetify.forgotPassword.steps.changePassword.submit') || $vuetify.locale.messages.en.forgotPassword.steps.changePassword.submit"
              @click="forgotPasswordStore.submit()" />
          </template>
        </v-card>

      </template>

      <template #actions="{ prev, next }">
        <v-stepper-actions :disabled="!stepperActionsAvailable" @click:next="next"
          @click:prev="prev"></v-stepper-actions>
      </template>
    </v-stepper>

    <v-btn class="text-none w-100 mt-4" prepend-icon="mdi-arrow-left" variant="plain"
      @click="forgotPasswordStore.tab = 'login'">
      {{ $vuetify.locale.t('$vuetify.forgotPassword.back') || $vuetify.locale.messages.en.forgotPassword.back }}
    </v-btn>
  </div>
</template>

<script setup>
import { EmailApi } from '@/api/email';
import { useForgotPasswordStore } from '@/stores/login';
import { watchThrottled } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

const forgotPasswordStore = useForgotPasswordStore()

const emailVerification = computed(() => (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/i.test(forgotPasswordStore.form.email)))

const codeVerification = ref(false)

const passwordVerification = computed(() => forgotPasswordStore.form.password.length >= 6 && forgotPasswordStore.form.password == forgotPasswordStore.form.confirmPassword)

const stepperActionsAvailable = computed(() => {
  if (forgotPasswordStore.steps == 1) {
    return emailVerification.value;
  } else if (forgotPasswordStore.steps == 2) {
    return codeVerification.value;
  }
  return false;
})

watchThrottled(() => forgotPasswordStore.form.verificationCode, async () => {
  if (forgotPasswordStore.form.verificationCode.length == 6) {
    codeVerification.value = await EmailApi.verify(forgotPasswordStore.form.email, forgotPasswordStore.form.verificationCode)
  } else {
    codeVerification.value = false
  }
}, { throttle: 100 })


watch(() => forgotPasswordStore.steps, () => {
  if (forgotPasswordStore.steps == 2) {
    forgotPasswordStore.sendCode()
  }
})

</script>

<style lang="scss" scoped></style>
