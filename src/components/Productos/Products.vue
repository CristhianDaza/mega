<template>
  <v-card
    class="cardProducts"
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
    :class="{'cardProductsLogin': isLogin}"
  >
    <v-card-text class="pa-0">
      <div
        @click="goToProduct(product)"
        class="pointer"
      >
        <v-img
          :src="product.imagen"
          width="100%"
          max-width="100%"
          max-height="100%"
          :alt="product.descripcion_comercial"
          class="imageProduct"
        >
          <span v-if="Math.abs(product.materiales[0].descuento) > 0" class="percent">
            {{ product.materiales[0].descuento }}%
          </span>
        </v-img>
      </div>
    </v-card-text>
    <v-card-title
      class="text-subtitle-1 titleProd pb-2 font-weight-light"
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
    >
      {{ product.descripcion_comercial }}
    </v-card-title>
    <v-card-subtitle
      class="text-subtitle-2 font-weight-bold pb-1"
      :style="{ color: $vuetify.theme.themes[theme].invertSecondary }"
    >
      {{ product.familia }}
    </v-card-subtitle>
    <v-card-subtitle class="d-flex flex-wrap pt-0 pb-2">
      <div v-for="color in colors" :key="color.codigo">
        <mp-color-inventory
          :color="color"
          v-if="color.inventario > 10"
        />
      </div>
    </v-card-subtitle>
    <v-card-title
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
      v-if="isLogin"
      class="precio pt-0"
    >
      <PrecioProducto
        :price="product"
        :materials="product.materiales"
        :is-card="true"
      />
    </v-card-title>
    <div class="actionCard">
      <div class="d-flex justify-center text-center my-2">
        <template v-if="product.etiquetas.length > 0">
          <div
            v-for="label in product.etiquetas"
            :key="label.id"
          >
            <img
              width="60px"
              :src="label.imagen"
              :alt="label.nombre"
            >
          </div>
        </template>
      </div>
      <v-card-subtitle class="py-1">
        <div v-html="totalInventory(product.materiales)"></div>
      </v-card-subtitle>
      <v-divider class="mx-5"></v-divider>
      <v-card-actions class="d-block">
        <router-link :to="{ path: `/producto/${product.familia}` }">
          <mp-button
            is-full
            @click="goToProduct(product)"
          >
            Ver Producto
          </mp-button>
        </router-link>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import addCommas from '@/mixins/addCommas';
import hextToRgb from '@/helpers/hextToRgb';

export default {
  name: 'ProductsComponent',
  components: {
    MpColorInventory: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Color-Inventory.vue'),
    MpButton: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Button.vue'),
    PrecioProducto: () => import(/* webpackChunkName: "precioProducto" */ '@/components/Producto/PrecioProducto.vue'),
  },
  props: {
    product: {
      type: Object,
      require: true,
    },
    colors: {
      type: Array,
      require: true,
    },
  },
  mixins: [addCommas],
  data() {
    return {
      hextToRgb,
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    ...mapActions('products', ['setProduct']),
    totalInventory(products) {
      let total = 0;
      let inTransit = 0;
      products.forEach((product) => {
        total += product.inventario_almacen?.[0]?.cantidad;
        inTransit += product.trackings_importacion?.[0]?.cantidad;
      });
      if (total <= 10) {
        if (inTransit > 0) return `<span class="font-weight-bold blue--text text--accent-2">En transito</span> ${this.addCommas(inTransit)} unidades`;
        return '<strong class="red--text text--lighten-1">Agotado</strong>';
      }
      return `<span class="font-weight-bold blue--text text--accent-1">Existencias:</span> ${this.addCommas(total)} unidades`;
    },
    goToProduct(product) {
      this.setProduct(product);
      this.setSelectedMenu('producto');
      this.$router.push({ path: `/producto/${product.familia}` });
    },
  },
};
</script>

<style>
.cardProducts {
  transition: all .6s;
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  min-height: 490px;
}

.cardProductsLogin {
  min-height: 590px;
}

.titleProd {
  word-break: normal;
  text-transform: capitalize;
}

.imageProduct {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.actionCard {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.imageProduct span {
  width: 110px;
  height: 20px;
  top: 11px;
  right: -36px;
  position: absolute;
  display: block;
  background: #005C91;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 22px;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}
</style>
