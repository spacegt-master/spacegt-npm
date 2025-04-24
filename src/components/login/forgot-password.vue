<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">Forgot Password</div>

    <v-stepper v-model="forgotPasswordStore.steps" :items="['Email', 'Verification', 'Change Password']"
      max-width="100%">
      <template v-slot:item.1>
        <v-card class="text-center" title="Enter a email" flat>
          <template #text>
            <v-text-field v-model="forgotPasswordStore.form.email" color="primary" class="mt-4" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.email.label')" variant="outlined" type="email" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="text-center" title="Verify Your Email" flat>
          <template #subtitle>
            We sent a verification code to john..@gmail.com <br> Please check your email and paste the code below.
          </template>
          <template #text>
            <div class="d-flex flex-column">
              <v-otp-input v-model="forgotPasswordStore.form.verificationCode"></v-otp-input>

              <v-btn class="mt-4 " variant="plain" @click="forgotPasswordStore.sendCode()">
                Send Code
              </v-btn>
            </div>
          </template>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card class="text-center" title="Change Password" flat>
          <template #text>
            <v-text-field v-model="forgotPasswordStore.form.password" color="primary" class="mt-4" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.password.label')" variant="outlined" type="password" />

            <v-text-field v-model="forgotPasswordStore.form.confirmPassword" color="primary" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.password.confirmPassword')" variant="outlined"
              type="password" />

            <v-btn class="mt-4 " color="success" rounded="lg" size="large"
              :text="$vuetify.locale.t('$vuetify.signUp.steps.verification.submit')"
              :disabled="!passwordVerification" @click="forgotPasswordStore.submit()" />
          </template>
        </v-card>

      </template>

      <template #actions="{ prev, next }">
        <v-stepper-actions :disabled="!stepperActionsAvailable" @click:next="next"
          @click:prev="prev"></v-stepper-actions>
      </template>
    </v-stepper>

    <v-btn class="text-none w-100 mt-4" prepend-icon="mdi-arrow-left" variant="plain"
      @click="forgotPasswordStore.tab = 'login'">Back to login</v-btn>
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
