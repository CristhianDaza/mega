<template>
  <div>
    <Hero :title="title"/>
    <v-container class="pt-0">
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <filter-inventory
            v-if="totalProducts > 0"
          />
          <filter-discount
            v-if="totalProducts > 0"
          />
          <filter-label
            v-if="labelList && totalProducts > 0"
            :label-list="labelList"
          />
          <filter-color
            v-if="colorList && totalProducts > 0"
            :colorList="colorList"
          />
          <filter-sub-categories
            v-if="subCategories && totalProducts > 0"
            :sub-category-list="subCategories"
          />
          <filter-characteristic
            v-if="characteristics && characteristics.length > 0 && totalProducts > 0"
            :characteristics="characteristics"
          />
          <filter-categories
            v-if="categories && totalProducts > 0"
            :category-list="categories"
          />
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <mp-chip v-if="totalProducts > 0" />
          <h2
            v-if="resultProducts > 0"
            class="text-subtitle-1 mb-2"
            :style="{color: 'white'}"
          >
            Resultados: {{totalProducts}}
          </h2>
            <div v-if="products.length > 0" >
              <v-row v-if="products.length > 0">
                <h2
                  v-if="totalProducts === 0"
                  class="text-center error mt-2 ml-2 sinResultados"
                >
                  Sin resultados
                </h2>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  v-for="(product) in products[0]"
                  :key="product.id"
                  class="pa-1"
                >
                  <Products :product='product' :colors='product.materiales' />
                </v-col>
              </v-row>
              <v-row v-if="products.length > 0" justify="center">
                <v-col v-if="totalProducts > 16" cols="12">
                  <mp-pagination
                    :perPage="totalPages"
                  />
                </v-col>
              </v-row>
              <mp-button
                v-if="Number(totalPages) > 1"
                @click="cambiarPorPagina(totalProducts)"
              >
                VER TODOS
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
import axios from 'axios';
import layoutPrincipal from '@/mixins/layoutPrincipal';
import hextToRgb from '@/helpers/hextToRgb';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductosMega',
  mixins: [layoutPrincipal],
  data() {
    return {
      hextToRgb,
      products: [],
      inputInventario: Number(this.$route.query.inventario) || null,
      page: Number(this.$route.query.page) || 1,
      category: Number(this.$route.query.category) || '',
      subCategory: Number(this.$route.query.subCategory) || '',
      label: Number(this.$route.query.label) || '',
      inventario: Number(this.$route.query.inventario) || '',
      busqueda: this.$route.query.busqueda || '',
      title: this.$route.query.title || 'Productos',
      color: Number(this.$route.query.color) || '',
      resultProducts: null,
      totalPages: 0,
      porPagina: Number(this.$route.query.porPagina) || 16,
      listaPorPaginas: [
        { text: '16', value: 16 },
        { text: '32', value: 32 },
        { text: '64', value: 64 },
      ],
      labelList: null,
      colorList: null,
      nombreCategoria: 'Productos',
      characteristics: null,
      characteristic: Number(this.$route.query.characteristics) || '',
      discount: this.$route.query.discount || 'false',
      totalProducts: 0,
    };
  },
  components: {
    FilterColor: () => import(/* webpackChunkName: "filterColor" */ '@/components/Productos/FilterColor.vue'),
    FilterInventory: () => import(/* webpackChunkName: "filterInventory" */ '@/components/Productos/FilterInventory.vue'),
    FilterLabel: () => import(/* webpackChunkName: "filterLabel" */ '@/components/Productos/FilterLabel.vue'),
    Products: () => import(/* webpackChunkName: "products" */ '@/components/Productos/Products.vue'),
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
    MpChip: () => import(/* webpackChunkName: "mpChip" */ '@/components/UI/Mp-Chip.vue'),
    FilterCharacteristic: () => import(/* webpackChunkName: "filterCharacteristics" */ '@/components/Productos/FilterCharacteristic.vue'),
    FilterDiscount: () => import(/* webpackChunkName: "filterDiscount" */ '@/components/Productos/FilterDiscount.vue'),
    FilterCategories: () => import(/* webpackChunkName: "filterCategory" */ '@/components/Productos/FilterCategories.vue'),
    FilterSubCategories: () => import(/* webpackChunkName: "filterSubcategory" */ '@/components/Productos/FilterSubCategories.vue'),
    MpPagination: () => import(/* webpackChunkName: "mpPagination" */ '@/components/UI/Mp-Pagination.vue'),
  },
  computed: {
    ...mapGetters('categories', ['categories', 'subCategories', 'characteristicsStore']),
    ...mapGetters('labels', ['getLabels']),
    breadcrumbs() {
      return [
        { title: 'Inicio', disabled: false, toLink: '/' },
        { title: 'Productos', disabled: true, toLink: '/productos' },
      ];
    },
  },
  methods: {
    ...mapActions('categories', ['getCategories', 'setCharacteristics']),
    ...mapActions('menu', ['setSelectedMenu']),
    ...mapActions('labels', ['setInitialLabels', 'clearLabel']),
    async getProductos(
      page,
      porPagina,
      category,
      subCategory,
      label,
      inventario,
      busqueda,
      color,
      characteristic,
      discount,
    ) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=${porPagina}&page=${page}&categoria=${category}&subcategoria=${subCategory}&order=paginacion_web&etiqueta=${label}&inventario=${inventario}&search=${busqueda}${color ? `&color=${color}` : ''}&caracteristica=${characteristic}&descuento=${discount}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.products.push(res.data.results);
        this.resultProducts = res.data || null;
        this.totalProducts = Number(res.data.count) || 0;
        this.totalPages = Math.ceil((this.resultProducts.count / this.porPagina));
        this.labelList = res.data.filtros.etiquetas || null;
        this.colorList = res.data.filtros.colores || null;
        this.characteristics = res.data.filtros.caracteristicas || null;
        this.setCharacteristics(res.data.filtros.caracteristicas);
      });
      this.setInitialLabel();
    },
    cambiarPorPagina(porPagina) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          porPagina,
        },
      });
      this.setMenu();
    },
    setMenu() {
      this.setSelectedMenu(this.$route.fullPath);
    },
    setInitialLabel() {
      const colorSelected = this.colorList ? this.colorList
        .find((item) => item.id === this.color) : null;

      const characteristicsSelected = this.characteristics ? this.characteristics
        .find((item) => item.id === this.characteristic) : null;

      const labelSelected = this.labelList ? this.labelList
        .find((item) => item.id === this.label) : null;

      const categorySelected = this.categories ? this.categories
        .find((item) => Number(item.jerarquia) === this.category) : null;

      const subCategorySelected = this.subCategories ? this.subCategories
        .find((item) => Number(item.jerarquia) === this.subCategory) : null;

      const objLabel = {
        query: this.$route.query,
        color: colorSelected,
        characteristics: characteristicsSelected,
        label: labelSelected,
        category: categorySelected,
        subCategory: subCategorySelected,
      };
      this.setInitialLabels(objLabel);
    },
  },
  mounted() {
    this.clearLabel();
    this.getProductos(
      this.page,
      this.porPagina,
      this.category,
      this.subCategory,
      this.label,
      this.inventario,
      this.busqueda,
      this.color,
      this.characteristic,
      this.discount,
    );
    if (!this.categories) this.getCategories();
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

<style>
  .v-text-field__details {
    display: none !important;
  }
</style>
