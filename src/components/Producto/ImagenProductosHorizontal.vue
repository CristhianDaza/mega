<template>
  <v-sheet
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }">
    <v-slide-group
      v-model="model"
      class="px-2 py-2"
      :prev-icon="mdiChevronLeft"
      :next-icon="mdiChevronRight"
    >
      <v-slide-item v-for="(image, i) in images" :key="i">
        <v-row class="grupoImagenes">
          <v-card
            outlined
            fondoCard
          >
            <v-img
              @click="$emit('changeImage', image)"
              :alt="image"
              width="150"
              max-height="100"
              :src="image"
              class="imagenReferencia"
              contain
            >
            </v-img>
          </v-card>
        </v-row>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import {
  mdiChevronRight,
  mdiChevronLeft,
} from '@mdi/js';

export default {
  name: 'ImagenProductosHorizontal',
  data() {
    return {
      mdiChevronRight,
      mdiChevronLeft,
      model: null,
    };
  },
  props: ['images'],
};
</script>

<style>
  .grupoImagenes {
    margin: 0 !important;
  }
</style>
