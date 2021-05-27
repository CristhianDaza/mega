<template>
<!-- eslint-disable max-len -->
  <div>
    <DesProducto
      :descripcion="producto"
    />
    <template v-if="existeUsuario">
      <PrecioProducto
        :precio="producto"
        :materiales="materiales"
      />
    </template>
    <v-card-text class="pt-0">
      <div v-if="existeUsuario">
        <p v-if="producto.texto_informacion !== null" class="ma-0" :style="'color: ' + producto.color_texto_informacion">{{producto.texto_informacion}}</p>
      </div>
    </v-card-text>
    <v-card-text
      class="d-block title my-2 py-0"
      :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
      v-if="Math.round(producto.materiales[0].precio_descuento) !== Math.round(producto.materiales[0].precio)">
        {{Math.abs(Math.round(producto.materiales[0].descuento))}}% de descuento.
    </v-card-text>
    <v-card-actions>
      <v-row class="ml-1">
        <template v-if="producto.etiquetas.length > 0">
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
    <v-card-actions class="ml-1 pt-0">
      <v-btn
        block
        large
        outlined
        color="white"
        @click="loader = 'loading'"
        :loading="loading"
        :disabled="loading"
        :href="`https://marpicoprod.azurewebsites.net/api/productos/imagenes/${producto.id}?producto=${producto.familia}`"
      >
        Descargar Imágenes
        <v-icon>
          {{ mdiDownload }}
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-actions class="ml-1 pt-0" v-if="producto.materiales[0].en_transito > 0">
      <v-btn
        outlined
        block
        large
        color="white"
        class="my-1 pa-4"
        @click.stop="$emit('dialogo')"
      >
        Importaciones
        <v-icon class="ml-1">
          {{mdiFerry}}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  mdiFerry,
  mdiDownload,
  mdiCloseCircleOutline,
} from '@mdi/js';
import DesProducto from '@/components/Producto/DesProducto.vue';
import PrecioProducto from '@/components/Producto/PrecioProducto.vue';

export default {
  data() {
    return {
      mdiFerry,
      mdiDownload,
      mdiCloseCircleOutline,
      loading: false,
    };
  },
  props: ['producto', 'materiales', 'transito'],
  computed: {
    ...mapGetters(['existeUsuario']),
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  components: {
    DesProducto,
    PrecioProducto,
  },
};
</script>
