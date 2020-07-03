import Vue from 'vue'
import App from './App.vue'
import item from '../src/index'
let { VList ,VDemo} = item
Vue.use(VDemo)
Vue.use(VList)
// Vue.use(VListItem)
new Vue({
  el: '#app',
  render: h => h(App)
})
