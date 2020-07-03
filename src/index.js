
import VList from '../packages/list/index.js';
import VListItem from '../packages/list-item/index.js';
const components = [VList, VListItem]
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '1.0.0',
  install,
  VList,
  VListItem
}
