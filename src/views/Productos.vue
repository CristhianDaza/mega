<template>
  <div>
    <Hero title="Productos"/>
    <v-container class="pt-0" >
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <template v-if="getProducts && !showComponentWithout">
        <div class="mb-10">
          <SearchComponent
            @search="search"
          />
        </div>
        <v-row class="mb-10">
          <v-col cols="12">
            <v-row v-if="getProducts.length > 0">
              <v-col
                cols="6"
                sm="5"
                md="4"
                lg="3"
                v-for="(product) in items"
                :key="product.id"
                class="pa-1"
              >
                <Products :product='product' :colors='product.materiales' />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col class="buttons-page">
                <mp-button
                  @click="prevPage"
                  :is-active="getCurrentPage === 1"
                  :disabled="getCurrentPage === 1"
                >Anterior</mp-button>
                <mp-button
                  @click="nextPage"
                  :disabled="disabledButton"
                >Siguiente</mp-button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <template v-if="showComponentWithout">
        <without-results />
      </template>
    </v-container>
  </div>
</template>

<script>
import layoutPrincipal from '@/mixins/layoutPrincipal';
import hextToRgb from '@/helpers/hextToRgb';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsMega',
  mixins: [layoutPrincipal],
  data() {
    return {
      characteristics: null,
      colorList: null,
      hextToRgb,
      labelList: null,
      resultProducts: null,
      showComponentWithout: false,
      totalProducts: 0,
      items: [],
      pageSize: 24,
      duration: 1000,
      easing: 'easeInQuart',
      offset: 0,
      type2: 'number2',
      number2: 400,
      productsSearch: [],
      searchProduct: '',
      endIndex: 0,
      startIndex: 0,
      disabledButton: false,
    };
  },
  components: {
    SearchComponent: () => import(/* webpackChunkName: "searchComponent" */ '@/components/Global/SearchComponent.vue'),
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
    Products: () => import(/* webpackChunkName: "products" */ '@/components/Productos/Products.vue'),
    WithoutResults: () => import(/* webpackChunkName: "withoutResults" */ '@/components/Global/WithoutResults.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
  },
  computed: {
    ...mapGetters('categories', ['categories', 'subCategories', 'characteristicsStore']),
    ...mapGetters('labels', ['getLabels']),
    ...mapGetters('products', ['getProducts', 'getCurrentPage', 'getFilterProducts']),
    breadcrumbs() {
      return [
        { title: 'Inicio', disabled: false, toLink: '/' },
        { title: 'Productos', disabled: true, toLink: '/productos' },
      ];
    },
    target1() {
      const value = this[this.type2];
      if (!Number.isNaN(value)) {
        return Number(value);
      }
      return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    ...mapActions('products', ['setProducts', 'setCurrentPage']),
    showProducts() {
      if (this.getProducts.length === 0) {
        this.showComponentWithout = true;
        return;
      }
      this.setPageToView();
      this.items = this.getFilterProducts(this.searchProduct)?.slice(
        this.startIndex,
        this.endIndex,
      );
    },
    nextPage() {
      if (this.getFilterProducts(this.searchProduct).length > this.pageSize) {
        this.setCurrentPage(this.getCurrentPage + 1);
        this.pageClick();
      }
    },
    prevPage() {
      if (this.getCurrentPage > 1) {
        this.setCurrentPage(this.getCurrentPage - 1);
        this.pageClick();
      }
    },
    pageClick() {
      this.showProducts();
      this.$vuetify.goTo(this.target1, this.options);
    },
    setPageToView() {
      this.startIndex = (this.getCurrentPage - 1) * this.pageSize;
      this.endIndex = this.startIndex + this.pageSize;
    },
    search(value) {
      this.searchProduct = value;
      this.setCurrentPage(1);
      this.setPageToView();
      this.items = this.getFilterProducts(value)?.slice(
        this.startIndex,
        this.endIndex,
      );
      this.disabledButton = this.getFilterProducts(value).length <= this.pageSize;
    },
  },
  async mounted() {
    if (!this.getProducts) {
      await this.setProducts();
      this.showProducts();
    }
    this.showProducts();
  },
  metaInfo: {
    title: 'Productos 🛒',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Productos Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/productos/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
};
</script>

<style scoped>
.buttons-page {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
