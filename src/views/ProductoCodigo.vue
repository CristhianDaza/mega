<template>
  <div>
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
            <router-link exact :to="`/productos?subCategoria=${productoCodigo[0].subcategoria_1.jerarquia}&titulo=${productoCodigo[0].subcategoria_1.nombre}`">{{this.categoriaSecundaria.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            {{this.codigo}}
          </li>
        </ul>
      </div>
      <v-card
        :style="{background: $vuetify.theme.themes[theme].basebackground}"
        class="mx-auto mt-10">
        <v-row>
          <v-col cols="12" md="6" >
            <v-container>
              <ImagenProducto
                :producto='productoCodigo[0]'
                :imagenPrincipalMediana='this.imagenPrincipalMediana'
                :imagenPrincipalGrande='this.imagenPrincipalGrande'
              />
            </v-container>
          </v-col>
          <v-col cols="12" md="6" :class="this.$vuetify.breakpoint.xs ? 'pt-0' : ''">
            <v-container :class="$vuetify.breakpoint.xs ? 'pt-0' : ''">
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
      <ImagenesProducto
        :imagenes="productoCodigo[0].imagenes"
        @cambiarImagen="cambiarImagenHijo"
      />
      <v-row>
        <v-col cols="12" sm="6">
          <v-card
            class="mt-5 "
            :style="{background: $vuetify.theme.themes[theme].basebackground}"
          >
            <ExistenciasProducto
              :inventarioDisponible="inventarioDisponible"
              @actualizarSugerencias="actualizarSugerencia"
            />
          </v-card>
          <div v-if="productoCodigo[0].videos.length > 0" class="mt-3">
            <v-responsive :aspect-ratio="16/9">
              <div class="player-container">
                <vue-core-video-player
                  :autoplay="false"
                  loop
                  preload="metadata"
                  :title="`${productoCodigo[0].familia} ${productoCodigo[0].descripcion_comercial}`"
                  logo="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_logo.webp?alt=media&amp;token=2e13ac36-784c-463a-a094-fa665516fffe&quot"
                  :src="productoCodigo[0].videos[0].video"
                  :cover="productoCodigo[0].imagenes[0].imagen.file_md"
                  >
                </vue-core-video-player>
              </div>
            </v-responsive>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <h1 class="primary--text text-center mt-2">
            Productos Sugeridos
          </h1>

          <v-divider class="mx-10"></v-divider>
          <h3 v-if="this.textoSugerido !== ''" class="text-center">
            {{this.textoSugerido}}
          </h3>
          <v-row class="mt-3" v-if="productoSugerencia.length > 0">
            <v-col cols="6" v-for="producto in productoSugerencia" :key="producto.familia">
              <v-card
                :style="{background: $vuetify.theme.themes[theme].basebackground}"
                outlined
                class="mx-auto tarjetaProducto">
                <v-card-text class="pa-0">
                  <router-link
                    append
                    :to="{path: `/producto/${producto.producto.familia}`}"
                  >
                    <v-img
                      :src="producto.imagen.imagen.file_md"
                      width="100%"
                      :alt="producto.descripcion_comercial"
                      class="imagenProducto"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <Loader />
                        </v-row>
                      </template>
                    </v-img>
                  </router-link>
                </v-card-text>
                    <v-card-title
                  class="text-center text-subtitle-2"
                  :style="{color: $vuetify.theme.themes[theme].basetexto}"
                >
                  {{ producto.producto.descripcion_comercial }}
                </v-card-title>
                <v-card-subtitle
                  :style="{color: $vuetify.theme.themes[theme].basetexto}"
                >
                  {{ producto.producto.familia }}
                </v-card-subtitle>
                <v-card-text class="text-center">
                  <div class="red--text" v-if="producto.inventario < 10">Agotado en {{producto.color_nombre}}</div>
                  <div v-else :style="{color: $vuetify.theme.themes[theme].basetexto}">Inventario: {{producto.inventario}} color {{producto.color_nombre}}.</div>
                </v-card-text>
                <div class="text-center">
                  <template v-if="productoCodigo[0].etiquetas.length > 0">
                    <div
                      v-for="etiqueta in productoCodigo[0].etiquetas"
                      :key="etiqueta.id"
                    >
                      <img
                        width="80px"
                        :src="etiqueta.imagen.file_sm"
                        :alt="etiqueta.nombre"
                        >
                    </div>
                  </template>
                </div>
                <v-divider class="mx-5"></v-divider>
                <v-card-actions>
                <v-btn
                  :to="{path: `/producto/${producto.producto.familia}`}"
                  outlined block
                  color="primary"
                  text
                  append
                >
                    Ver Producto
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
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

    <v-dialog v-model="dialogTransito" max-width="750" overlay-color="grey darken-4" overlay-opacity="0.9">
      <v-btn dark icon class="mr-5" color="white" @click.stop="dialogTransito = false">
        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
      </v-btn>
      <v-simple-table
        :style="{background: $vuetify.theme.themes[theme].basebackground}"
      >
        <thead>
          <tr style="background: #0077bd">
            <th class="text-left white--text">COLOR</th>
            <th class="text-left white--text">CANTIDADES<br>EN TRÁNSITO</th>
            <th class="text-left white--text">INGRESO<br>AL SISTEMA</th>
            <th class="text-left white--text">ESTADO DEL<br>TRÁNSITO</th>
            <th class="text-left white--text">ÚLTIMA<br>ACTUALIZACIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(existencia, index) in productoTraking[0]" :key="index">
            <td v-if="existencia.trackings_importacion[0] !== undefined">
              {{ coloresTransito(inventarioDisponible, existencia.trackings_importacion[0].material) }}
            </td>
            <td v-if="existencia.trackings_importacion[0] !== undefined">
              {{addCommas(existencia.trackings_importacion[0].cantidad)}}
            </td>
            <td v-if="existencia.trackings_importacion[0] !== undefined">
              {{moment(existencia.trackings_importacion[0].fecha).locale('es-CO').format('LL')}}
            </td>
            <td v-if="existencia.trackings_importacion[0] !== undefined">
              {{existencia.trackings_importacion[0].estado}}
            </td>
            <td v-if="existencia.trackings_importacion[0] !== undefined">
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
import ImagenesProducto from '@/components/Producto/ImagenesProducto.vue';
import ExistenciasProducto from '@/components/Producto/ExistenciasProducto.vue';
import axios from 'axios';
import {
  mdiCloseCircleOutline,
} from '@mdi/js';

export default {
  name: 'codigo',
  data() {
    return {
      loader: null,
      textoSugerido: '',
      textoInfo: '',
      productoCodigo: [],
      productoSugerencia: [],
      productoTraking: [],
      imagenPrincipalMediana: '',
      imagenPrincipalGrande: '',
      codigo: this.$route.params.codigo,
      dialogTransito: false,
      mdiCloseCircleOutline,
      overlay: false,
      mostrarTooltip: false,
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
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
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
      this.overlay = !this.overlay;
    },
    actualizar(codigo) {
      this.productoSugerencia = [];
      this.getProductosSugerencia(codigo);
    },
    actualizarSugerencia(codigoSugerencia) {
      this.actualizar(codigoSugerencia);
    },
    cambiarImagenHijo(imagen1, imagen2) {
      this.imagenReferencia(imagen1, imagen2);
      this.$vuetify.goTo(this.target2, this.options2);
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
          if (this.productoSugerencia === []) {
            this.textoSugerido = 'No se encontraron productos';
          } else {
            this.textoSugerido = '';
          }
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
    ImagenesProducto,
    ExistenciasProducto,
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
    color: #1976d2 !important;
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
  color: #1976d2 !important;
}
.links li:nth-child(2n){
  padding: 0 12px;
}

.links ul {
  padding: 0;
}
.tarjetaProducto {
  transition: all .4s;
}
.tarjetaProducto:hover {
  transform: translateY(-15px);
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
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
