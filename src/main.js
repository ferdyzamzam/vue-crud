import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

Vue.config.productionTip = false

import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
