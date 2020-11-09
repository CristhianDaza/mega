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
      <v-card-text class="text-center"
        :style="{background: $vuetify.theme.themes[theme].basemenu}"
      >

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
              icon to="/categorias"
            >
              <v-icon>{{mdiCart}}</v-icon>
            </v-btn>
          </template>
          <span>Categorías</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4 white--text"
              v-on="on"
              v-bind="attrs"
              icon to="/catalogos"
            >
              <v-icon>{{mdiLibrary}}</v-icon>
            </v-btn>
          </template>
          <span>Catalogos</span>
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
      <v-card-title
        :style="{background: $vuetify.theme.themes[theme].basemenu}"
      >
        <v-container>
          <strong class="subheading">¡Síguenos en las redes sociales!</strong>
          <div class="float-right">
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
          </div>
        </v-container>
      </v-card-title>

      <v-card-text class="py-2 text-center white--text secondary">
        <strong class="title">Megapromocionales LTDA © {{ new Date().getFullYear() }}</strong>
      </v-card-text>
      <v-card-text
        class="text-center white"
        :style="{color: $vuetify.theme.themes.light.basetexto}"
      >
        Design by <strong class="primary--text">Cristhian Daza</strong> With 💙
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
    mdiFacebook,
    mdiInstagram,
    mdiGmail,
    mdiWhatsapp,
    mdiCoffee,
  }),
  computed: {
    ...mapGetters(['existeUsuario']),
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
};
</script>
