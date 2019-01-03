import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://localhost:5001/api/'
store.dispatch('getColours').then(res => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
