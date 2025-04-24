<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">{{ $vuetify.locale.t('$vuetify.signUp.title') }}</div>

    <v-stepper v-model="signupStore.steps" :items="[
      $vuetify.locale.t('$vuetify.signUp.steps.account.label'),
      $vuetify.locale.t('$vuetify.signUp.steps.password.label'),
      $vuetify.locale.t('$vuetify.signUp.steps.email.label'),
      $vuetify.locale.t('$vuetify.signUp.steps.verification.label'),
    ]" max-width="100%">
      <template v-slot:item.1>
        <v-card class="text-center" :title="$vuetify.locale.t('$vuetify.signUp.steps.account.title')" flat>
          <template #text>
            <v-text-field v-model="signupStore.form.username" color="primary" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.account.username')" variant="outlined" class="mt-4" />

            <v-text-field v-model="signupStore.form.nickname" color="primary" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.account.nickname')" variant="outlined" class="mt-4" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="text-center" :title="$vuetify.locale.t('$vuetify.signUp.steps.password.title')" flat>
          <template #subtitle>
            <div v-html="$vuetify.locale.t('$vuetify.signUp.steps.password.subtitle')"> </div>
          </template>
          <template #text>
            <v-text-field v-model="signupStore.form.password" color="primary" class="mt-4" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.password.label')" variant="outlined" type="password" />

            <v-text-field v-model="signupStore.form.confirmPassword" color="primary" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.password.confirmPassword')" variant="outlined"
              type="password" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card class="text-center" :title="$vuetify.locale.t('$vuetify.signUp.steps.email.title')" flat>

          <template #text>
            <v-text-field v-model="signupStore.form.email" color="primary" class="mt-4" required
              :label="$vuetify.locale.t('$vuetify.signUp.steps.email.label')" variant="outlined" type="email" />
          </template>
        </v-card>
      </template>


      <template v-slot:item.4>
        <v-card class="text-center" :title="$vuetify.locale.t('$vuetify.signUp.steps.verification.title')" flat>

          <template #text>
            <div class="d-flex flex-column">
              <v-otp-input v-model="signupStore.form.verificationCode"></v-otp-input>

              <v-btn class="mt-4 " color="success" rounded="lg" size="large"
                :text="$vuetify.locale.t('$vuetify.signUp.steps.verification.submit')"
                :disabled="signupStore.form.verificationCode.length < 6" @click="signupStore.submit()" />

              <v-btn class="mt-4 " variant="plain" @click="signupStore.sendCode()">
                Send Code
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

    <v-btn class="text-none w-100 mt-4" prepend-icon="mdi-arrow-left" variant="plain" @click="signupStore.tab = 'login'">Back to login</v-btn>
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

<style lang="scss" scoped></style>
