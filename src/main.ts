import Vue from 'vue';
import App from './App.vue';
import store from './store';
// import VueAwesomeSwiper from 'vue-awesome-swiper';
const VueAwesomeSwiper = require('vue-awesome-swiper');


import './registerServiceWorker';
import './styles/global.scss';
import 'swiper/dist/css/swiper.css';

// TODO Shrink to only use
import 'vue-awesome/icons';
// import Icon from 'vue-awesome/components/Icon'
// import Icon from 'vue-awesome/components/Icon';
const Icon = require('vue-awesome/components/Icon');
Vue.component('v-icon', Icon);

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);


new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
