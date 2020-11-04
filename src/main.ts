import Vue from 'vue';
import Reader from './Reader.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Reader),
}).$mount('#app');
