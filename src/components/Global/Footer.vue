<template>
  <v-footer
    dark
    padless
  >

    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-text class="text-center" :class="
          $vuetify.theme.dark
              ? 'grey darken-4'
              : 'primary'
        ">

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/"
            >
              <v-icon>{{mdiHome}}</v-icon>
            </v-btn>
          </template>
          <span>Inicio</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/productos"
            >
              <v-icon>{{mdiCart}}</v-icon>
            </v-btn>
          </template>
          <span>Productos</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/catalogo"
            >
              <v-icon>{{mdiLibrary}}</v-icon>
            </v-btn>
          </template>
          <span>Catalogo</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/contacto"
            >
              <v-icon>{{mdiCardAccountPhone}}</v-icon>
            </v-btn>
          </template>
          <span>Contacto</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/nosotros"
            >
              <v-icon>{{mdiAccountGroup}}</v-icon>
            </v-btn>
          </template>
          <span>Nosotros</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/buscar"
            >
              <v-icon>{{mdiMagnify}}</v-icon>
            </v-btn>
          </template>
          <span>Buscar</span>
        </v-tooltip>

        <v-tooltip v-if="existeUsuario" bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/admin"
            >
              <v-icon>{{mdiCoffee}}</v-icon>
            </v-btn>
          </template>
          <span>Admin</span>
        </v-tooltip>

        <v-tooltip v-if="!existeUsuario" bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/admin/login"
            >
              <v-icon>{{mdiCoffee}}</v-icon>
            </v-btn>
          </template>
          <span>Login</span>
        </v-tooltip>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-title :class="
          $vuetify.theme.dark
              ? 'grey darken-4'
              : 'primary'
        ">
        <strong class="subheading">¡Conéctate con nosotros en las redes sociales!</strong>

        <v-spacer></v-spacer>

        <v-btn
          class="mx-4"
          icon
        >
          <a href="https://www.facebook.com/Mega-Promocionales-242144370051788/" target="_blank" class="white--text">
            <v-icon size="24px">{{mdiFacebook}}</v-icon>
          </a>
        </v-btn>

        <v-btn
          class="mx-4"
          icon
        >
          <a href="https://www.instagram.com/megapromocional/" target="_blank" class="white--text">
            <v-icon size="24px">{{mdiInstagram}}</v-icon>
          </a>
        </v-btn>

        <v-btn
          class="mx-4"
          icon
        >
          <a href="mailto:megapromocional@gmail.com" target="_blank" class="white--text">
            <v-icon size="24px">{{mdiGmail}}</v-icon>
          </a>
        </v-btn>

        <v-btn
          class="mx-4"
          icon
        >
          <a href="https://api.whatsapp.com/send?phone=573159275144&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=" target="_blank" class="white--text">
            <v-icon size="24px">{{mdiWhatsapp}}</v-icon>
          </a>
        </v-btn>

      </v-card-title>

      <v-card-text class="py-2 text-center white--text" :class="
          $vuetify.theme.dark
              ? 'blue-grey darken-3t'
              : ''
        ">
        {{ new Date().getFullYear() }} — <strong>Megapromocionales</strong>
      </v-card-text>
      <v-card-text class="float-right primary--text white">
        Design by <strong>Cristhian Daza</strong> With 💙
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import {
  mdiLibrary,
  mdiCardAccountPhone,
  mdiCart,
  mdiAccountGroup,
  mdiHome,
  mdiMagnify,
  mdiFacebook,
  mdiInstagram,
  mdiGmail,
  mdiWhatsapp,
  mdiCoffee,
} from '@mdi/js';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    mdiHome,
    mdiCart,
    mdiLibrary,
    mdiCardAccountPhone,
    mdiAccountGroup,
    mdiMagnify,
    mdiFacebook,
    mdiInstagram,
    mdiGmail,
    mdiWhatsapp,
    mdiCoffee,
  }),
  computed: {
    ...mapGetters(['existeUsuario']),
  },
};
</script>
