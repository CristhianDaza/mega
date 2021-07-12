<template>
  <div>
        <!-- :style="{background: $vuetify.theme.themes[theme].basebackground}" -->
<!-- eslint-disable max-len -->
  <div v-if="this.productoCodigo.length > 0">
    <v-container>
      <div class="links">
        <ul>
          <li>
            <router-link exact to="/" class="links__item">INICIO</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link exact to="/productos" class="links__item">PRODUCTOS</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link exact :to="`/productos?categoria=${productoCodigo[0].subcategoria_1.categoria.jerarquia}&titulo=${productoCodigo[0].subcategoria_1.categoria.nombre}`" class="links__item">{{this.categoriaPrincipal.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link exact :to="`/productos?subCategoria=${productoCodigo[0].subcategoria_1.jerarquia}&titulo=${productoCodigo[0].subcategoria_1.nombre}`"  class="links__item">{{this.categoriaSecundaria.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            {{this.codigo}}
          </li>
        </ul>
      </div>
      <v-card
        class="mx-auto mt-2 fondoCard">
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
    <v-col cols="12" class="contenedorProductosHorizontal">
      <v-container>
        <ImagenProductosHorizontal
          :imagenes="productoCodigo[0].imagenes"
          @cambiarImagen="cambiarImagenHijoHorizontal"
        />
      </v-container>
    </v-col>
    <v-container class="pt-0">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card
            class="mt-5"
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
        class="fondoCard"
      >
        <thead>
          <tr>
            <th class="text-left">COLOR</th>
            <th class="text-left">CANTIDADES<br>EN TRÁNSITO</th>
            <th class="text-left">INGRESO<br>AL SISTEMA</th>
            <th class="text-left">ESTADO DEL<br>TRÁNSITO</th>
            <th class="text-left">ÚLTIMA<br>ACTUALIZACIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(existencia, index) in productoTraking[0]" :key="index">
            <td class="white--text" v-if="existencia.trackings_importacion[0] !== undefined">
              {{ coloresTransito(inventarioDisponible, existencia.trackings_importacion[0].material) }}
            </td>
            <td class="white--text" v-if="existencia.trackings_importacion[0] !== undefined">
              {{addCommas(existencia.trackings_importacion[0].cantidad)}}
            </td>
            <td class="white--text" v-if="existencia.trackings_importacion[0] !== undefined">
              {{moment(existencia.trackings_importacion[0].fecha).locale('es-CO').format('LL')}}
            </td>
            <td class="white--text" v-if="existencia.trackings_importacion[0] !== undefined">
              {{existencia.trackings_importacion[0].estado}}
            </td>
            <td class="white--text" v-if="existencia.trackings_importacion[0] !== undefined">
              {{moment(existencia.trackings_importacion[0].ultima_actualizacion).locale('es-CO').format('LL')}}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-dialog>

    <v-overlay :value="overlay">
      <Loader />
    </v-overlay>

  </div>
  <div v-else class="mx-auto">
    <v-container class="fill-height mt-16 mx-auto">
      <v-row align="center" justify="center">
        <Loader />
      </v-row>
    </v-container>
  </div>
  </div>
</template>

<script>
import Loader from '@/components/Global/Loader.vue';
import ImagenProducto from '@/components/Producto/ImagenProducto.vue';
import InfoProducto from '@/components/Producto/InfoProducto.vue';
import ExistenciasProducto from '@/components/Producto/ExistenciasProducto.vue';
import VideoProducto from '@/components/Producto/VideoProducto.vue';
import SugeridoProducto from '@/components/Producto/SugeridoProducto.vue';
import axios from 'axios';
import {
  mdiCloseCircleOutline,
} from '@mdi/js';
import ImagenProductosVertical from '../components/Producto/ImagenProductosVertical.vue';
import ImagenProductosHorizontal from '../components/Producto/ImagenProductosHorizontal.vue';

export default {
  name: 'codigo',
  data() {
    return {
      loader: null,
      productoCodigo: [],
      productoSugerencia: [],
      productoTraking: [],
      imagenPrincipalMediana: '',
      imagenPrincipalGrande: '',
      codigo: this.$route.params.codigo,
      dialogTransito: false,
      mdiCloseCircleOutline,
      overlay: false,
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
  watch: {
    overlay(valor) {
      // eslint-disable-next-line no-unused-expressions
      valor && setTimeout(() => {
        this.overlay = false;
      }, 500);
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      // eslint-disable-next-line no-return-assign
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
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
    addCommas(nStr) {
      // eslint-disable-next-line no-param-reassign
      nStr += '';
      const x = nStr.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? `.${x[1]}` : '';
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1.$2');
      }
      return x1 + x2;
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
  created() {
    this.$store.commit('setLayout', 'defaultLayout');
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
  .router-link-active {
    color: inherit !important;
  }
  .router-link-active:hover {
    color: #2196f3 !important;
  }

  .linkCategoria:hover {
    color: #0077bd !important;
    text-decoration: underline;
  }
  .precio {
    padding: 0 !important;
  }

  .links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    list-style: none;
    margin: 0;
    padding: 18px 12px;
  }

  .links li {
    align-items: center;
    display: inline-flex;
    font-size: 14px;
  }
  .links__item {
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    transition: all .3s cubic-bezier(0.25, 0.8, 0.5, 1);
    color: white !important;
  }
  .links li:nth-child(2n){
    padding: 0 12px;
  }

  .links ul {
    padding: 0;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  .fondoCard {
    background: rgba( 255, 255, 255, 0.25 ) !important;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ) !important;
    backdrop-filter: blur( 4px ) !important;
    -webkit-backdrop-filter: blur( 4px ) !important;
    border-radius: 10px !important;
    border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
  }
  .infoProd {
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    transform: translate(-10px, 10px);
  }
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

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
