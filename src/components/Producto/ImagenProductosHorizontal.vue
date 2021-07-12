<template>
  <v-sheet
    class="mx-auto infoProd"
    elevation="2">
    <v-slide-group
      v-model="model"
      class="px-2 py-2"
      :prev-icon="mdiChevronLeft"
      :next-icon="mdiChevronRight"
    >
      <v-slide-item v-for="imagen in imagenes" :key="imagen.id">
        <v-row class="grupoImagenes">
          <v-card
            outlined
            fondoCard
          >
            <v-img
              @click="$emit('cambiarImagen', imagen.imagen.file_md, imagen.imagen.file)"
              :alt="imagenes.nombre_original"
              width="150"
              max-height="100"
              :src="imagen.imagen.file_sm"
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
  data() {
    return {
      mdiChevronRight,
      mdiChevronLeft,
      model: null,
    };
  },
  props: ['imagenes'],
};
</script>

<style>
  .grupoImagenes {
    margin: 0 !important;
  }
</style>
