import Vue from 'vue';
// import * as svgicon from 'vue-svgicon'; // didn't get working
import App from './App.vue';
import router from './router';
import store from './store/store';
// import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
