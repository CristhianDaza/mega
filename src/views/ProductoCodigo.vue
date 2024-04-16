<template>
  <div v-if="productCode.length > 0">
    <v-container class="pt-0">
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <v-card
        :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
        class="mx-auto mt-2"
      >
        <v-row>
          <v-col cols="6" sm="3" md="2" class="ProductosVertical">
            <v-container>
              <ImagenProductosVertical
                :images="productCode[0].imagenes"
                @changeImage="changeImage"
              />
            </v-container>
          </v-col>
          <v-col
            :class="this.$vuetify.breakpoint.xs ? '' : ''"
            cols="12"
            sm="4"
            md=""
            class="pl-0 contenedorImagenProducto"
            >
            <v-container>
              <ImagenProducto
                :product='productCode[0]'
                :imagePrincipalMedium='this.imagePrincipalMedium'
                :imagePrincipalBig='this.imagePrincipalBig'
              />
              <v-col cols="12" class="contenedorProductosHorizontal pa-0">
                <v-container
                  class="pa-0"
                >
                  <ImagenProductosHorizontal
                    :image="productCode[0].imagenes"
                    @changeImage="updateImage"
                  />
                </v-container>
              </v-col>
            </v-container>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="5"
            class="contenedorInfoProducto"
          >
            <v-container class="pl-0 pb-0 mb-5 mr-2 infoProd">
              <InfoProducto
                :product="productCode[0]"
                :materials="this.materials"
                @dialogo="modalTransit = true"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-container class="pt-0">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card
            class="mt-5"
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
          >
            <ExistenciasProducto
              :availableInventory="availableInventory"
              @updateSuggested="updateSuggested"
            />
          </v-card>
          <template v-if="productCode[0].videos.length > 0">
            <div
              class="mt-3"
              v-for="{ video, id } in productCode[0].videos"
              :key="id"
            >
              <mp-video
                :link-video="video"
                controls
              />
            </div>
          </template>
        </v-col>
        <v-col cols="12" sm="6" class="my-4">
          <SugeridoProducto
            :suggestion="productSuggestion"
          />
        </v-col>
      </v-row>

    </v-container>

    <v-dialog
      v-model="modalTransit"
      max-width="750"
      overlay-color="blue-grey darken-4"
      overlay-opacity="0.9"
    >
      <v-btn dark icon class="mr-5" color="white" @click.stop="modalTransit = false">
        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
      </v-btn>
      <v-simple-table
        :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
      >
        <thead>
          <tr>
            <th
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              class="text-left">COLOR</th>
            <th
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              class="text-left">CANTIDADES<br>EN TRÁNSITO</th>
            <th
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              class="text-left">INGRESO<br>AL SISTEMA</th>
            <th
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              class="text-left">ESTADO DEL<br>TRÁNSITO</th>
            <th
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              class="text-left">ÚLTIMA<br>ACTUALIZACIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(existencia, index) in productTracking[0]" :key="index">
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              v-if="existencia.trackings_importacion[0] !== undefined">
              {{ colorsTransit(existencia.trackings_importacion[0].material) }}
            </td>
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              v-if="existencia.trackings_importacion[0] !== undefined">
              {{addCommas(existencia.trackings_importacion[0].cantidad)}}
            </td>
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              v-if="existencia.trackings_importacion[0] !== undefined">
              {{moment(existencia.trackings_importacion[0].fecha).locale('es-CO').format('LL')}}
            </td>
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              v-if="existencia.trackings_importacion[0] !== undefined">
              {{existencia.trackings_importacion[0].estado}}
            </td>
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              v-if="existencia.trackings_importacion[0] !== undefined">
              {{moment(
                existencia.trackings_importacion[0].ultima_actualizacion
                ).locale('es-CO').format('LL')}}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-dialog>

  </div>
  <div v-else class="mx-auto">
    <v-container class="fill-height mt-16 mx-auto">
      <v-row align="center" justify="center">
        <Loader />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  mdiCloseCircleOutline,
} from '@mdi/js';
import addCommas from '@/mixins/addCommas';
import layoutPrincipal from '@/mixins/layoutPrincipal';
import { mapActions } from 'vuex';
import { getProductId, getTracking, getSuggested } from '@/api/apiProduct';

