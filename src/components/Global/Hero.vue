<template>
  <div>
    <v-img
      alt="Productos Megapromocionales"
      :src="Imagen"
      height="220px"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
        </v-row>
      </template>
      <v-container
        class="fill-height white--text"
        :class="this.$vuetify.breakpoint.xs ? 'title fondoOscuro' : 'headline'"
        justify="center">
        <h1 :class="this.$vuetify.breakpoint.xs ? '' : 'mitadAncho'">{{titulo}}</h1>
      </v-container>
    </v-img>
  </div>
</template>

<script>
import Imagen from '@/assets/megapromocionales.webp';

export default {
  props: ['titulo'],
  data() {
    return {
      Imagen,
    };
  },
};
</script>

<style>
  .mitadAncho {
    left: 0;
    width: 50%;
    line-height: 50px;
  }
</style>
