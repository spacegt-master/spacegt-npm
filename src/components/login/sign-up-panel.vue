<template>
  <v-form validate-on="submit lazy" @submit.prevent="submit">
    <div class="text-h5 text-center mb-8 font-weight-medium">
      {{ $vuetify.locale.t('$vuetify.signUp.title') }}
    </div>

    <v-text-field v-model="form.nickname" :rules="rules.nickname" color="primary" variant="outlined"
      :label="`*${$vuetify.locale.t('$vuetify.signUp.form.nickname')}`" />

    <v-text-field v-model="form.phone" :rules="(rules.phone as any)" color="primary" variant="outlined"
      :label="`*${$vuetify.locale.t('$vuetify.signUp.form.phone')}`" @input="form.phoneCheck = false">

      <template #append-inner>
        <v-dialog max-width="400">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" :prepend-icon="form.phoneCheck ? 'mdi-cellphone-check' : 'mdi-cellphone'"
              variant="text" :disabled="!phoneFormatVerify || form.phoneCheck"
              @click="SMSApi.sendUserRegistrationVerificationCode(form.phone); form.otp = ''">
              {{ form.phoneCheck ? $vuetify.locale.t('$vuetify.signUp.phoneVerify.verified') :
                $vuetify.locale.t('$vuetify.signUp.phoneVerify.verify') }}
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card class="py-8 px-6 text-center mx-auto ma-4" elevation="12" max-width="400" width="100%">
              <h3 class="text-h6 mb-4">{{ $vuetify.locale.t('$vuetify.signUp.phoneVerify.title') }}</h3>

              <div class="text-body-2">
                {{ $vuetify.locale.t('$vuetify.signUp.phoneVerify.subtitleBefore') }}
                {{ maskPhoneNumber(form.phone) }} <br>
                {{ $vuetify.locale.t('$vuetify.signUp.phoneVerify.subtitleAfter') }}
              </div>

              <v-sheet color="surface">
                <v-otp-input v-model="form.otp" variant="solo" :length="4"></v-otp-input>
              </v-sheet>

              <v-btn class="my-4 mx-auto" color="purple" height="40"
                :text="$vuetify.locale.t('$vuetify.signUp.phoneVerify.verify')" variant="flat" width="70%"
                @click="verifyCode(isActive)"></v-btn>

              <div class="text-caption">
                {{ $vuetify.locale.t('$vuetify.signUp.phoneVerify.tip') }}
                <a href="#" @click.prevent="SMSApi.sendUserRegistrationVerificationCode(form.phone); form.otp = ''">
                  {{ $vuetify.locale.t('$vuetify.signUp.phoneVerify.resend') }}
                </a>
              </div>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-text-field>

    <v-text-field v-model="form.password" :rules="rules.password" color="primary" variant="outlined"
      :label="`*${$vuetify.locale.t('$vuetify.signUp.form.password')}`" type="password" />

    <v-text-field v-model="form.email" :rules="rules.email" color="primary" variant="outlined"
      :label="`*${$vuetify.locale.t('$vuetify.signUp.form.email')}`" />

    <v-btn block class="text-none mt-2" color="blue-grey-darken-4" flat rounded="lg"
      :text="$vuetify.locale.t('$vuetify.signUp.signUp')" size="large" type="submit" />

    <v-btn class="text-none w-100 mt-4" prepend-icon="mdi-arrow-left" variant="plain"
      @click="signupStore.tab = 'login'">
      {{ $vuetify.locale.t('$vuetify.signUp.back') }}
    </v-btn>
  </v-form>
  <!-- <v-stepper v-model="signupStore.steps" :items="[
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
</v-stepper> -->
</template>

<script setup lang="ts">
import { LoginApi } from '@/api/login';
import { UsersApi } from '@/api/manage/accounts/users';
import { SignUpApi } from '@/api/sign-up';
import { SMSApi } from '@/api/sms';
import { useSignupStore } from '@/stores/login';
import { snackbar } from '@/stores/snackbar';
import { computed, reactive, ref } from 'vue';

const signupStore = useSignupStore()

const form = reactive({
  nickname: '',
  phone: '',
  phoneCheck: false,
  password: '',
  email: '',
  otp: ''
})

const rules = {
  nickname: [
    (v?: string) => !!v || 'Full Name is required',
  ],
  phone: [
    (v?: string) => !!v || 'Phone is required',
    (v?: string) => (v && v.length == 11) || 'Please enter your 11-digit mobile phone number.',
    async (v?: string) => {
      const result = await LoginApi.uniqueVerification(v)
      return result || 'This account already exists.'
    }
  ],
  password: [
    (v?: string) => !!v || 'Password is required',
    (v?: string) => (v && v.length >= 6) || 'Password must be 6 characters or less',
  ],
  email: [
    (v?: string) => !v || /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/i.test(form.email) || 'The format of the email address is incorrect.',
  ],
}

const phoneFormatVerify = computed(() => (form.phone && form.phone.length == 11))

function maskPhoneNumber(phoneNumber: string) {
  // Remove any non-digit characters from the input
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Check if the number has at least 10 digits
  if (cleaned.length < 10) {
    return 'Invalid phone number';
  }

  // Get the first 3 digits
  const first3 = cleaned.substring(0, 3);

  // Get the last 4 digits
  const last4 = cleaned.substring(cleaned.length - 4, cleaned.length);

  // Calculate the number of asterisks needed
  const maskLength = cleaned.length - 7; // Total length minus first 3 and last 4
  const mask = '*'.repeat(maskLength);

  // Combine the parts to create the masked number
  return `${first3}${mask}${last4}`;
}

async function verifyCode(isActive: any) {
  form.phoneCheck = await SMSApi.verifyCode(form.phone, form.otp) as any

  if (form.phoneCheck) {
    isActive.value = false
  } else {
    snackbar({
      title: 'Verification code error',
      type: 'error'
    })
  }
}

async function submit(event: any) {
  const results = await event

  if (results.valid) {
    const res = await SignUpApi.signUp({
      username: form.phone,
      nickname: form.nickname,
      phone: form.phone,
      email: form.email,
      password: form.password
    })

    if (res) {
      signupStore.tab = 'login'

      form.phone = ''
      form.nickname = ''
      form.phoneCheck = false
      form.email = ''
      form.otp = ''
      form.password = ''
    }
  }
}
</script>

<style scoped></style>
