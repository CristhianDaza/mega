import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: 'es',
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#0077bd',
        basetexto: '#252525',
        basebackground: '#ffffff',
        background: '#f2f5f8',
      },
      dark: {
        secondary: '#05090c',
        basetexto: '#edf0f2',
        basebackground: '#05090c',
        background: '#111b27',
      },
    },
  },
});
