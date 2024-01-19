<template>
  <div>
    <v-app-bar
      :style="{ background: $vuetify.theme.themes.dark.fondoTarjeta }"
      class="py-0"
    >
      <v-layout>
        <div class="d-flex d-lg-none">
          <v-app-bar-nav-icon
            :style="{color: $vuetify.theme.themes[theme].textoBlanco}"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
        <div class="d-none d-lg-flex align-center" >
          <div v-for="{ name, id, link } in mainMenu" :key="id">
              <mp-button
                is-menu
                :class="{'active': selectedMenu === link}"
                @click="goToPage(link)"
              >
                {{ name }}
              </mp-button>
          </div>
          <mp-button
            v-if="!isLogin"
            is-menu
            @click="toAdmin()"
          >
            Admin
          </mp-button>
        </div>
        <v-spacer></v-spacer>
        <ThemeButton />
        <SearchComponent />
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      temporary
      app
      clipped
      :src="linkBackground"
    >
      <v-list shaped menu>
        <v-subheader>Menú Principal</v-subheader>
        <v-divider class="mx-5"></v-divider>
        <v-list-item-group
          v-model="group"
          :style="{color: $vuetify.theme.themes[theme].textoBlanco}"
          v-for="menu in mainMenu"
          :key="menu.id"
        >
          <v-list-item exact :to="menu.link">
            <v-list-item-title>
              <span>{{ menu.name }}</span>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MenuPrincipal',
  data() {
    return {
      drawer: false,
      group: null,
      linkBackground: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_FondoMenu.webp?alt=media&token=298c8002-37d6-457c-8cb1-dababcfca57c',
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: {
    SearchComponent: () => import(/* webpackChunkName: "searchComponent" */ '@/components/Global/SearchComponent.vue'),
    ThemeButton: () => import(/* webpackChunkName: "themeButton" */ '@/components/Global/ThemeButton.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
  },
  methods: {
    ...mapActions(['setPathToAdmin']),
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    async toAdmin() {
      await this.setPathToAdmin(this.$route.fullPath);
      await this.$router.push({ name: 'admin' });
    },
    goToPage(link) {
      this.setSelectedMenu(link);
      this.$router.push({ path: link });
    },
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapGetters('menu', ['mainMenu', 'selectedMenu']),
  },
  mounted() {
    this.getMainMenu();
  },
};
</script>
