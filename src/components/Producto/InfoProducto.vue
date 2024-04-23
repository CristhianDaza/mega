<template>
  <div>
    <DesProducto
      :description="product"
    />
    <template v-if="isLogin">
      <v-card-text class="py-0">
        <v-card-subtitle
          class="font-weight-black px-0 pb-0"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          PRECIO:
        </v-card-subtitle>
        <PrecioProducto
          :price="product"
          :materials="materials"
        />
      </v-card-text>
    </template>
    <template v-if="productInfo">
      <v-card-text
        class="d-block title my-2 py-0"
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        v-if="isDiscount"
      >
        {{discount}}% de descuento.
      </v-card-text>
    </template>
    <template v-if="productInfo">
      <div class="ml-1 pt-2" v-if="isTracking(productInfo.materiales)">
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
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiCloseCircleOutline, mdiDownload, mdiFerry } from '@mdi/js';

export default {
  name: 'InfoProducto',
  data() {
    return {
      loading: false,
      mdiCloseCircleOutline,
      mdiDownload,
      mdiFerry,
      productInfo: null,
    };
  },
  props: ['product', 'materials', 'transito'],
  computed: {
    ...mapGetters(['isLogin']),
    isDiscount() {
      return Math.round(Math.abs(this.product?.materiales?.[0]?.descuento)) > 0;
    },
    discount() {
      return Math.abs(this.productInfo?.materiales?.[0]?.descuento);
    },
  },
  components: {
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
    DesProducto: () => import(/* webpackChunkName: "desProducto" */ '@/components/Producto/DesProducto.vue'),
    PrecioProducto: () => import(/* webpackChunkName: "precioProducto" */ '@/components/Producto/PrecioProducto.vue'),
  },
  methods: {
    isTracking(materials) {
      if (!materials) return false;
      return materials.some((material) => material?.trackings_importacion.length > 0);
    },
  },
  updated() {
    if (this.product) {
      this.productInfo = this.product;
    }
  },
};
</script>
