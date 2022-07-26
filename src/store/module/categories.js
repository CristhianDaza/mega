import { getCategories } from '@/api/apiProduct';

export default {
  namespaced: true,
  state: {
    categories: null,
  },
  mutations: {
    GET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async getCategories({ commit }) {
      const { data } = await getCategories();
      commit('GET_CATEGORIES', data);
    },
  },
};
