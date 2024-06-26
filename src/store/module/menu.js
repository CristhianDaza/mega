import { db } from '@/firebase';

export default {
  namespaced: true,
  state: {
    mainMenu: [],
    menu: {
      name: '',
      order: '',
      link: '',
      isExternal: false,
    },
    selectedMenu: null,
    mainMenuDefault: [],
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
    SET_SELECTED_MENU(state, menu) {
      state.selectedMenu = menu;
    },
  },
  actions: {
    async createMainMenu(_, menu) {
      await db.collection('mainMenu')
        .add({
          name: menu.name,
          order: menu.order,
          link: menu.link,
          isExternal: menu.isExternal,
        });
    },

    async getMainMenu({ commit }) {
      await db.collection('mainMenu').orderBy('order').get()
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
      await db.collection('mainMenu').doc(id).get()
        .then((doc) => {
          const result = doc.data();
          result.id = doc.id;
          commit('SET_MENU', result);
        });
    },

    async deleteMainMenu({ commit }, id) {
      await db.collection('mainMenu').doc(id).delete()
        .then(() => commit('DELETE_MAIN_MENU', id));
    },

    setSelectedMenu({ commit }, menu) {
      commit('SET_SELECTED_MENU', menu);
    },

    async editMainMenu(_, menu) {
      await db.collection('mainMenu').doc(menu.id).update({
        name: menu.name,
        order: menu.order,
        link: menu.link,
        isExternal: menu.isExternal,
      }).then();
    },
  },
  getters: {
    mainMenu(state) {
      return state.mainMenu;
    },
    selectedMenu(state) {
      return state.selectedMenu;
    },
  },
};
