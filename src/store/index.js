import Vue from 'vue';
import Vuex from 'vuex';
// import firebase from 'firebase/app';
// eslint-disable-next-line import/no-cycle
import db from '@/main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: '',
    imagenSlider: [],
    imagenInfo: [],
    catalogos: [],
  },
  mutations: {
    setUsuario(state, valor) {
      state.usuario = valor;
    },
    setImagenSlider(state, valor) {
      state.imagenSlider = valor;
    },
    setImagenInfo(state, valor) {
      state.imagenInfo = valor;
    },
    setCatalogos(state, valor) {
      state.catalogos = valor;
    },
  },
  actions: {
    detectarUsuario({ commit }, valor) {
      if (valor != null) {
        commit('setUsuario', {
          email: valor.email,
          uid: valor.uid,
        });
      } else {
        commit('setUsuario', null);
      }
    },
    async traerImagenSlider({ commit }) {
      await db.collection('imagenSlider').get()
        .then((snapshot) => {
          const imagenes = [];
          snapshot.forEach((doc) => {
            const imagen = doc.data();
            imagen.id = doc.id;
            imagenes.push(imagen);
          });
          commit('setImagenSlider', imagenes);
        });
    },
    async traerImagenInfo({ commit }) {
      await db.collection('info').get()
        .then((snapshot) => {
          const imagenes = [];
          snapshot.forEach((doc) => {
            const imagen = doc.data();
            imagen.id = doc.id;
            imagenes.push(imagen);
          });
          commit('setImagenInfo', imagenes);
        });
    },
    async traerCatalogo({ commit }) {
      await db.collection('catalogo').get()
        .then((snapshot) => {
          const catalogos = [];
          snapshot.forEach((doc) => {
            const catalogo = doc.data();
            catalogo.id = doc.id;
            catalogos.push(catalogo);
          });
          commit('setCatalogos', catalogos);
        });
    },
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false;
      }
      return true;
    },
  },
});
