import { searchProduct } from '@/api/apiProduct';

export default {
  namespaced: true,
  state: {
    products: null,
    filtersProducts: null,
    product: null,
    currentPage: 1,
    messageError: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_MESSAGE_ERROR(state, message) {
      state.messageError = message;
    },
    CLEAR_PRODUCTS(state) {
      state.products = null;
    },
  },
  actions: {
    async setProducts({ commit }) {
      try {
        const { data } = await searchProduct();
        commit('SET_PRODUCTS', data?.results);
      } catch (error) {
        commit('SET_MESSAGE_ERROR', error.code);
        commit('SET_PRODUCTS', []);
      }
    },
    setProduct({ commit }, product) {
      commit('SET_PRODUCT', product);
    },
    setCurrentPage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page);
    },
    clearProducts({ commit }) {
      commit('CLEAR_PRODUCTS');
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    getCurrentPage: (state) => state.currentPage,
    getMessageError: (state) => state.messageError,
    getFilterProducts: (state) => (search) => {
      if (!search || search.trim() === '') {
        return state.products;
      }
      const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const searchLower = normalizeString(search.toLowerCase());

      return state.products.filter((product) => {
        const description = normalizeString(product?.descripcion_comercial?.toLowerCase());
        const code = normalizeString(product?.familia?.toLowerCase());

        return description.includes(searchLower) || code.includes(searchLower);
      });
    },

  },
};
