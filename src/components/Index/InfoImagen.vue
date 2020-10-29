<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-row class="mx-0">
      <v-col cols="12" v-for="imagen in imagenInfo" :key="imagen.id">
        <router-link :to="imagen.url">
          <v-img :src="imagen.linkImagen" :alt="imagen.nombre">
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
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from '@/components/Global/Loader.vue';

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
  components: {
    Loader,
  },
};
</script>
