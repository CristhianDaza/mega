<template>
  <div>
    <v-app-bar
      :style="{background: $vuetify.theme.themes.dark.secondary}"
      flat
    >
      <v-layout>

        <div class="d-flex d-lg-none">
          <v-app-bar-nav-icon
            :style="{color: $vuetify.theme.themes[theme].textoBlanco}"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>

        <div class="d-none d-lg-flex align-center" v-for="menu in menus" :key="menu.uid">
          <v-btn
            :style="{color: $vuetify.theme.themes[theme].textoBlanco}"
            text
            exact
            small
            :to="menu.link"
          >
            <span>{{menu.nombre}}</span>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <BotonTema />
        <Buscador />
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      temporary
      app
      clipped
      src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_FondoMenu.webp?alt=media&token=298c8002-37d6-457c-8cb1-dababcfca57c"
    >
      <v-list shaped menu>
        <v-subheader>Menú Principal</v-subheader>
        <v-divider class="mx-5"></v-divider>
        <v-list-item-group
          v-model="group"
          :style="{color: $vuetify.theme.themes[theme].textoBlanco}"
          v-for="menu in menus"
          :key="menu.uid"
        >

          <v-list-item exact :to="menu.link">
            <v-list-item-title>
              <span>{{menu.nombre}}</span>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'MenuPrincipal',
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: {
    Buscador: () => import(/* webpackChunkName: "buscador" */ '@/components/Global/Buscador.vue'),
    BotonTema: () => import(/* webpackChunkName: "botonTema" */ '@/components/Global/BotonTema.vue'),
  },
  methods: {
    ...mapActions(['traerMenus']),
  },
  computed: {
    ...mapGetters(['existeUsuario']),
    ...mapState(['menus']),
  },
  mounted() {
    this.traerMenus();
  },
};
</script>

<style>
a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

.subtitle-1 {
  margin: 0 !important;
}
</style>
