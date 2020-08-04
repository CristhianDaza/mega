<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-row>
      <v-col cols="12" v-for="imagen in imagenInfo" :key="imagen.id">
        <v-img :src="imagen.linkImagen" :alt="imagen.nombre">
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['traerImagenInfo']),
  },
  computed: {
    ...mapState(['imagenInfo']),
  },
  mounted() {
    this.traerImagenInfo();
  },
};
</script>
