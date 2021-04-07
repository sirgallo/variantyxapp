import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  BootstrapVue,
  IconsPlugin,
  ModalPlugin,
  DropdownPlugin,
  TablePlugin,
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SmartTable from 'vuejs-smart-table';

Vue.config.productionTip = false

Vue.use(SmartTable)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
