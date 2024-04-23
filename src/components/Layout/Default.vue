<template>
  <div>
    <v-app :style="{ background: $vuetify.theme.themes[theme].primary }">
      <header-component />
      <MainMenu />
      <v-main>
        <router-view :key="$route.fullPath" />
      </v-main>
      <FooterComponent />
      <v-speed-dial>
        <template v-slot:activator>
          <v-btn
            v-scroll="onScroll"
            v-show="showButton"
            fab
            dark
            bottom
            right
            fixed
            class="elevation-15 mr-15 mb-6"
            @click="$vuetify.goTo(target, options)"
            :style="{ background: $vuetify.theme.themes[theme].invertSecondary }"
          >
            <v-icon>{{mdiArrowUpDropCircle}}</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </v-app>
    <div v-if="!getProducts" class="component-loader">
      <Loader />
    </div>
  </div>
</template>

<script>
import { mdiArrowUpDropCircle } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DefaultLayout',
  data: () => ({
    mdiArrowUpDropCircle,
    showButton: false,
    duration: 1000,
    number: 1,
    offset: 0,
    easing: 'easeInQuart',
    type: 'number',
    name: 'App',
  }),
  components: {
    HeaderComponent: () => import(/* webpackChunkName: "headerComponent" */ '@/components/Global/HeaderComponent.vue'),
    MainMenu: () => import(/* webpackChunkName: "mainMenu" */ '@/components/Global/MainMenu.vue'),
    FooterComponent: () => import(/* webpackChunkName: "footer" */ '@/components/Global/Footer.vue'),
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
  },
  computed: {
    ...mapGetters('products', ['getProducts']),
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
    ...mapActions('products', ['setProducts']),
    onScroll(e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showButton = top > 200;
    },
  },
  async mounted() {
    const theme = localStorage.getItem('darkTheme');
    if (theme) {
      this.$vuetify.theme.dark = theme === 'true';
    } else {
      this.$vuetify.theme.dark = false;
    }
    if (!this.getProducts) {
      await this.setProducts();
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

  .component-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(17, 27, 39, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
