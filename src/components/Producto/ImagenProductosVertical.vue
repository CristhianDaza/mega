<template>
  <div>
    <button @click.prevent="slidePrev" class="iconVertical pb-3">
      <v-icon
        :style="{ color: $vuetify.theme.themes[theme].azul }"
      >
        {{mdiArrowUpBoldCircle}}
      </v-icon>
    </button>
    <Hooper
      :settings="hooperSettings"
      style="height: 600px; width: 100%"
      ref="carousel"
    >
      <slide
        v-for="(imagen, i) in imagenes"
        :key="i"
        :index="i"
      >
        <v-img
          @click="$emit('cambiarImagen', imagen.imagen.file_md, imagen.imagen.file)"
          class="imgSlideVertical"
          aspect-ratio="1.4"
          :src="imagen.imagen.file_sm">
          </v-img>
      </slide>
    </Hooper>
    <button @click.prevent="slideNext" class="iconVertical">
      <v-icon
        :style="{ color: $vuetify.theme.themes[theme].azul }"
      >
        {{mdiArrowDownBoldCircle}}
      </v-icon>
    </button>
  </div>
</template>

<script>
import { mdiArrowUpBoldCircle, mdiArrowDownBoldCircle } from '@mdi/js';
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'ImagenProductosVertical',
  props: ['imagenes'],
  data() {
    return {
      mdiArrowUpBoldCircle,
      mdiArrowDownBoldCircle,
      hooperSettings: {
        vertical: true,
        itemsToShow: 5,
        itemsToSlide: 3,
        trimWhiteSpace: true,
      },
    };
  },
  components: {
    Hooper,
    Slide,
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
  },
};
</script>

<style>
  .imgSlideVertical {
    border: 2px solid rgb(197, 197, 197);
    cursor: pointer;
    transition: 500ms;
    border-radius: 15px;
  }
  .hooper-track {
    padding: 0 !important;
  }
  .imgSlideVertical:hover {
    transition: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border: 2px solid #0077bd;
  }
  .imgSlideVertical:active {
    border: 2px solid rgb(197, 197, 197);
  }
  .hooper-navigation.is-vertical .hooper-prev {
    transform: translate(-48px, -48px) !important;
  }
  .hooper-navigation.is-vertical .hooper-next {
    transform: translate(-48px, 48px) !important;
  }

  .icon-arrowUp, .icon-arrowDown {
    background: #0077bd;
    border-radius: 15px;
  }
  .iconVertical {
    width: 100%;
    margin: 0 auto;
  }
</style>
