<template>
  <v-card>
    <v-responsive>
      <vueper-slides
        autoplay
        :pause-on-hover="pauseOnHover"
        fractions
        progress
        transition-speed="550"
        class="no-shadow"
        :breakpoints="breakpoints"
      >
        <vueper-slide
          v-for="(slide, i) in imagenSlider"
          :key="i"
          :image="slide.linkImagen"
          :link="slide.urlProducto"
          width="100%"
        >
        </vueper-slide>
      </vueper-slides>
    </v-responsive>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mdiPauseCircle } from '@mdi/js';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {
  data() {
    return {
      mdiPauseCircle,
      pauseOnHover: true,
      autoPlaying: true,
      breakpoints: {
        600: {
          arrows: false,
          bulletsOutside: true,
        },
      },
    };
  },
  methods: {
    ...mapActions(['traerImagenSlider']),
  },
  computed: {
    ...mapState(['imagenSlider']),
  },
  mounted() {
    this.traerImagenSlider();
  },
  components: { VueperSlides, VueperSlide },
};
</script>

<style>
  .vueperslides__arrow {
    color: black;
    height: 100%;
  }
  .vueperslides__arrow:hover {
    background: rgba(255, 255, 255, .6);
  }
  .vueperslides__progress {
    background: rgba(0, 0, 0, 0.25);
    color: #ff5252;
  }
</style>
