<template>
<div>
  <div class="bubble bubble-one glassmorphism-effect"></div>
  <div class="bubble bubble-two glassmorphism-effect"></div>
  <div class="bubble bubble-three glassmorphism-effect"></div>
  <div class="bubble bubble-four glassmorphism-effect"></div>
  <div class="bubble bubble-five glassmorphism-effect"></div>
  <div class="bubble bubble-six glassmorphism-effect"></div>
  <div class="bubble bubble-seven glassmorphism-effect"></div>
  <v-app class="fondoApp">
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
          right
          :color="
            $vuetify.theme.dark
              ? '#0077bd'
              : '#111b27'
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
  </div>
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
  .fondoApp{
    background-image: linear-gradient(to right bottom,
      #008dde,
      #0081e4,
      #0073e7,
      #0064e8,
      #0252e6) !important;
  }
  .glassmorphism-effect {
    background: rgba( 255, 255, 255, 0.10 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    -webkit-backdrop-filter: blur( 4px );
            backdrop-filter: blur( 4px );
    border-radius: 16px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
  .bubble {
    border-radius: 50%;
    position: absolute;
  }

  .bubble-one {
    height: 80px;
    left: 250px;
    top: 250px;
    width: 80px;
  }

  .bubble-two {
    height: 230px;
    right: 200px;
    top: 150px;
    width: 230px;
  }

  .bubble-three {
    height: 50px;
    right: 400px;
    top: 200px;
    width: 50px;
  }

  .bubble-four {
    bottom: 40px;
    height: 100px;
    left: -30px;
    width: 100px;
  }
  .bubble-five {
    bottom: -200px;
    height: 170px;
    left: 250px;
    width: 170px;
  }
  .bubble-six {
    height: 230px;
    right: 300px;
    bottom: -350px;
    width: 230px;
  }
  .bubble-seven {
    height: 350px;
    right: -150px;
    bottom: -800px;
    width: 350px;
  }

  @media (min-width: 1904px) {
    .container {
      max-width: 1185px !important;
    }
  }
</style>
