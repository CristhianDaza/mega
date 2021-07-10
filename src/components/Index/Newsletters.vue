<template>
  <div
    :style="{background: $vuetify.theme.themes[theme].primary}"
  >
    <div
      :style="{ backgroundImage: `url(${Informacion})` }"
      class="fondoInformacion pt-10 pb-5"
    >
      <h1
        :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
        class="mb-2 py-5 text-center font-weight-black"
        :style="{color: '#ffcd17'}"
      >
        Newsletters
      </h1>
      <v-row class="mx-0 animacion">
        <v-col
          v-for="imagen in imagenInfo"
          :key="imagen.id"
          cols="6"
          sm="3"
          md="2"
          class="contenedorAnimacion"
        >
          <router-link :to="imagen.url">
            <img
              :src="imagen.linkImagen"
              :alt="imagen.nombre"
              class="imagenInfo"
            >
          </router-link>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Informacion from '@/assets/informacion.svg';

export default {
  name: 'Newsletters',
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
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  mounted() {
    this.traerImagenInfo();
  },
};
</script>
<style>
.fondoInformacion {
  background-size: 100%;
  background-position: bottom;
}

.contenedorAnimacion {
  position: relative;
}

.imagenInfo {
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  transition: all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.imagenInfo:hover {
  transform: scale(1.05);
}

.animacion {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  animation: newletter 2s linear infinite alternate-reverse;
  position: relative;
}

.animacion:hover{
  animation-play-state: paused;
}

@keyframes newletter {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
