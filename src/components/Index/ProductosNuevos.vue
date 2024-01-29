<template>
  <div
    class="fondoNovedades py-10"
    v-if="productsHome.length > 0"
  >
    <h1
      :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
      class="mb-5 pt-5 text-center font-weight-black text-uppercase"
      :style="{color: $vuetify.theme.themes[theme].colorText}"
    >
      {{productHome[0].title}}
    </h1>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(product) in productsHome"
          :key="product.familia"
        >
          <Products :product='product' :colors="product.materiales"/>
        </v-col>
      </v-row>
      <router-link
        :to="`/productos?label=${productHome[0].label}&title=${productHome[0].title}`">
        <mp-button
          class="mt-6"
          is-full
          @click="$router.push({
            name: 'product',
            query: {
              label: productHome[0].label,
              title: productHome[0].title
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
import { mapActions, mapGetters } from 'vuex';
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
    ...mapActions('homeProduct', ['getProductLabel', 'getProductHome']),
  },
  computed: {
    ...mapGetters('homeProduct', ['productHome', 'productsHome']),
  },
  async mounted() {
    await this.getProductHome();
    await this.getProductLabel(this.productHome[0].label);
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
