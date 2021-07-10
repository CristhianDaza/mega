<template>
  <div
    :style="{ backgroundImage: `url(${this.$vuetify.theme.dark ? newsletterDark : newsletter })` }"
    class="fondoInformacion pt-10 pb-5"
  >
    <h1
      :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
      class="mb-2 py-5 text-center font-weight-black"
      :style="{color: $vuetify.theme.themes[theme].colorText}"
    >
      BOLETÍN
    </h1>
    <div id="infinite" class="mx-0 slider">
      <div class="contenedor barrier">
        <div class="lane">
          <div class="car"
            v-for="imagen in imagenInfo"
            :key="imagen.id"
          >
            <router-link :to="imagen.url">
              <img
                :src="imagen.linkImagen"
                :alt="imagen.nombre"
                class="imagenInfo"
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import newsletter from '@/assets/newsletter.svg';
import newsletterDark from '@/assets/newsletter-dark.svg';

export default {
  name: 'Newsletters',
  data() {
    return {
      newsletter,
      newsletterDark,
    };
  },
  methods: {
    ...mapActions(['traerImagenInfo']),
  },
  computed: {
    ...mapState(['imagenInfo']),
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  mounted() {
    this.traerImagenInfo();
  },
};
</script>
<style>
.fondoInformacion {
  background-size: 100%;
  background-position: bottom;
}

.imagenInfo {
  border-radius: 10px;
  width: 300px;
  transition: all .3s;
}

.imagenInfo:hover {
  transform: scale(.99);
}

.contenedor {
  transition: all .3s ease;
}

.slider {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 800px;
}

.slider .barrier {
  overflow: hidden;
  position: relative;
}

.slider .lane {
  display: flex;
  height: 100%;
}

.slider .lane .car {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#infinite .barrier .lane {
  width: calc(4200px)
}

#infinite .barrier .lane .car {
  width: 100%;
  animation: translateInfinite 30s linear infinite;
}

@keyframes translateInfinite {
  100% {
    transform: translateX(calc(-2100px));
  }
}
</style>
