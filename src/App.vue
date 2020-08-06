<template>
  <v-app>
    <Cabecera />
    <MenuPrincipal />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <Footer />
    <v-speed-dial>
      <template v-slot:activator>
        <v-btn
          v-scroll="onScroll"
          v-show="mostrarBoton"
          fab
          dark
          bottom
          left
          :color="
            $vuetify.theme.dark
              ? 'blue-grey darken-4'
              : 'primary'
            "
          fixed
          class="elevation-15 ml-5 mb-6"
          @click="$vuetify.goTo(target, options)"
        >
          <v-icon>{{mdiArrowUpDropCircle}}</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
  </v-app>
</template>

<script>
import Cabecera from '@/components/Global/Cabecera.vue';
import MenuPrincipal from '@/components/Global/MenuPrincipal.vue';
import Footer from '@/components/Global/Footer.vue';
import { mdiArrowUpDropCircle } from '@mdi/js';

export default {

  data: () => ({
    mdiArrowUpDropCircle,
    mostrarBoton: false,
    duration: 1000,
    number: 1,
    offset: 0,
    easing: 'easeInQuart',
    type: 'number',
    name: 'App',
  }),
  components: {
    Cabecera,
    MenuPrincipal,
    Footer,
  },
  computed: {
    target() {
      const value = this[this.type];
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(value)) return Number(value);
      return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.mostrarBoton = top > 200;
    },
  },
  mounted() {
    const theme = localStorage.getItem('darkTheme');
    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
  metaInfo: {
    title: 'Megapromocionales LTDA',
    titleTemplate: '%s | Megapromocionales LTDA',
  },
};
</script>

<style>
  @media (min-width: 1904px) {
    .container {
      max-width: 1185px !important;
    }
  }
</style>
