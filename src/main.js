import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import frontPage from "@/components/frontPage";
import frontPage2 from "@/components/frontPage2";

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: frontPage},
  { path: '/page2', component: frontPage2 }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
