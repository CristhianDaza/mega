<template>
  <div>
    <img
      v-if="imagenPrincipalMediana === ''"
      class="fotoTarjeta border-black elevation-18"
      @click.stop="dialog = true"
      :src="producto.imagenes[0].imagen.file_md"
      :alt="producto.descripcion_comercial"
    />

    <img
      v-else
      class="fotoTarjeta border-black elevation-18"
      @click.stop="dialog = true"
      :src="imagenPrincipalMediana"
      :alt="producto.descripcion_comercial"
    />
      <p
        class="mt-5 white--text font-weight-bold">
          El color de los artículos pueden variar según la calibración y resolución de la pantalla.
        </p>
    <v-card-actions v-if="producto.etiquetas.length > 0">
      <v-row>
        <template>
          <div
            v-for="etiqueta in producto.etiquetas"
            :key="etiqueta.id"
          >
            <img
              width="150px"
              :src="etiqueta.imagen.file_sm"
              :alt="etiqueta.nombre"
              >
          </div>
        </template>
      </v-row>
    </v-card-actions>
    <div v-if="producto.caracteristicas.length > 0" class="mt-8">
      <h1
        class="headline"
        :style="{color: '#005C91'}"
        >
          Características:
        </h1>
      <v-row class="ml-1">
        <template v-for="caracteristica in producto.caracteristicas">
          <v-tooltip top :key="caracteristica.id">
            <template v-slot:activator="{on, attrs}">
              <img
                class="imagenCaracteristica"
                :src="caracteristica.imagen"
                v-on="on"
                v-bind="attrs"
                :alt="caracteristica.nombre"
                @click.stop="mostrarTextoInfo(caracteristica.descripcion)">
            </template>
            <span>{{caracteristica.nombre}}</span>
          </v-tooltip>
        </template>
      </v-row>
    </div>
    <v-card
      v-if="this.textoInfo !== ''" class="mt-5 fondoInfo">
      <v-card-text class="pb-0">
        <p
          class="white--text"
        >{{textoInfo}}</p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn color="white" block outlined small @click="cerrarTextoInfo">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="850"
      overlay-color="grey darken-4"
      overlay-opacity="0.9"
    >
      <v-btn dark icon class="float-right mr-5" color="white" @click.stop="dialog = false">
        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
      </v-btn>
      <img
        v-if="imagenPrincipalGrande === ''" :src="producto.imagenes[0].imagen.file"
        max-height="100%"
        :alt="producto.descripcion_comercial"
      />
      <img
        v-else
        :src="imagenPrincipalGrande"
        max-height="100%"
        :alt="producto.descripcion_comercial"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiCloseCircleOutline } from '@mdi/js';

export default {
  data() {
    return {
      textoInfo: '',
      dialog: false,
      mdiCloseCircleOutline,
    };
  },
  props: ['producto', 'imagenPrincipalMediana', 'imagenPrincipalGrande', 'inventarioDisponible'],
  methods: {
    mostrarTextoInfo(texto) {
      this.textoInfo = texto;
    },

    cerrarTextoInfo() {
      this.textoInfo = '';
    },
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
};
</script>

<style>

  .fotoTarjeta {
    width: 100%;
    max-width: 100%;
    cursor: zoom-in;
  }

  .imagenCaracteristica {
   width: 80px;
   cursor: pointer;
   margin-top: 15px;
  }

  .border-black {
    border: 2px solid rgb(197, 197, 197);
    border-radius: 10px;
  }
  .fondoInfo {
      background: rgba( 255, 255, 255, 0.25 ) !important;
      box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ) !important;
      backdrop-filter: blur( 4px ) !important;
      -webkit-backdrop-filter: blur( 4px ) !important;
      border-radius: 10px !important;
      border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
  }
</style>
