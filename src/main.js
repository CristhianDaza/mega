import Vue from 'vue';
import VueMeta from 'vue-meta';
import { auth } from '@/firebase';
import VueCarousel from 'vue-carousel';
import flipbook from 'flipbook-vue';
import VueCoreVideoPlayer from 'vue-core-video-player';
import moment from 'moment';
import router from './router';
// eslint-disable-next-line import/order
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
// eslint-disable-next-line import/no-cycle
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

const es = {
  dashboard: {
    btn: {
      play: 'Reproducir',
      pause: 'Pausa',
      fullscreen: 'Pantalla completa',
      exitFullscreen: 'Salir de pantalla completa',
      mute: 'Silenciar',
      unmute: 'Activar sonido',
      back: 'Atrás',
      pip: 'Reproductor en miniatura',
    },
    settings: {
      autoplay: 'Autoplay',
      loop: 'Bucle',
      speed: 'Velocidad',
      resolution: 'Resolución',
    },
  },
  layers: {
    error: {
      title: '(O_O)?  Error!',
      2404: 'Fuente de video no encontrada',
      2502: 'Error de red',
      2503: 'El video no se puede decodificar',
      2504: '¡No se puede reproducir el video!',
    },
    loading: {
      msg: 'Cargando...',
    },
  },
};

Vue.use(VueMeta);
Vue.use(VueCarousel);
Vue.use(flipbook);
Vue.use(VueCoreVideoPlayer, {
  lang: es,
});
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
