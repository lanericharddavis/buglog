// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'
import bootstrap from 'bootstrap'
import jquery from 'jquery'
import popper from 'popper.js'
import moment from 'vue-moment'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router, bootstrap, jquery, popper, moment)
  .mount('#app')
