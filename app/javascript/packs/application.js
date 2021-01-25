import Vue from 'vue'
import App from '../app.vue'
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    vuetify,
    i18n,
    router,
    store,
    render: (h) => h(App)
  })
})