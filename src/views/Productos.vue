<template>
  <div>
    <Hero :title="title"/>
    <v-container class="pt-0" >
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <template v-if="products.length > 0 && !showComponentWithout">
        <v-row>
          <v-col cols="12" sm="4" md="3">
            <filter-inventory />
            <filter-discount />
            <filter-label
              v-if="labelList"
              :label-list="labelList"
            />
            <filter-color
              v-if="colorList"
              :colorList="colorList"
            />
            <filter-sub-categories
              v-if="subCategories"
              :sub-category-list="subCategories"
            />
            <filter-characteristic
              v-if="characteristics && characteristics.length > 0"
              :characteristics="characteristics"
            />
            <filter-categories
              v-if="categories"
              :category-list="categories"
            />
          </v-col>
          <v-col cols="12" sm="8" md="9">
            <mp-chip />
            <h2
              v-if="resultProducts > 0"
              class="text-subtitle-1 mb-2"
              :style="{color: 'white'}"
            >
              Resultados: {{totalProducts}}
            </h2>
            <v-row v-if="products.length > 0">
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
            <v-row justify="center">
              <v-col v-if="totalProducts > 16" cols="12">
                <mp-pagination
                  :perPage="totalPages"
                />
              </v-col>
            </v-row>
            <mp-button
              v-if="Number(totalPages) > 1"
              @click="changePerPage(totalProducts)"
              class="mt-5"
            >
              VER TODOS
            </mp-button>
          </v-col>
        </v-row>
      </template>
      <div v-if="products.length < 1" class="mx-auto">
        <v-container class="fill-height mt-16 mx-auto">
          <v-row align="center" justify="center">
            <Loader />
          </v-row>
        </v-container>
      </div>
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
import { searchProduct } from '@/api/apiProduct';

export default {
  name: 'ProductsMega',
  mixins: [layoutPrincipal],
  data() {
    return {
      category: Number(this.$route.query.category) || null,
      characteristic: Number(this.$route.query.characteristics) || null,
      characteristics: null,
      color: Number(this.$route.query.color) || null,
      colorList: null,
      discount: this.$route.query.discount || null,
      hextToRgb,
      inventory: Number(this.$route.query.inventory) || null,
      label: Number(this.$route.query.label) || null,
      labelList: null,
      page: Number(this.$route.query.page) || null,
      perPage: Number(this.$route.query.perPage) || 16,
      products: [],
      resultProducts: null,
      search: this.$route.query.search || null,
      searchProduct,
      showComponentWithout: false,
      subCategory: Number(this.$route.query.subCategory) || null,
      title: this.$route.query.title || 'Productos',
      totalPages: 0,
      totalProducts: 0,
    };
  },
  components: {
    FilterCategories: () => import(/* webpackChunkName: "filterCategory" */ '@/components/Productos/FilterCategories.vue'),
    FilterCharacteristic: () => import(/* webpackChunkName: "filterCharacteristics" */ '@/components/Productos/FilterCharacteristic.vue'),
    FilterColor: () => import(/* webpackChunkName: "filterColor" */ '@/components/Productos/FilterColor.vue'),
    FilterDiscount: () => import(/* webpackChunkName: "filterDiscount" */ '@/components/Productos/FilterDiscount.vue'),
    FilterInventory: () => import(/* webpackChunkName: "filterInventory" */ '@/components/Productos/FilterInventory.vue'),
    FilterLabel: () => import(/* webpackChunkName: "filterLabel" */ '@/components/Productos/FilterLabel.vue'),
    FilterSubCategories: () => import(/* webpackChunkName: "filterSubcategory" */ '@/components/Productos/FilterSubCategories.vue'),
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
    MpChip: () => import(/* webpackChunkName: "mpChip" */ '@/components/UI/Mp-Chip.vue'),
    MpPagination: () => import(/* webpackChunkName: "mpPagination" */ '@/components/UI/Mp-Pagination.vue'),
    Products: () => import(/* webpackChunkName: "products" */ '@/components/Productos/Products.vue'),
    WithoutResults: () => import(/* webpackChunkName: "withoutResults" */ '@/components/Global/WithoutResults.vue'),
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
    paramsToSearch() {
      return {
        page: this.page,
        perPage: this.perPage,
        category: this.category,
        subCategory: this.subCategory,
        label: this.label,
        inventory: this.inventory,
        search: this.search,
        color: this.color,
        characteristic: this.characteristic,
        discount: this.discount,
      };
    },
  },
  methods: {
    ...mapActions('categories', ['getCategories', 'setCharacteristics']),
    ...mapActions('menu', ['setSelectedMenu']),
    ...mapActions('labels', ['setInitialLabels', 'clearLabel']),
    async getProducts() {
      try {
        const { data } = await this.searchProduct(this.paramsToSearch);
        this.products.push(data?.results);
        this.resultProducts = data || null;
        this.totalProducts = Number(data.count) || 0;
        this.totalPages = Math.ceil((this.resultProducts.count / this.perPage));
        this.labelList = data?.filtros.etiquetas || null;
        this.colorList = data?.filtros?.colores || null;
        this.characteristics = data?.filtros?.caracteristicas || null;
        this.setCharacteristics(data?.filtros?.caracteristicas);
        this.showComponentWithout = this.totalProducts === 0;
      } catch (error) {
        console.log(error);
      } finally {
        this.setInitialLabel();
      }
    },
    changePerPage(perPage) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          perPage,
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
    this.getProducts();
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
