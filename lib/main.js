import login from '@/components/login.vue'

const install = app => {
  app.component('spacegt-login', login)
}

export default {
  install,
}
