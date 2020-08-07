import Vue from 'vue';
import VueMeta from 'vue-meta';
import { auth } from '@/firebase';
import router from './router';
// eslint-disable-next-line import/order
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
// eslint-disable-next-line import/no-cycle
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';

Vue.config.productionTip = false;

Vue.use(VueMeta);

Vue.use(VueAnalytics, {
  id: 'UA-126390971-1',
  router,
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
