import Vue from 'vue'
import axios from 'axios'
import { ipcRenderer } from 'electron'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data: {
    processError: null,
    processMessage: null,
  },
}).$mount('#app')


ipcRenderer.on('processMessage', (event, data) => {
  vm.processMessage = data
})

ipcRenderer.on('processError', (event, data) => {
  vm.processError = data
})
