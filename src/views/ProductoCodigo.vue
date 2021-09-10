<template>
<!-- eslint-disable max-len -->
  <div v-if="this.productoCodigo.length > 0">
    <v-container class="pt-0">
      <div class="links">
        <ul
          :style="{ color: $vuetify.theme.themes[theme].colorText }"
        >
          <li>
            <router-link
            exact
            to="/" class="links__item">INICIO</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link
            exact
            to="/productos" class="links__item">PRODUCTOS</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link
            exact
            :to="`/productos?categoria=${productoCodigo[0].subcategoria_1.categoria.jerarquia}&titulo=${productoCodigo[0].subcategoria_1.categoria.nombre}`" class="links__item">{{this.categoriaPrincipal.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            exact
            :to="`/productos?subCategoria=${productoCodigo[0].subcategoria_1.jerarquia}&titulo=${productoCodigo[0].subcategoria_1.nombre}`"  class="links__item">{{this.categoriaSecundaria.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            {{this.codigo}}
          </li>
        </ul>
      </div>
      <v-card
        :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
        class="mx-auto mt-2"
      >
        <v-row>
          <v-col cols="6" sm="3" md="2" class="ProductosVertical">
            <v-container>
              <ImagenProductosVertical
                :imagenes="productoCodigo[0].imagenes"
                @cambiarImagen="cambiarImagenHijo"
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
                :producto='productoCodigo[0]'
                :imagenPrincipalMediana='this.imagenPrincipalMediana'
                :imagenPrincipalGrande='this.imagenPrincipalGrande'
                :inventarioDisponible="inventarioDisponible"
              />
              <v-col cols="12" class="contenedorProductosHorizontal pa-0">
                <v-container
                  class="pa-0"
                >
                  <ImagenProductosHorizontal
                    :imagenes="productoCodigo[0].imagenes"
                    @cambiarImagen="cambiarImagenHijoHorizontal"
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
                :producto="productoCodigo[0]"
                :materiales="this.materiales"
                @dialogo="dialogTransito = true"
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
              :inventarioDisponible="inventarioDisponible"
              @actualizarSugerencias="actualizarSugerencia"
            />
          </v-card>
          <div v-if="productoCodigo[0].videos.length > 0" class="mt-3">
            <VideoProducto
              :video="productoCodigo[0]"
            />
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="my-4">
          <SugeridoProducto
            :sugerencia="productoSugerencia"
          />
        </v-col>
      </v-row>

    </v-container>

    <v-dialog v-model="dialogTransito" max-width="750" overlay-color="blue-grey darken-4" overlay-opacity="0.9">
      <v-btn dark icon class="mr-5" color="white" @click.stop="dialogTransito = false">
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
          <tr v-for="(existencia, index) in productoTraking[0]" :key="index">
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              v-if="existencia.trackings_importacion[0] !== undefined">
              {{ coloresTransito(inventarioDisponible, existencia.trackings_importacion[0].material) }}
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
              {{moment(existencia.trackings_importacion[0].ultima_actualizacion).locale('es-CO').format('LL')}}
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
import axios from 'axios';
import {
  mdiCloseCircleOutline,
} from '@mdi/js';
import Loader from '@/components/Global/Loader.vue';
import ImagenProducto from '@/components/Producto/ImagenProducto.vue';
import InfoProducto from '@/components/Producto/InfoProducto.vue';
import ExistenciasProducto from '@/components/Producto/ExistenciasProducto.vue';
import VideoProducto from '@/components/Producto/VideoProducto.vue';
import SugeridoProducto from '@/components/Producto/SugeridoProducto.vue';
import addCommas from '@/mixins/addCommas';
import layoutPrincipal from '@/mixins/layoutPrincipal';
import ImagenProductosVertical from '../components/Producto/ImagenProductosVertical.vue';
import ImagenProductosHorizontal from '../components/Producto/ImagenProductosHorizontal.vue';

export default {
  name: 'Codigo',
  mixins: [addCommas, layoutPrincipal],
  data() {
    return {
      productoCodigo: [],
      productoSugerencia: [],
      productoTraking: [],
      imagenPrincipalMediana: '',
      imagenPrincipalGrande: '',
      codigo: this.$route.params.codigo,
      dialogTransito: false,
      mdiCloseCircleOutline,
      categoriaPrincipal: '',
      categoriaSecundaria: '',
      duration: 1000,
      number2: 200,
      offset: 0,
      easing: 'easeInQuart',
      type2: 'number2',
      materiales: [],
    };
  },
  computed: {
    inventarioDisponible() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.materiales.sort((a, b) => a.codigo - b.codigo);
    },
    target2() {
      const value = this[this.type2];
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(value)) return Number(value);
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
    coloresTransito(inventario, traking) {
      let codigo;
      inventario.forEach((data) => {
        if (data.codigo === traking) {
          codigo = data.color_nombre;
        }
      });

      return codigo;
    },
    imagenReferencia(imagenMediana, imagenGrande) {
      this.imagenPrincipalMediana = imagenMediana;
      this.imagenPrincipalGrande = imagenGrande;
    },
    actualizar(codigo) {
      this.productoSugerencia = [];
      this.getProductosSugerencia(codigo);
    },
    actualizarSugerencia(codigoSugerencia) {
      this.actualizar(codigoSugerencia);
    },
    cambiarImagenHijoHorizontal(imagen1, imagen2) {
      this.imagenReferencia(imagen1, imagen2);
      this.$vuetify.goTo(this.target2, this.options2);
    },
    cambiarImagenHijo(imagen1, imagen2) {
      this.imagenReferencia(imagen1, imagen2);
    },
    async getProductoCodigo() {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/detail/${this.codigo}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.productoCodigo.push(res.data);
        this.getProductosSugerencia(this.productoCodigo[0].materiales[0].codigo);
        this.getProductoTraking(this.codigo);
        this.categoriaPrincipal = this.productoCodigo[0].subcategoria_1.categoria.nombre;
        this.categoriaSecundaria = this.productoCodigo[0].subcategoria_1.nombre;
        this.materiales = this.productoCodigo[0].materiales;
      });
    },
    async getProductoTraking(producto) {
      const url = `https://marpicoprod.azurewebsites.net/api/inventarios/materialesAPIByProducto?producto=${producto}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.productoTraking.push(res.data[0].materiales);
      });
    },
    async getProductosSugerencia(codigo) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/sugeridos?material_origen=${codigo}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        res.data.forEach((producto) => {
          this.productoSugerencia.push(producto);
        });
      });
    },
  },
  async mounted() {
    this.getProductoCodigo();
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
    Loader,
    ImagenProducto,
    InfoProducto,
    ExistenciasProducto,
    VideoProducto,
    SugeridoProducto,
    ImagenProductosVertical,
    ImagenProductosHorizontal,
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
