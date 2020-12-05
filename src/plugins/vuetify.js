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
        primary: '#D04123',
        basetexto: '#252525',
        basebackground: '#ffffff',
        background: '#f2f5f8',
        basemenu: '#D04123',
      },
      dark: {
        secondary: '#05090c',
        basetexto: '#edf0f2',
        basebackground: '#05090c',
        background: '#111b27',
        basemenu: '#05090c',
      },
    },
  },
});
