<template>
  <v-footer
    dark
    padless
    :style="{ background: $vuetify.theme.themes.dark.fondoTarjeta }"
  >

    <v-card
      class="flex"
      flat
      tile
      :style="{ background: $vuetify.theme.themes.dark.fondoTarjeta }"
    >
      <v-card-text class="text-center"
      >

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4"
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
              class="mx-4"
              v-on="on"
              v-bind="attrs"
              icon to="/categories"
            >
              <v-icon>{{mdiCart}}</v-icon>
            </v-btn>
          </template>
          <span>Categorías</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4"
              v-on="on"
              v-bind="attrs"
              icon to="/catalogs"
            >
              <v-icon>{{mdiLibrary}}</v-icon>
            </v-btn>
          </template>
          <span>Catalogos</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4"
              v-on="on"
              v-bind="attrs"
              icon to="/contact"
            >
              <v-icon>{{mdiCardAccountPhone}}</v-icon>
            </v-btn>
          </template>
          <span>Contacto</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4"
              v-on="on"
              v-bind="attrs"
              icon to="/about-us"
            >
              <v-icon>{{mdiAccountGroup}}</v-icon>
            </v-btn>
          </template>
          <span>Nosotros</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="mx-4"
              v-on="on"
              v-bind="attrs"
              icon to="/admin"
            >
              <v-icon>{{ mdiCoffee }}</v-icon>
            </v-btn>
          </template>
          <span>{{ isLogin ? "Admin" : "Login" }}</span>
        </v-tooltip>
      </v-card-text>
      <v-card-title>
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
              <a href="https://api.whatsapp.com/send?phone=573159274144&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=" target="_blank" class="white--text">
                <v-icon size="24px">{{mdiWhatsapp}}</v-icon>
              </a>
            </v-btn>
          </div>
        </v-container>
      </v-card-title>

      <v-card-text
        class="py-2 text-center white--text"
        :style="{background: $vuetify.theme.themes.dark.fondoTarjeta}">
        <strong class="title">Megapromocionales LTDA © {{ new Date().getFullYear() }}</strong>
      </v-card-text>
      <v-card-text
        class="text-center"
        :style="[
          { color: $vuetify.theme.themes[theme].textoNegro },
          { background: $vuetify.theme.themes[theme].textoBlanco },
        ]"
      >
        Design by
        <a href="https://co.linkedin.com/in/cristhiandaza?trk=people-guest_people_search-card" target="_blank">
          <strong :style="{color: $vuetify.theme.themes[theme].azul}">
              Cristhian Daza
            </strong>
        </a>
        With 💙
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
  name: 'FooterComponent',
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
    ...mapGetters(['isLogin']),
  },
};
</script>

<style scoped>
  .theme--dark.v-btn--active:before, .theme--dark.v-btn--active:hover:before {
    opacity: 0 !important;
  }
</style>
