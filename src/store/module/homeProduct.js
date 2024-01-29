import { db } from '@/firebase';
import { searchProductLabel } from '@/api/apiProduct';

export default {
  namespaced: true,
  state: {
    productHome: [],
    selectedProductHome: {},
    productsHome: [],
  },
  mutations: {
    SET_PRODUCT_HOME(state, productHome) {
      state.productHome = productHome;
    },
    DELETE_PRODUCT_HOME(state, productHome) {
      state.productHome = productHome;
    },
    GET_SELECTED_PRODUCT_HOME(state, productHome) {
      state.selectedProductHome = productHome;
    },
    SET_PRODUCTS_HOME(state, products) {
      state.productsHome = products;
    },
  },
  actions: {
    async createProductHome(_, homeProduct) {
      await db.collection('homeProduct')
        .add({
          title: homeProduct.title,
          label: homeProduct.label,
        });
    },

    async getProductHome({ commit }) {
      await db.collection('homeProduct').get()
        .then((snapshot) => {
          const homeProduct = [];
          snapshot.forEach((doc) => {
            const result = doc.data();
            result.id = doc.id;
            homeProduct.push(result);
          });
          commit('SET_PRODUCT_HOME', homeProduct);
        });
    },

    async deleteProductHome({ commit }, id) {
      await db.collection('homeProduct').doc(id).delete()
        .then(() => commit('DELETE_PRODUCT_HOME', []));
    },

    getProductHomeId({ commit, state }, id) {
      const productSelect = state.productHome.find((product) => product.id === id);
      commit('GET_SELECTED_PRODUCT_HOME', productSelect);
    },

    async editProductHome(_, productHome) {
      await db.collection('homeProduct').doc(productHome.id).update({
        title: productHome.title,
        label: productHome.label,
      }).then();
    },

    async getProductLabel({ commit }, label) {
      const { data: { results } } = await searchProductLabel(label);
      commit('SET_PRODUCTS_HOME', results);
    },
  },
  getters: {
    productHome(state) {
      return state.productHome;
    },
    selectedProductHome(state) {
      return state.selectedProductHome;
    },
    productsHome(state) {
      return state.productsHome;
    },
  },
};
