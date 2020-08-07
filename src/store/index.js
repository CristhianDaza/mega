import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-cycle
import db from '@/main';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: 'defaultLayout',
    usuario: '',
    usuarios: '',
    error: '',
    imagenSlider: [],
    imagenInfo: [],
    catalogos: [],
    trabajosCalendario: [],
  },
  mutations: {
    setLayout(state, layout) {
      state.layout = layout;
    },
    setUsuario(state, valor) {
      state.usuario = valor;
    },
    setUsuarios(state, valor) {
      state.usuarios = valor;
    },
    eliminarUsuario(state, id) {
      state.usuarios = state.usuarios.filter((doc) => doc.id !== id);
    },
    setError(state, valor) {
      state.error = valor;
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
    setTrabajosCalendario(state, valor) {
      state.trabajosCalendario = valor;
    },
    eliminarTrabajoCalendario(state, id) {
      state.trabajosCalendario = state.trabajosCalendario.filter((doc) => doc.id !== id);
    },
  },
  actions: {
    ingresarUsaurio({ commit }, valor) {
      firebase.auth().signInWithEmailAndPassword(valor.email, valor.password)
        .then((res) => {
          commit('setUsuario', {
            email: res.user.email,
            uid: res.user.uid,
          });
          router.push({
            path: '/admin',
          });
        })
        .catch((err) => {
          commit('setError', err.message);
        });
    },
    cerrarSesion({ commit }) {
      firebase.auth().signOut();
      commit('setUsuario', null);
      router.push({
        path: '/admin/login',
      });
    },
    async traerUsuarios({ commit }) {
      await db.collection('usuarios').get()
        .then((snapshot) => {
          const usuarios = [];
          snapshot.forEach((doc) => {
            const usuario = doc.data();
            usuario.id = doc.id;
            usuarios.push(usuario);
          });
          commit('setUsuarios', usuarios);
        });
    },
    async eliminarUsuario({ commit }, id) {
      await db.collection('usuarios').doc(id).delete()
        .then(() => {
          commit('eliminarUsuario', id);
        });
    },
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
    async traerTrabajosCalendario({ commit }) {
      await db.collection('trabajos').get()
        .then((snapshot) => {
          const trabajos = [];
          snapshot.forEach((doc) => {
            const trabajo = doc.data();
            trabajo.id = doc.id;
            trabajos.push(trabajo);
          });
          commit('setTrabajosCalendario', trabajos);
        });
    },
    async eliminarTrabajoCalendario({ commit }, id) {
      await db.collection('trabajos').doc(id).delete()
        .then(() => {
          commit('eliminarTrabajoCalendario', id);
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
