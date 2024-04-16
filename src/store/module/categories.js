import { getCategories, getSubCategories } from '@/api/apiProduct';

export default {
  namespaced: true,
  state: {
    categories: null,
    subCategories: null,
    characteristicsStore: null,
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_SUBCATEGORIES(state, subCategories) {
      state.subCategories = subCategories;
    },
    CLEAN_SUBCATEGORIES(state) {
      state.subCategories = null;
    },
    SET_CHARACTERISTICS(state, characteristics) {
      state.characteristicsStore = characteristics;
    },
  },
  actions: {
    async getCategories({ commit }) {
      const { data } = await getCategories();
      commit('SET_CATEGORIES', data);
    },
    async getSubCategories({ commit }, id) {
      const { data } = await getSubCategories(id);
      commit('SET_SUBCATEGORIES', data);
    },
    cleanSubCategories({ commit }) {
      commit('CLEAN_SUBCATEGORIES');
    },
    setCharacteristics({ commit }, characteristics) {
      commit('SET_CHARACTERISTICS', characteristics);
    },
  },
  getters: {
    categories: (state) => state.categories,
    subCategories: (state) => state.subCategories,
    characteristicsStore: (state) => state.characteristicsStore,
  },
};
