<template>
  <v-sheet
    :style="{background: $vuetify.theme.themes[theme].basebackground}"
    class="mx-auto mt-3"
    elevation="2">
    <v-slide-group
      v-model="model"
      class="px-4 py-5"
      :prev-icon="mdiChevronLeft"
      :next-icon="mdiChevronRight"
    >
      <v-slide-item v-for="imagen in imagenes" :key="imagen.id">
        <v-row class="grupoImagenes">
          <v-card class="mx-1" outlined>
            <v-img
              @click="$emit('cambiarImagen', imagen.imagen.file_md, imagen.imagen.file)"
              :alt="imagenes.nombre_original"
              width="150"
              :src="imagen.imagen.file_sm"
              class="imagenReferencia"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <Loader />
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-row>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import Loader from '@/components/Global/Loader.vue';
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
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  components: {
    Loader,
  },
};
</script>

<style>
  .grupoImagenes {
    margin: 0 !important;
  }
  .imagenReferencia {
    cursor: pointer;
    transition: 500ms;
    opacity: .3;
  }

  .imagenReferencia:hover {
    opacity: 1;
  }
</style>
