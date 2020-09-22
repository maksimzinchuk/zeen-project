import 'current-script-polyfill'
import Vue from 'vue'
import App from './scripts/App'
import Validation from './scripts/Validation'
import SvgIcon from './scripts/components/SvgIcon'
import {swiper} from './scripts/helpers/slider'
import Vuelidate from 'vuelidate'

if (process.env.NODE_ENV === 'development') {
  require('file-loader!./index.html')
}

Vue.use(Vuelidate)
Vue.config.productionTip = false

import router from './scripts/router'
import store from './scripts/store'

window.app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#chat')

new Vue({
  render: h => h(Validation),
}).$mount('#Validation')

Vue.component('SvgIcon', SvgIcon)
