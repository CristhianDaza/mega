<template>
  <div>
    <v-app-bar
      :class="this.$vuetify.theme.dark ? '' : 'bg-claro'"
    >
      <div :class="this.$vuetify.breakpoint.md ? '' : 'container'">
        <v-layout>

          <div class="d-flex d-md-none">
            <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
          </div>

          <div class="d-none d-md-flex">
            <v-btn class="text-oscuro" text large to="/">
              <v-icon left>{{mdiHome}}</v-icon>
              <span>Inicio</span>
            </v-btn>
            <v-btn class="text-oscuro" text large to="/categorias">
              <v-icon left>{{mdiCart}}</v-icon>
              <span>Categorías</span>
            </v-btn>
            <v-btn class="text-oscuro" text large to="/catalogos">
              <v-icon left>{{mdiLibrary}}</v-icon>
              <span>Catálogos</span>
            </v-btn>
            <v-btn class="text-oscuro" text large to="/contacto">
              <v-icon left>{{mdiCardAccountPhone}}</v-icon>
              <span>Contacto</span>
            </v-btn>
            <v-btn class="text-oscuro" text large to="/nosotros">
              <v-icon left>{{mdiAccountGroup}}</v-icon>
              <span>Nosotros</span>
            </v-btn>
            <v-btn v-if="existeUsuario" class="text-oscuro" text large to="/admin">
              <v-icon left>{{mdiCoffee}}</v-icon>
              <span>Admin</span>
            </v-btn>
            <v-btn v-if="!existeUsuario" class="text-oscuro" text large to="/admin/login">
              <v-icon left>{{mdiCoffee}}</v-icon>
              <span>Login</span>
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
          <v-tooltip v-model="mostrarTooltip" bottom>
            <template v-slot:activator="{on, attrs}">
              <v-btn
                v-on="on"
                v-bind="attrs"
                icon
                @click="cambiarTema"
              >
                <v-icon class="white--text">{{
                  $vuetify.theme.dark
                      ? mdiBrightness4
                      : mdiBrightness7}}
                </v-icon>
              </v-btn>
            </template>
            <span>{{
              $vuetify.theme.dark
                  ? 'Activar modo Claro'
                  : 'Activar modo Oscuro'}}
            </span>
          </v-tooltip>
        </v-layout>
      </div>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        shaped
        top
        :color="
          $vuetify.theme.dark
              ? 'primary'
              : 'grey darken-4'
        "
      >
        {{ textSnackbar }}
        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
            :color="
            $vuetify.theme.dark
                ? 'grey darken-4'
                : 'primary'
          "
            text
            @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
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
        <v-list-item-group v-model="group" class="white--text">
          <v-list-item to="/">
            <v-list-item-title>
              <v-icon left>{{mdiHome}}</v-icon>
              <span>Inicio</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/categorias">
            <v-list-item-title>
              <v-icon left>{{mdiCart}}</v-icon>
              <span>Categorías</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/catalogos">
            <v-list-item-title>
              <v-icon left>{{mdiLibrary}}</v-icon>
              <span>Catálogos</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/contacto">
            <v-list-item-title>
              <v-icon left>{{mdiCardAccountPhone}}</v-icon>
              <span>Contacto</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/nosotros">
            <v-list-item-title>
              <v-icon left>{{mdiAccountGroup}}</v-icon>
              <span>Nosotros</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="existeUsuario" to="/admin">
            <v-list-item-title>
              <v-icon left>{{mdiCoffee}}</v-icon>
              <span>Admin</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!existeUsuario" to="/admin/login">
            <v-list-item-title>
              <v-icon left>{{mdiCoffee}}</v-icon>
              <span>Login</span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {
  mdiBrightness4,
  mdiBrightness7,
  mdiLibrary,
  mdiCardAccountPhone,
  mdiCart,
  mdiAccountGroup,
  mdiCoffee,
  mdiHome,
  mdiMagnify,
  mdiMenu,
} from '@mdi/js';
import { mapGetters } from 'vuex';
import router from '@/router';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      mdiBrightness4,
      mdiBrightness7,
      mdiLibrary,
      mdiCardAccountPhone,
      mdiCart,
      mdiAccountGroup,
      mdiCoffee,
      mdiHome,
      mdiMenu,
      mdiMagnify,
      snackbar: false,
      timeout: 3000,
      textSnackbar: '',
      mostrarTooltip: false,
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
    cambiarTema() {
      if (this.$vuetify.theme.dark) {
        this.textSnackbar = 'Modo Claro Activado';
        this.snackbar = true;
        this.$vuetify.theme.dark = false;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      } else {
        this.textSnackbar = 'Modo Oscuro Activado';
        this.snackbar = true;
        this.$vuetify.theme.dark = true;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      }
    },
  },
  computed: {
    ...mapGetters(['existeUsuario']),
  },
};
</script>

<style>
a {
  text-decoration: none;
  /* margin-top: 15px; */
}

a:hover {
  text-decoration: none;
}

.text-oscuro {
  color: white !important;
}

.bg-claro {
  background: #0077bd !important;
}

.subtitle-1 {
  margin: 0 !important;
}
</style>
