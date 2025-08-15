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
      :label="`${$vuetify.locale.t('$vuetify.signUp.form.email')}`" />

    <v-btn block class="text-none mt-2" color="blue-grey-darken-4" flat rounded="lg"
      :text="$vuetify.locale.t('$vuetify.signUp.signUp')" size="large" type="submit" />

    <v-btn class="text-none w-100 mt-4" prepend-icon="mdi-arrow-left" variant="plain"
      @click="loginStore.tab = 'login'">
      {{ $vuetify.locale.t('$vuetify.signUp.back') }}
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { LoginApi } from '@/api/login';
import { SignUpApi } from '@/api/sign-up';
import { SMSApi } from '@/api/sms';
import { useLoginStore } from '@/stores/login';
import { snackbar } from '@/stores/snackbar';
import { computed, reactive, ref } from 'vue';

const loginStore = useLoginStore()

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
      loginStore.tab = 'login'

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
