<template>
  <div>
    <DesProducto
      :description="product"
    />
    <template v-if="isLogin">
      <PrecioProducto
        :price="product"
        :materiales="materiales"
      />
    </template>
    <v-card-text class="pt-0">
      <p
        v-if="product.texto_informacion"
        class="ma-0 text-caption"
      >
        {{ replaceSeller(product.texto_informacion) }}
      </p>
    </v-card-text>
    <v-card-text
      class="d-block title my-2 py-0"
      :style="{ color: $vuetify.theme.themes[theme].azul }"
      v-if="Math.round(product.materiales[0].precio_descuento) !==
      Math.round(product.materiales[0].precio)"
    >
      {{Math.abs(Math.round(product.materiales[0].descuento))}}% de descuento.
    </v-card-text>
    <div class="ml-1 pt-0">
      <mp-button
        :loading="loading"
        @click="downloadImage(product.id, product.familia)"
        is-full
      >
        Descargar Imágenes
        <v-icon>
          {{ mdiDownload }}
        </v-icon>
      </mp-button>
    </div>
    <div class="ml-1 pt-2" v-if="product.materiales[0].en_transito > 0">
      <mp-button
        @click="$emit('dialogo')"
        is-full
      >
        Importaciones
        <v-icon>
          {{ mdiFerry }}
        </v-icon>
      </mp-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  mdiFerry,
  mdiDownload,
  mdiCloseCircleOutline,
} from '@mdi/js';
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
  props: ['product', 'materiales', 'transito'],
  computed: {
    ...mapGetters(['isLogin']),
  },
  components: {
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
    DesProducto: () => import(/* webpackChunkName: "desProducto" */ '@/components/Producto/DesProducto.vue'),
    PrecioProducto: () => import(/* webpackChunkName: "precioProducto" */ '@/components/Producto/PrecioProducto.vue'),
  },
  methods: {
    replaceSeller(text) {
      return text.includes('asesora') ? text.replaceAll('asesora', 'asesor') : text;
    },
    async downloadImage(id, familia) {
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
