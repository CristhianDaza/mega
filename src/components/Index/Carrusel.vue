<template>
  <carousel
    :per-page="1"
    :autoplay="true"
    :loop="true"
    :paginationEnabled="false"
    :speed="1000"
    :autoplayTimeout="5000"
    :navigationEnabled="true"
  >
    <slide
      v-for="(slide, i) in imagenSlider"
      :key="i"
    >
      <router-link :to="slide.urlProducto">
        <img width="100%" height="100%" :src="slide.linkImagen" :alt="slide.nombreProducto">
      </router-link>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Carousel,
    Slide,
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

<style>
.VueCarousel-navigation-prev {
  transform: translateX(0) !important;
  left: 0;
}

.VueCarousel-navigation-next {
  transform: translateX(0) !important;
  right: 0;
}

.VueCarousel-navigation-button{
  background-color: rgba(0, 0, 0, 0.1) !important;
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

.VueCarousel-navigation-button:hover {
  background-color: rgba(0, 0, 0, 0.8) !important;
  opacity: 1;
}
</style>
