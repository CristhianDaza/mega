import { db } from '@/firebase';

export default {
  namespaced: true,
  state: {
    mainMenu: [],
    menu: { name: '', order: '', link: '' },
  },
  mutations: {
    SET_MAIN_MENU(state, menu) {
      state.mainMenu = menu;
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    DELETE_MAIN_MENU(state, id) {
      state.mainMenu = state.mainMenu.filter((doc) => doc.id !== id);
    },
  },
  actions: {
    async createMainMenu(_, menu) {
      await db.collection('menu')
        .add({
          name: menu.name,
          order: menu.order,
          link: menu.link,
        });
    },

    async getMainMenu({ commit }) {
      await db.collection('menu').orderBy('order').get()
        .then((snapshot) => {
          const mainMenu = [];
          snapshot.forEach((doc) => {
            const result = doc.data();
            result.id = doc.id;
            mainMenu.push(result);
          });
          commit('SET_MAIN_MENU', mainMenu);
        });
    },

    async getMenu({ commit }, id) {
      await db.collection('menu').doc(id).get()
        .then((doc) => {
          const result = doc.data();
          result.id = doc.id;
          commit('SET_MENU', result);
        });
    },

    async deleteMainMenu({ commit }, id) {
      await db.collection('menu').doc(id).delete()
        .then(() => commit('DELETE_MAIN_MENU', id));
    },
  },
  getters: {
    mainMenu(state) {
      return state.mainMenu;
    },
  },
};
