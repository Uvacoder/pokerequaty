import Vue from 'vue'
import App from './App.vue'
import {store} from './store'
//import vuetify from './plugins/vuetify';
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniUserCircle } from 'vue-unicons/dist/icons'



import Axios from 'axios'

Unicon.add([uniUserCircle])
Vue.use(Unicon)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  store,
  //vuetify,
  render: h => h(App)
}).$mount('#app')
