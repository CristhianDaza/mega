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
        primary: '#EBEBEB',
        secondary: '#FFCD17',
        colorText: '#2B2B2B',
        amarillo: '#FFCD17',
        azul: '#005C91',
        textoNegro: '#2B2B2B',
        textoBlanco: '#E3E3E3',
        fondoTarjeta: '#E3E3E3',
        textoError: '#D13D3D',
        invertPrimary: '#111B27',
        invertSecondary: '#05090C',
      },
      dark: {
        primary: '#111B27',
        secondary: '#05090C',
        colorText: '#E3E3E3',
        amarillo: '#FFCD17',
        azul: '#005C91',
        textoNegro: '#2B2B2B',
        textoBlanco: '#E3E3E3',
        fondoTarjeta: '#05090C',
        textoError: '#D13D3D',
        invertPrimary: '#EBEBEB',
        invertSecondary: '#FFCD17',
      },
    },
  },
});
