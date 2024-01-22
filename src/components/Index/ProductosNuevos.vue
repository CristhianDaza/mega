<template>
  <div
    class="fondoNovedades py-10"
    v-if="this.productos.length > 0"
  >
    <h1
      :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
      class="mb-5 pt-5 text-center font-weight-black text-uppercase"
      :style="{color: $vuetify.theme.themes[theme].colorText}"
    >
      {{this.titulos[0].titulo}}
    </h1>
    <v-container>
      <v-row v-if="this.productos.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(producto) in this.productos"
          :key="producto.familia"
        >
          <Products :product='producto' :colors="producto.materiales"/>
        </v-col>
      </v-row>
      <router-link
        :to="`/productos?etiqueta=${this.titulos[0].etiqueta}&title=${this.titulos[0].titulo}`">
        <mp-button
          class="mt-6"
          is-full
          @click="$router.push({
            name: 'product',
            query: {
              etiqueta: titulos[0].etiqueta,
              title: titulos[0].titulo
            }
          })"
        >
          Ver más Productos
        </mp-button>
      </router-link>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mdiSale, mdiArrowRight } from '@mdi/js';

export default {
  name: 'ProductosNuevos',
  data() {
    return {
      mdiSale,
      mdiArrowRight,
    };
  },
  methods: {
    ...mapActions(['traerProducto']),
  },
  computed: {
    ...mapState(['productos', 'titulos']),
  },
  mounted() {
    this.traerProducto();
  },
  components: {
    Products: () => import(/* webpackChunkName: "products" */ '@/components/Productos/Products.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
  },
};
</script>
<style>
.fondoNovedades{
  background-position: center;
  background-size: cover
}
</style>
