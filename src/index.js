
import VList from '../packages/list/index.js';
import VListItem from '../packages/list-item/index.js';
import VDemo from '../packages/demo/index.js';
import pkg from "../package.json";
const components = [VDemo,VList, VListItem]
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version:pkg.version,
  install,
  VDemo,
  VList,
  VListItem
}
