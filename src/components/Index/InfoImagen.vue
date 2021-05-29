<template>
  <div
    :style="{ backgroundImage: `url(${Informacion})` }"
    class="fondoInformacion mt-5"
  >
    <h1
      :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
      class="mb-2 py-5 text-center font-weight-black"
      :style="{color: '#ffcd17'}"
    >
      Newsletters
    </h1>
    <v-row class="mx-0">
      <v-col
        v-for="imagen in imagenInfo"
        :key="imagen.id"
        cols="6"
        sm="3"
        md="2"
        lg="2"
      >
        <router-link :to="imagen.url">
          <v-img
            :src="imagen.linkImagen"
            :alt="imagen.nombre"
            class="imagenInfo"
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
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from '@/components/Global/Loader.vue';
import Informacion from '@/assets/informacion.svg';

export default {
  data() {
    return {
      Informacion,
    };
  },
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
<style>
.fondoInformacion {
  background-size: 100%;
  background-position: bottom;
}
.imagenInfo {
  border-radius: 10px;
}
</style>
