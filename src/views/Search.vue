<template>
  <div>
    <Hero title="Buscar"/>
    <v-container class="pt-0">
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <filter-inventory
            v-if="products"
          />
          <FilterColor
            v-if="colorList"
            :colorList="colorList"
          />
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <div v-if="products">
            <h1
              :style="{color: $vuetify.theme.themes[theme].colorText }"
            >Busqueda: {{ $route.query.searchItem.toUpperCase() }}</h1>
            <h2
              :style="{color: $vuetify.theme.themes[theme].colorText }"
              class="text-subtitle-1 mb-4">
              Resultados en total: {{ infoProducts.count }}
            </h2>
            <mp-button
              v-if="perPage > 1"
              is-full
              @click="changePerPage(infoProducts.count)"
            >
              VER TODOS LOS {{ Number(infoProducts.count) }} PRODUCTOS
            </mp-button>
            <v-row justify="center">
              <v-col v-if="Number(infoProducts.count) > 18" cols="12">
                <mp-pagination
                  :perPage="perPage"
                />
              </v-col>
            </v-row>
            <v-row>
              <h2
                v-if="Number(infoProducts.count) === 0"
                class="text-center error mt-2 ml-2 sinResultados">
                Sin resultados
              </h2>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="(producto) in products"
                :key="producto.id"
                class="pa-1 mb-5"
              >
                <Products :producto='producto' :colores='producto.materiales' />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col v-if="Number(infoProducts.count) > 18" cols="12">
                <mp-pagination
                  :perPage="perPage"
                />
              </v-col>
            </v-row>
            <mp-button
              v-if="Number(perPage) > 1"
              is-full
              @click="changePerPage(infoProducts.count)"
            >
              VER TODOS LOS {{ Number(infoProducts.count) }} PRODUCTOS
            </mp-button>
          </div>

          <div v-else class="mx-auto">
            <v-container class="fill-height mt-16 mx-auto">
              <v-row align="center" justify="center">
                <Loader />
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import layoutPrincipal from '@/mixins/layoutPrincipal';
import { searchProduct } from '@/api/apiProduct';

export default {
  name: 'BuscarView',
  mixins: [layoutPrincipal],
  data() {
    return {
      products: null,
      infoProducts: null,
      colorList: null,
      perPage: 0,
      searchProduct,
    };
  },
  components: {
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    Products: () => import(/* webpackChunkName: "products" */ '@/components/Productos/Products.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
    MpPagination: () => import(/* webpackChunkName: "mpPagination" */ '@/components/UI/Mp-Pagination.vue'),
    FilterInventory: () => import(/* webpackChunkName: "filterInventory" */ '@/components/Productos/FilterInventory.vue'),
    FilterColor: () => import(/* webpackChunkName: "filterColor" */ '@/components/Productos/FilterColor.vue'),
  },
  computed: {
    paramsForSearch() {
      const params = {
        search: this.$route.query.searchItem || null,
        perPage: Number(this.$route.query.perPage) || 20,
        inventoryInput: Number(this.$route.query.inventoryInput) || null,
        color: this.$route.query.color || null,
        page: Number(this.$route.query.page) || 1,
      };

      return params;
    },
    breadcrumbs() {
      const breadcrumbs = [
        { title: 'INICIO', disabled: false, toLink: '/' },
        { title: 'BUSCAR', disabled: true, toLink: '/search' },
      ];

      return breadcrumbs;
    },
  },
  methods: {
    async getSearchProduct() {
      try {
        const { data } = await this.searchProduct(this.paramsForSearch);
        this.products = data?.results;
        this.infoProducts = data;
        this.perPage = Math.ceil((data?.count / this.paramsForSearch.perPage));
        this.colorList = data?.filtros?.colores.length > 0 ? data?.filtros?.colores : null;
      } catch (e) {
        console.log(e);
      }
    },
    changePerPage(perPage) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          perPage,
        },
      });
    },
  },
  mounted() {
    this.getSearchProduct(
      this.paramsForSearch,
    );
  },
  metaInfo: {
    title: 'Buscar 🔎',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Productos Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/buscar/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
};
</script>

<style>
  .sinResultados {
    width: 100%;
  }
</style>
