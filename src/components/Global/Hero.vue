<template>
  <div>
    <v-img
      alt="Productos Megapromocionales"
      src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/hero.jpg?alt=media&token=c2526e4e-2b16-474c-9cbc-327d77a06afc"
      lazy-src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/hero_opt.jpg?alt=media&token=81cac8a5-4d86-4d67-8c1b-b9b54d23c50b"
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
export default {
  props: ['titulo'],
};
</script>

<style>
  .mitadAncho {
    left: 0;
    width: 50%;
    line-height: 50px;
  }
</style>
