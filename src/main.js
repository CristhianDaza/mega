import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueCarousel from 'vue-carousel';
import flipbook from 'flipbook-vue';
import moment from 'moment';
import { auth } from '@/firebase';
import router from './router';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/analytics';
import '@babel/polyfill';
import './assets/css/globalstyle.scss';

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

Vue.use(VueMeta);
Vue.use(VueCarousel);
Vue.use(flipbook);

Vue.mixin({
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
});

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('detectarUsuario', {
      email: user.email,
      uid: user.uid,
    });
  } else {
    store.dispatch('detectarUsuario', null);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
});
