<template>
  <div>
    <v-img
      alt="Productos Megapromocionales"
      :src="img"
      height="220px"
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
      <v-container
        class="fill-height white--text"
        :class="this.$vuetify.breakpoint.xs ? 'title fondoOscuro' : 'headline'"
        justify="center">
        <h1
          :class="{ 'mitadAncho' : this.$vuetify.breakpoint.xs }"
          :style="{color: $vuetify.theme.themes.dark.basetexto}"
        >{{ title }}</h1>
      </v-container>
    </v-img>
  </div>
</template>

<script>
import img from '@/assets/img/header.webp';

export default {
  name: 'HeroComponent',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      img,
    };
  },
  components: {
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
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
