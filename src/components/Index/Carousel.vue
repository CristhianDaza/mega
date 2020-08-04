<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'" class="mt-5">
    <v-carousel
      cycle
      height="100%"
      class="elevation-15"
    >
      <v-carousel-item
        v-for="(slide, i) in imagenSlider"
        :key="i"
        :to="slide.urlProducto"
      >
        <v-img
          :src="slide.linkImagen"
          lazy-src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/loading.jpg?alt=media&token=dcce3238-e449-43fb-9a53-7403c3f74821"
          :alt="slide.nombreProducto"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="white"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
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
