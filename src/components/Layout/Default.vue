<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Cabecera />
    <MenuPrincipal />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
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
          right
          :color="
            $vuetify.theme.dark
              ? 'blue-grey darken-4'
              : 'primary'
            "
          fixed
          class="elevation-15 mr-15 mb-6"
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
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
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
