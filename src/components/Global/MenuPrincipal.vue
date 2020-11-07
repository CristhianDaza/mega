<template>
  <div>
    <v-app-bar
      :class="this.$vuetify.theme.dark ? 'secondary' : 'primary'"
      flat
    >
      <v-layout>

        <div class="d-flex d-lg-none">
          <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer">
          </v-app-bar-nav-icon>
        </div>

        <div class="d-none d-lg-flex" v-for="menu in menus" :key="menu.uid">
          <v-btn class="text-oscuro" text large exact :to="menu.link">
            <span>{{menu.nombre}}</span>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="busqueda"
          v-on:keyup.enter="buscarProducto(busqueda)"
          @click:prepend-inner="buscarProducto(busqueda)"
          clearable
          class="mt-1 mx-2"
          placeholder="Buscar"
          :prepend-inner-icon="mdiMagnify"
          outlined
          rounded
          filled
          dense
          dark
          hide-details="auto"
        ></v-text-field>
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      temporary
      app
      clipped
      color="primary"
      src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_FondoMenu.webp?alt=media&token=298c8002-37d6-457c-8cb1-dababcfca57c"
    >
      <v-list shaped menu>
        <v-subheader>Menú Principal</v-subheader>
        <v-divider class="mx-5"></v-divider>
        <v-list-item-group
          v-model="group"
          class="white--text"
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
import {
  mdiMagnify,
} from '@mdi/js';
import { mapGetters, mapActions, mapState } from 'vuex';
import router from '@/router';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      mdiMagnify,
      drawer: false,
      group: null,
      busqueda: '',
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    ...mapActions(['traerMenus']),
    buscarProducto(busqueda) {
      if (busqueda === '') {
        Swal.fire(
          '¡Error!',
          'La busqueda no puede ir vacía.',
          'error',
        );
        return;
      }
      if (busqueda.length < 3) {
        Swal.fire(
          '¡Error!',
          'La busqueda debe contener al menos 3 caracteres.',
          'error',
        );
        return;
      }
      router.push({
        path: '/buscar',
        query: {
          busqueda,
        },
      });
      this.busqueda = '';
    },
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

.text-oscuro {
  color: white !important;
}

.subtitle-1 {
  margin: 0 !important;
}
</style>
