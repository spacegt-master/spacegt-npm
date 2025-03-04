<template>
  <div>
    <div class="text-h5 text-center mb-8 font-weight-medium">Forgot Password</div>

    <v-stepper :items="['Account', 'Verify', 'Finish']" max-width="500px">
      <template v-slot:item.1>
        <v-card class="text-center" title="Enter a username" flat>
          <template #text>
            <v-text-field v-model="loginStore.form.username" color="primary" label="Username" variant="outlined"
              class="mt-4" />
          </template>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="text-center" title="Verify Your Account" flat>
          <template #subtitle>
            We sent a verification code to john..@gmail.com <br> Please check your email and paste the code below.
          </template>
          <template #text>
            <v-otp-input v-model="loginStore.otp" variant="filled"></v-otp-input>
          </template>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-empty-state action-text="Go Login" icon="mdi-check-circle-outline" title="All Done!">
          <template #media>
            <v-icon color="success" size="128" />
          </template>

          <template #actions>
            <v-btn class="text-none" color="success" flat rounded="lg" size="large" @click="loginStore.tab = 'login'" />
          </template>
        </v-empty-state>
      </template>
    </v-stepper>
  </div>
</template>

<script setup>
import { useLoginStore } from '../../stores/login';

const loginStore = useLoginStore()

</script>

<style lang="scss" scoped></style>
