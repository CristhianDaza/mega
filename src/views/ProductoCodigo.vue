<template>
  <div class="mt-5">
    <template v-if="!showComponentWithout">
      <v-container class="pt-0">
        <mp-button
          is-outline
          class="mb-5"
          @click="$router.go(-1)"
        >
          ⬅ Atras
        </mp-button>
        <v-card
          :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
          class="mx-auto mt-2"
        >
          <v-row>
            <v-col cols="6" sm="3" md="2" class="ProductosVertical">
              <v-container>
                <ImagenProductosVertical
                  :images="productCode.imagenes"
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
                  :product='productCode'
                  :mainImage='this.mainImage'
                />
                <v-col cols="12" class="contenedorProductosHorizontal pa-0">
                  <v-container
                    class="pa-0"
                  >
                    <ImagenProductosHorizontal
                      :image="productCode.imagenes"
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
                  :product="productCode"
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
          <v-col cols="12">
            <v-card
              class="mt-5"
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            >
              <ExistenciasProducto
                :availableInventory="availableInventory"
              />
            </v-card>
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
          <tbody v-if="materials">
          <template  v-for="(tracking) in materials">
            <tr :key="tracking.codigo" v-if="tracking">
              <td
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
                v-if="tracking.trackings_importacion.length > 0">
                {{ colorsTransit(tracking.trackings_importacion[0].material_id) }}
              </td>
              <td
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
                v-if="tracking.trackings_importacion.length > 0">
                {{addCommas(tracking.trackings_importacion[0].cantidad)}}
              </td>
              <td
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
                v-if="tracking.trackings_importacion.length > 0">
                {{moment(tracking.trackings_importacion[0].fecha).locale('es-CO').format('LL')}}
              </td>
              <td
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
                v-if="tracking.trackings_importacion.length > 0">
                {{tracking.trackings_importacion[0].estado}}
              </td>
              <td
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
                v-if="tracking.trackings_importacion.length > 0">
                {{moment(
                tracking.trackings_importacion[0].ultima_actualizacion
              ).locale('es-CO').format('LL')}}
              </td>
            </tr>
          </template>
          </tbody>
        </v-simple-table>
      </v-dialog>
    </template>
    <template v-else>
      <without-results return-page/>
    </template>
  </div>
</template>

<script>
import {
  mdiCloseCircleOutline,
} from '@mdi/js';
import addCommas from '@/mixins/addCommas';
import layoutPrincipal from '@/mixins/layoutPrincipal';
import { mapActions, mapGetters } from 'vuex';
import { getProductId } from '@/api/apiProduct';

export default {
  name: 'CodigoView',
  mixins: [addCommas, layoutPrincipal],
  data() {
    return {
      code: this.$route.params.code,
      modalTransit: false,
      duration: 1000,
      easing: 'easeInQuart',
      getProductId,
      mainImage: '',
      materials: [],
      mdiCloseCircleOutline,
      number2: 200,
      offset: 0,
      productCode: {},
      type2: 'number2',
      messageError: '',
      showComponentWithout: false,
    };
  },
  computed: {
    ...mapGetters('products', ['getProduct']),
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
    referenceImage(image) {
      this.mainImage = image;
    },
    updateImage(image) {
      this.referenceImage(image);
      this.$vuetify.goTo(this.target2, this.options2);
    },
    changeImage(image) {
      this.referenceImage(image);
    },
    async getProductCode() {
      try {
        const { data } = await this.getProductId(this.code);
        [this.productCode] = await data;
        this.setData();
      } catch (e) {
        this.messageError = e.code;
        this.showComponentWithout = true;
      }
    },
    setData() {
      this.materials = this.productCode?.materiales;
      this.mainImage = this.productCode?.imagen;
    },
  },
  async mounted() {
    if (this.code === this.getProduct?.familia) {
      this.productCode = this.getProduct;
      this.setData();
    } else {
      await this.getProductCode();
    }
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
    ImagenProducto: () => import(/* webpackChunkName: "imagenProducto" */ '@/components/Producto/ImagenProducto.vue'),
    InfoProducto: () => import(/* webpackChunkName: "infoProducto" */ '@/components/Producto/InfoProducto.vue'),
    ExistenciasProducto: () => import(/* webpackChunkName: "existenciasProducto" */ '@/components/Producto/ExistenciasProducto.vue'),
    ImagenProductosVertical: () => import(/* webpackChunkName: "imagenProductosVertical" */ '@/components/Producto/ImagenProductosVertical.vue'),
    ImagenProductosHorizontal: () => import(/* webpackChunkName: "imagenProductosHorizontal" */ '@/components/Producto/ImagenProductosHorizontal.vue'),
    WithoutResults: () => import(/* webpackChunkName: "withoutResults" */ '@/components/Global/WithoutResults.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
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
