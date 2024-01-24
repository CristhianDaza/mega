export default {
  namespaced: true,
  state: {
    labels: null,
  },
  mutations: {
    SET_LABELS(state, labels) {
      state.labels = [...state.labels || [], labels];
    },
    DELETE_LABEL(state, id) {
      state.labels = state.labels.filter((doc) => doc.id !== id);
    },
    CLEAR_LABEL(state) {
      state.labels = null;
    },
  },
  actions: {
    setLabels({ commit }, labels) {
      commit('SET_LABELS', labels);
    },
    deleteLabel({ commit }, id) {
      commit('DELETE_LABEL', id);
    },
    clearLabel({ commit }) {
      commit('CLEAR_LABEL');
    },
    setInitialLabels({ commit }, {
      query,
      color,
      characteristics,
      label,
      category,
      subCategory,
    }) {
      if (query.color) {
        commit('SET_LABELS', { id: 'colour', name: color.nombre, filter: 'color' });
      }
      if (query.characteristics) {
        commit('SET_LABELS', { id: 'characteristics', name: characteristics.nombre, filter: 'characteristics' });
      }
      if (query.discount === 'true') {
        commit('SET_LABELS', { id: 'discount', name: 'Con descuento', filter: 'discount' });
      }
      if (query.inventoryInput) {
        commit('SET_LABELS', { id: 'inventory', name: `Inventario mayor a ${query.inventoryInput}`, filter: 'inventoryInput' });
      }
      if (query.label) {
        commit('SET_LABELS', { id: 'label', name: label.nombre.replace(/_/g, ' ').replace(/\d+$/, '').trim(), filter: 'label' });
      }
      if (query.category) {
        commit('SET_LABELS', { id: 'category', name: category.nombre, filter: 'category' });
      }
      if (query.subCategory) {
        commit('SET_LABELS', { id: 'subCategory', name: subCategory.nombre, filter: 'subCategory' });
      }
    },
  },
  getters: {
    getLabels: (state) => state.labels,
  },
};