export default {
  name: 'CodigoView',
  mixins: [addCommas, layoutPrincipal],
  data() {
    return {
      firsCategory: '',
      secondCategory: '',
      code: this.$route.params.code,
      modalTransit: false,
      duration: 1000,
      easing: 'easeInQuart',
      getSuggested,
      getProductId,
      getTracking,
      imagePrincipalBig: '',
      imagePrincipalMedium: '',
      materials: [],
      mdiCloseCircleOutline,
      number2: 200,
      offset: 0,
      productCode: [],
      productSuggestion: [],
      productTracking: [],
      type2: 'number2',
    };
  },
  computed: {
    availableInventory() {
      const materialsCopy = [...this.materials];
      return materialsCopy.sort((a, b) => a.codigo - b.codigo);
    },
    target2() {
      const value = this[this.type2];
      if (!Number.isNaN(value)) {
        return Number(value);
      }
      return value;
    },
    options2() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    breadcrumbs() {
      const homeBreadcrumb = { title: 'Inicio', disabled: false, toLink: '/' };
      const productsBreadcrumb = { title: 'Productos', disabled: false, toLink: '/productos' };

      const categoryBreadcrumb = this.createCategoryBreadcrumb();
      const subCategoryBreadcrumb = this.createSubCategoryBreadcrumb();
      const productBreadcrumb = this.createProductBreadcrumb();

      return [
        homeBreadcrumb,
        productsBreadcrumb,
        categoryBreadcrumb,
        subCategoryBreadcrumb,
        productBreadcrumb,
      ];
    },
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    colorsTransit(tracking) {
      let code;
      this.availableInventory.forEach((data) => {
        if (data.codigo === tracking) {
          code = data.color_nombre;
        }
      });

      return code;
    },
    referenceImage(imgMedium, imgBig) {
      this.imagePrincipalMedium = imgMedium;
      this.imagePrincipalBig = imgBig;
    },
    updateSuggested(code) {
      this.productSuggestion = [];
      this.getProductSuggested(code);
    },
    updateImage(imageOne, imageTwo) {
      this.referenceImage(imageOne, imageTwo);
      this.$vuetify.goTo(this.target2, this.options2);
    },
    changeImage(imageOne, imageTwo) {
      this.referenceImage(imageOne, imageTwo);
    },
    async getProductCode() {
      const { data } = await this.getProductId(this.code);
      this.productCode.push(data);
      this.firsCategory = this.productCode[0]?.subcategoria_1?.categoria?.nombre;
      this.secondCategory = this.productCode[0]?.subcategoria_1?.nombre;
      this.materials = this.productCode[0]?.materiales;
      await this.getProductSuggested(this.productCode[0]?.materiales[0]?.codigo);
      await this.getProductTracking(this.code);
    },
    async getProductTracking(product) {
      const { data } = await this.getTracking(product);
      this.productTracking.push(data[0].materiales);
    },
    async getProductSuggested(product) {
      const { data } = await this.getSuggested(product);
      this.productSuggestion = data;
    },
    createCategoryBreadcrumb() {
      if (!this.firsCategory) return null;

      return {
        title: this.firsCategory,
        disabled: false,
        toLink: `/productos?category=${this.productCode[0].subcategoria_1.categoria.jerarquia}&title=${this.productCode[0].subcategoria_1.categoria.nombre}`,
      };
    },
    createSubCategoryBreadcrumb() {
      if (!this.secondCategory) return null;

      return {
        title: this.secondCategory,
        disabled: false,
        toLink: `/productos?subCategory=${this.productCode[0].subcategoria_1.jerarquia}&title=${this.productCode[0].subcategoria_1.nombre}`,
      };
    },
    createProductBreadcrumb() {
      if (!this.code) return null;

      return {
        title: this.code,
        disabled: true,
        toLink: `/producto/${this.code}`,
      };
    },
  },
  async mounted() {
    await this.getProductCode();
    await this.setSelectedMenu(this.$route.fullPath);
  },
  metaInfo: {
    title: 'Producto 🛒',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Productos Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/categorias/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
  components: {
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    ImagenProducto: () => import(/* webpackChunkName: "imagenProducto" */ '@/components/Producto/ImagenProducto.vue'),
    InfoProducto: () => import(/* webpackChunkName: "infoProducto" */ '@/components/Producto/InfoProducto.vue'),
    ExistenciasProducto: () => import(/* webpackChunkName: "existenciasProducto" */ '@/components/Producto/ExistenciasProducto.vue'),
    MpVideo: () => import(/* webpackChunkName: "mpVideo" */ '@/components/UI/Mp-Video.vue'),
    SugeridoProducto: () => import(/* webpackChunkName: "sugeridoProducto" */ '@/components/Producto/SugeridoProducto.vue'),
    ImagenProductosVertical: () => import(/* webpackChunkName: "imagenProductosVertical" */ '@/components/Producto/ImagenProductosVertical.vue'),
    ImagenProductosHorizontal: () => import(/* webpackChunkName: "imagenProductosHorizontal" */ '@/components/Producto/ImagenProductosHorizontal.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
  },
};
</script>

<style scoped>
  .contenedorProductosHorizontal {
    display: none;
  }
  @media (max-width: 450px) {
    .ProductosVertical {
      display: none;
    }
    .contenedorImagenProducto {
      padding: 20px !important;
      padding-bottom: 0 !important;
    }
    .contenedorProductosHorizontal {
      display: flex;
    }
    .contenedorInfoProducto {
      padding-left: 30px;
      padding-top: 0;
    }
  }
</style>
