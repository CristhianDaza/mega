import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import VueMeta from 'vue-meta';
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

const firebaseConfig = {
  apiKey: 'AIzaSyCmc3cVSy9G3g8-kRbGROgD2_0Eu0YmG2o',
  authDomain: 'megapromocionales2020.firebaseapp.com',
  databaseURL: 'https://megapromocionales2020.firebaseio.com',
  projectId: 'megapromocionales2020',
  storageBucket: 'megapromocionales2020.appspot.com',
  messagingSenderId: '32953139073',
  appId: '1:32953139073:web:afce557c73323a37ff7280',
  measurementId: 'G-23S3M5JTYT',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore();

export default firebaseApp.firestore();

firebase.auth().onAuthStateChanged((user) => {
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
