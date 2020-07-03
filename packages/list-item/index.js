import ListItem from './src/main.vue';
/* istanbul ignore next */
ListItem.install = function (Vue) {
    Vue.component(ListItem.name, ListItem);
};

export default ListItem;

