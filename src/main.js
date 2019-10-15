import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
