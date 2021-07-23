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
      :style="{ color: $vuetify.theme.themes[theme].azul }"
      v-if="Math.round(producto.materiales[0].precio_descuento) !== Math.round(producto.materiales[0].precio)">
        Producto con descuento del {{Math.abs(Math.round(producto.materiales[0].descuento))}}%.
    </v-card-text>
    <v-card-actions class="ml-1 pt-0">
      <v-btn
        block
        large
        outlined
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        :loading="loading"
        :disabled="loading"
        @click="descargarImagenes(producto.id, producto.familia)"
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
        :style="{ color: $vuetify.theme.themes[theme].azul }"
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'InfoProducto',
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
  },
  components: {
    DesProducto,
    PrecioProducto,
  },
  methods: {
    async descargarImagenes(id, familia) {
      this.loading = true;
      const urlBlob = `https://marpicoprod.azurewebsites.net/api/productos/imagenes/${id}?producto=${familia}`;

      await axios({
        methods: 'GET',
        url: urlBlob,
        responseType: 'blob',
      })
        .then((res) => {
          const blob = new Blob([res.data], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);
          window.location.href = url;
        })
        .catch(() => {
          Swal.fire(
            'Error!',
            'Hubo un error, intente de nuevo.',
            'error',
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
