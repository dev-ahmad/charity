import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vuetify from './plugins/vuetify';
// import './plugins/vuetify';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueResource from "./vue-resource"

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(require('vue-cookies'))

VueResource.reloadAuth();

Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  vuetify : new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
