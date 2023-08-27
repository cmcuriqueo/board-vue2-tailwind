import Vue from 'vue'
import App from './App.vue'

import './main.css'
import store from './store';

Vue.config.productionTip = false

import router from './routes'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
