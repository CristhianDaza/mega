<template>
  <v-container>
    <h1>Ver Trabajo</h1>
    <p>{{id}}</p>
  </v-container>
</template>

<script>
export default {
  name: 'trabajo',
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
