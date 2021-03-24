<template>
  <div>
    <img
      v-if="imagenPrincipalMediana === ''" :class="$vuetify.breakpoint.xs ?
        ''
        : 'fotoTarjetaGrande'"
      class="fotoTarjeta elevation-18"
      @click.stop="dialog = true"
      :src="producto.imagenes[0].imagen.file_md"
      :alt="producto.descripcion_comercial"
    />

    <img
      v-else
      :class="$vuetify.breakpoint.xs ?
        ''
        : 'fotoTarjetaGrande'"
      class="fotoTarjeta elevation-18"
      @click.stop="dialog = true"
      :src="imagenPrincipalMediana"
      :alt="producto.descripcion_comercial"
    />

    <div v-if="producto.caracteristicas.length > 0" class="mt-8 mr-5 ml-2">
      <h1
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="text-subtitle-2">Características:</h1>
      <v-row>
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
      :style="{background: $vuetify.theme.themes[theme].background}"
      v-if="this.textoInfo !== ''" class="mt-5 elevation-10">
      <v-card-text class="pb-0">
        <p
          :style="{color: $vuetify.theme.themes[theme].basetexto}"
        >{{textoInfo}}</p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn color="primary" small @click="cerrarTextoInfo">Cerrar</v-btn>
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
  props: ['producto', 'imagenPrincipalMediana', 'imagenPrincipalGrande'],
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
  .fotoTarjetaGrande {
    margin-left: 20px;
  }

  .fotoTarjeta {
    margin-top: -45px;
    width: 100%;
    max-width: 100%;
    cursor: zoom-in;
  }

  .imagenCaracteristica {
   width: 80px;
   cursor: pointer;
   margin-top: 15px;
  }
</style>
