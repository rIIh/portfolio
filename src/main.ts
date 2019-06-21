import Vue from 'vue';
import App from './App.vue';
import store from './store';
import scroll from 'vue-scroll';
import scrollTo from 'vue-scroll-to'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './registerServiceWorker';
import './styles/global.scss';
import 'swiper/dist/css/swiper.css'

// TODO Shrink to only use
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

Vue.config.productionTip = false;
Vue.use(scroll);
Vue.use(scrollTo);
Vue.use(VueAwesomeSwiper);


new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
