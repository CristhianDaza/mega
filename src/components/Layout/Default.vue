<template>
<div>
  <v-app :style="{ background: $vuetify.theme.themes[theme].primary }">
    <Cabecera />
    <MenuPrincipal />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <FooterComponent />
    <v-speed-dial>
      <template v-slot:activator>
        <v-btn
          v-scroll="onScroll"
          v-show="mostrarBoton"
          fab
          dark
          bottom
          right
          :color="'#111b27'"
          fixed
          class="elevation-15 mr-15 mb-6"
          @click="$vuetify.goTo(target, options)"
        >
          <v-icon>{{mdiArrowUpDropCircle}}</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
  </v-app>
  </div>
</template>

<script>
import { mdiArrowUpDropCircle } from '@mdi/js';

export default {
  name: 'DefaultLayout',
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
    Cabecera: () => import(/* webpackChunkName: "cabecera" */ '@/components/Global/Cabecera.vue'),
    MenuPrincipal: () => import(/* webpackChunkName: "menuPrincipal" */ '@/components/Global/MenuPrincipal.vue'),
    FooterComponent: () => import(/* webpackChunkName: "footer" */ '@/components/Global/Footer.vue'),
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
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
  metaInfo: {
    title: 'Megapromocionales LTDA',
    titleTemplate: '%s | Megapromocionales LTDA',
  },
};
</script>

<style>
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-2em);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all.3s ease;
  }

  @media (min-width: 1904px) {
    .container {
      max-width: 1185px !important;
    }
  }
</style>
