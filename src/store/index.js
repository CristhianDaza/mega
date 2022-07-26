import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import {
  auth,
  db,
} from '@/firebase';
import router from '@/router';
import menu from './module/menu';
import categories from './module/categories';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    categories,
  },
  state: {
    layout: 'defaultLayout',
    usuario: '',
    usuarios: '',
    error: '',
    imagenSlider: [],
    imagenInfo: [],
    catalogos: [],
    trabajosCalendario: [],
    trabajoCalendario: {
      color: '', id: '', detial: '', end: '', name: '', start: '', terminado: '',
    },
    videos: [],
    productos: [],
    producto: {
      titulo: '', etiqueta: '',
    },
    titulos: [],
    pathToAdmin: null,
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
    eliminarImagenSlider(state, id) {
      state.imagenSlider = state.imagenSlider.filter((doc) => doc.id !== id);
    },
    setCatalogos(state, valor) {
      state.catalogos = valor;
    },
    eliminarCatalogo(state, id) {
      state.catalogos = state.catalogos.filter((doc) => doc.id !== id);
    },
    setImagenInfo(state, valor) {
      state.imagenInfo = valor;
    },
    eliminarImagenInfo(state, id) {
      state.imagenInfo = state.imagenInfo.filter((doc) => doc.id !== id);
    },
    setTrabajosCalendario(state, valor) {
      state.trabajosCalendario = valor;
    },
    setTrabajoCalendario(state, valor) {
      state.trabajoCalendario = valor;
    },
    eliminarTrabajoCalendario(state, id) {
      state.trabajosCalendario = state.trabajosCalendario.filter((doc) => doc.id !== id);
    },
    setVideos(state, valor) {
      state.videos = valor;
    },
    eliminarVideo(state, id) {
      state.videos = state.videos.filter((doc) => doc.id !== id);
    },
    setProducto(state, valor) {
      state.productos = valor;
    },
    setProductoId(state, valor) {
      state.producto = valor;
    },
    setTitulo(state, valor) {
      state.titulos = valor;
    },
    eliminarProducto(state, id) {
      state.productos = state.productos.filter((doc) => doc.id !== id);
    },
    setPathToAdmin(state, path) {
      state.pathToAdmin = path;
    },
  },
  actions: {
    crearUsuario({ commit }, valor) {
      const {
        email,
        password,
        nombre,
        rol,
      } = valor;
      const usuario = auth.currentUser;
      if (usuario.email === 'megapromocional@gmail.com') {
        db.collection('usuarios').add({
          nombre,
          email,
          rol,
        }).then(() => {
          auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
              commit('setUsuario', {
                email: res.user.email,
                uid: res.user.uid,
              });
            }).catch((err) => {
              commit('setError', err.message);
            });
          Swal.fire(
            '¡Creado!',
            'El usuario ha sido creado  .',
            'success',
          );
          router.push({
            path: '/admin/usuarios',
          });
        }).catch((err) => {
          commit('setError', err.message);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Solo el administrador puede crear usuarios',
        });
      }
    },
    ingresarUsaurio({ commit }, valor) {
      auth.signInWithEmailAndPassword(valor.email, valor.password)
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
      auth.signOut();
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
    async eliminarImagenSlider({ commit }, id) {
      await db.collection('imagenSlider').doc(id).delete()
        .then(() => {
          commit('eliminarImagenSlider', id);
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
    async eliminarCatalogo({ commit }, id) {
      await db.collection('catalogo').doc(id).delete()
        .then(() => {
          commit('eliminarCatalogo', id);
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
    async eliminarImagenInfo({ commit }, id) {
      await db.collection('info').doc(id).delete()
        .then(() => {
          commit('eliminarImagenInfo', id);
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
    async traerTrabajoCalendario({ commit }, id) {
      await db.collection('trabajos').doc(id).get()
        .then((doc) => {
          const trabajo = doc.data();
          trabajo.id = doc.id;
          commit('setTrabajoCalendario', trabajo);
        });
    },
    async eliminarTrabajoCalendario({ commit }, id) {
      await db.collection('trabajos').doc(id).delete()
        .then(() => {
          commit('eliminarTrabajoCalendario', id);
        });
    },
    async traerVideos({ commit }) {
      await db.collection('video').get()
        .then((snapshot) => {
          const videos = [];
          snapshot.forEach((doc) => {
            const video = doc.data();
            video.id = doc.id;
            videos.push(video);
          });
          commit('setVideos', videos);
        });
    },
    async eliminarVideo({ commit }, id) {
      await db.collection('video').doc(id).delete()
        .then(() => {
          commit('eliminarVideo', id);
        });
    },
    async traerProducto({ commit }) {
      await db.collection('producto').get()
        .then((snapshot) => {
          const productos = [];
          snapshot.forEach((doc) => {
            const producto = doc.data();
            producto.id = doc.id;
            productos.push(producto);
          });
          const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=12&page=1&order=paginacion_web&etiqueta=${productos[0].etiqueta}`;
          const config = {
            method: 'get',
            url,
            headers: {
              Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
            },
          };
          const productosEtiqueta = [];
          axios(config).then((res) => {
            res.data.results.forEach((producto) => {
              productosEtiqueta.push(producto);
            });
          });
          commit('setProducto', productosEtiqueta);
          commit('setTitulo', productos);
        });
    },

    async eliminarProducto({ commit }, id) {
      await db.collection('producto').doc(id).delete()
        .then(() => {
          commit('eliminarProducto', id);
        });
    },

    async traerProductoId({ commit }, id) {
      await db.collection('producto').doc(id).get()
        .then((doc) => {
          const producto = doc.data();
          producto.id = doc.id;
          commit('setProductoId', producto);
        });
    },

    setPathToAdmin({ commit }, path) {
      commit('setPathToAdmin', path);
    },
  },
  getters: {
    isLogin(state) {
      if (state.usuario) return true;
      return false;
    },
  },
});
