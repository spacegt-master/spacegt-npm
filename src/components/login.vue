<template>
  <v-layout class="h-100">
    <app-bar transparent></app-bar>
    <v-main class="h-100 ">
      <v-container class="h-100 " fluid>
        <v-row align="center" class="h-100" justify="center">
          <v-sheet class="flex-1-1 px-4" color="background" max-width="420">
            <v-img class="mx-auto mb-4" max-width="60" src="@/assets/logo.png" />

            <div class="text-h5 text-center mb-8 font-weight-medium">Log into your account</div>

            <v-sheet border="opacity-25 thin" class="overflow-hidden" rounded="lg">
              <v-text-field density="compact" flat hide-details placeholder="Email" rounded="lg" variant="solo" />

              <v-divider />

              <v-text-field density="compact" flat hide-details placeholder="Password" variant="solo" />
            </v-sheet>

            <div class="py-4">
              <div class="d-flex justify-space-between align-center">
                <v-checkbox-btn class="ms-n3" color="primary" label="Remember me">
                  <template #label>
                    <span class="text-body-2">Remember me</span>
                  </template>
                </v-checkbox-btn>

                <a class="text-decoration-none text-primary text-body-2 font-weight-medium" href="#">
                  Forgot password?
                </a>
              </div>
            </div>

            <v-btn block class="text-none mb-8" color="primary" flat rounded="lg" text="Log In" to="/" />

            <div class="text-center text-body-2">
              Don't have an account? <a class="text-decoration-none text-primary font-weight-medium">Sign up</a>
            </div>
          </v-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped></style>
