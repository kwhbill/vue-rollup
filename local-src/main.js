import Vue from 'vue'
import App from './App.vue'
import item from '../src/index'
let { VList} = item
Vue.use(VList)
// Vue.use(VListItem)
new Vue({
  el: '#app',
  render: h => h(App)
})
