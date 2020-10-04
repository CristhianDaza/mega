<template>
  <v-carousel
    height="100%"
    cycle
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in imagenSlider"
      :key="i"
      :src="slide.linkImagen"
      :to="slide.urlProducto"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mdiPauseCircle } from '@mdi/js';
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
};
</script>
