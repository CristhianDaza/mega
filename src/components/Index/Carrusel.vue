<template>
  <carousel
    :per-page="1"
    :autoplay="true"
    :loop="true"
    :paginationEnabled="false"
    :speed="1000"
    :autoplayTimeout="5000"
    :navigationEnabled="true"
    :class="{ 'dark' : this.$vuetify.theme.dark }"
  >
    <slide
      v-for="(slide, i) in imagenSlider"
      :key="i"
    >
      <router-link :to="slide.urlProducto">
        <img
          width="100%"
          height="100%"
          :src="slide.linkImagen"
          :alt="slide.nombreProducto"
          @click="setSelectedMenu(slide.urlProducto)"
        >
      </router-link>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CarrouselComponent',
  components: {
    Carousel,
    Slide,
  },
  methods: {
    ...mapActions(['traerImagenSlider']),
    ...mapActions('menu', ['setSelectedMenu']),
  },
  computed: {
    ...mapState(['imagenSlider']),
  },
  mounted() {
    this.traerImagenSlider();
  },
};
</script>

<style>
.VueCarousel-navigation-prev {
  transform: translateX(0) !important;
  left: 0;
  color: #FFCD17 !important;
}

.dark .VueCarousel-navigation-prev {
  color: #05090c !important;
}

.VueCarousel-navigation-next {
  transform: translateX(0) !important;
  right: 0;
  color: #FFCD17 !important;
}

.dark .VueCarousel-navigation-next {
  color: #05090c !important;
}

.VueCarousel-navigation-button{
  background-color: rgba(0, 92, 145, 0.1) !important;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  height: 100%;
  position: absolute;
  top: 0 !important;
  transition-duration: 0.5s;
  width: 50px;
}
.dark .VueCarousel-navigation-button {
  background-color: rgba(17, 27, 39, 0.1) !important;
}

.VueCarousel-navigation-button:hover {
  background-color: rgba(0, 92, 145, 0.8) !important;
  opacity: 1;
}

.VueCarousel-navigation-button:active {
  background-color: rgba(0, 92, 145, 0.1) !important;
}

.VueCarousel-navigation-button:focus {
  outline: none !important;
}

.dark .VueCarousel-navigation-button:hover {
  background-color: rgba(17, 27, 39, 0.8) !important;
}

.dark .VueCarousel-navigation-button:active {
  background-color: rgba(17, 27, 39, 0.1) !important;
}

.dark .VueCarousel-navigation-button:focus {
  outline: none !important;
}
</style>
