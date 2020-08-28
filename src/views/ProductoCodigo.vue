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
            <router-link exact :to="'/productos?categoria=' + productoCodigo[0].subcategoria_1.categoria.jerarquia" class="links__item">{{this.categoriaPrincipal.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link exact :to="'/productos?subCategoria=' + productoCodigo[0].subcategoria_1.jerarquia" class="links__item">{{this.categoriaSecundaria.toUpperCase()}}</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            {{this.codigo}}
          </li>
        </ul>
      </div>
      <v-card class="mx-auto mt-10">
        <v-row>
          <v-col cols="12" md="6" >
            <v-container>
              <img v-if="this.imagenPrincipalMediana === ''" :class="$vuetify.breakpoint.xs ? '' : 'fotoTarjetaGrande'" class="fotoTarjeta elevation-18" @click.stop="dialog = true" :src="productoCodigo[0].imagenes[0].imagen.file_md" :alt="productoCodigo[0].descripcion_comercial" />

              <img v-else :class="$vuetify.breakpoint.xs ? '' : 'fotoTarjetaGrande'" class="fotoTarjeta elevation-18" @click.stop="dialog = true" :src="imagenPrincipalMediana" :alt="productoCodigo[0].descripcion_comercial" />

              <div v-if="productoCodigo[0].caracteristicas.length > 0" class="mt-8 mr-5 ml-2">
                <h1 class="text-subtitle-2">Características:</h1>
                <v-row>
                  <template v-for="caracteristica in productoCodigo[0].caracteristicas">
                    <v-tooltip top :key="caracteristica.id">
                      <template v-slot:activator="{on, attrs}">
                        <img
                          class="imagenCaracteristica"
                          :src="caracteristica.imagen"
                          v-on="on"
                          v-bind="attrs"
                          :alt="caracteristica.nombre"
                          @click.stop="mostrarTextoInfo(caracteristica.descripcion)">
                      </template>
                      <span>{{caracteristica.nombre}}</span>
                    </v-tooltip>
                  </template>
                </v-row>
              </div>
              <v-card v-if="this.textoInfo !== ''" class="mt-5 elevation-10">
                <v-card-text>
                  <p>{{textoInfo}}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" small @click="cerrarTextoInfo">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-container>
          </v-col>
          <v-col cols="12" md="6" :class="this.$vuetify.breakpoint.xs ? 'pt-0' : ''">
            <v-container :class="$vuetify.breakpoint.xs ? 'pt-0' : ''">
              <v-card-title class="font-weight-black">
                <h1 class="titulo">{{ productoCodigo[0].familia }} {{ productoCodigo[0].descripcion_comercial }}</h1>
              </v-card-title>
              <v-divider class="mx-8"></v-divider>
              <v-card-text>
                  <p class="ma-0 text-justify">{{ productoCodigo[0].descripcion_larga }}</p>
                  <p class="ma-0" v-if="productoCodigo[0].material !== null">
                    <strong class="font-weight-black primary--text">MATERIAL:</strong> {{ productoCodigo[0].material }}
                  </p>
                  <p class="ma-0" v-if="productoCodigo[0].medidas !== null">
                    <strong class="font-weight-black primary--text">MEDIDAS:</strong> {{ productoCodigo[0].medidas }}
                  </p>
                  <p class="ma-0" v-if="productoCodigo[0].area_impresion !== null">
                    <strong class="font-weight-black primary--text">ÁREA DE IMPRESIÓN APROXIMADA:</strong> {{ productoCodigo[0].area_impresion }}
                  </p>
                  <p class="ma-0" v-if="productoCodigo[0].tecnica_marca_descripcion !== null">
                    <strong class="font-weight-black primary--text">MARCA:</strong> {{ productoCodigo[0].tecnica_marca_descripcion }}
                  </p>
                  <p class="ma-0" v-if="productoCodigo[0].empaque !== null">
                    <strong class="font-weight-black primary--text">EMPAQUE:</strong> {{ productoCodigo[0].empaque }}
                  </p>
                  <p class="ma-0">
                    <strong class="font-weight-black primary--text">Categorias:</strong> <router-link class="linksCategorias" :to="'/productos?subCategoria=' + productoCodigo[0].subcategoria_1.jerarquia">{{ productoCodigo[0].subcategoria_1.nombre }}</router-link> | <router-link class="linksCategorias" :to="'/productos?categoria=' + productoCodigo[0].subcategoria_1.categoria.jerarquia">{{productoCodigo[0].subcategoria_1.categoria.nombre}}</router-link>
                  </p>
                  <template v-if="existeUsuario">
                    <div>
                      <v-card-subtitle class="font-weight-black primary--text px-0 pb-0">
                        PRECIO:
                      </v-card-subtitle>
                      <v-card-title class="pa-0" v-for="(valor, index) in productoCodigo[0].materiales" :key="valor.codigo">
                        <template v-if="valor.variedad !== null">
                          $ {{addCommas(Math.round(valor.precio))}} + iva
                        <div class="contenedor_color">
                          <v-tooltip bottom dense>
                            <template v-slot:activator="{on, attrs}">
                              <div
                                v-if="valor.color_hex_2 !== null && valor.color_hex_3 !== null"
                                v-bind="attrs"
                                v-on="on"
                                :style="`background: linear-gradient(rgb(${hextToRgb(valor.color_hex_1)[0]}, ${hextToRgb(valor.color_hex_1)[1]}, ${hextToRgb(valor.color_hex_1)[2]}) 0%, rgb(${hextToRgb(valor.color_hex_2)[0]}, ${hextToRgb(valor.color_hex_2)[1]}, ${hextToRgb(valor.color_hex_2)[2]}) 48%, rgb(${hextToRgb(valor.color_hex_2)[0]}, ${hextToRgb(valor.color_hex_2)[1]}, ${hextToRgb(valor.color_hex_2)[2]}) 62%, rgb(${hextToRgb(valor.color_hex_3)[0]}, ${hextToRgb(valor.color_hex_3)[1]}, ${hextToRgb(valor.color_hex_3)[2]}) 66%, rgb(${hextToRgb(valor.color_hex_3)[0]}, ${hextToRgb(valor.color_hex_3)[1]}, ${hextToRgb(valor.color_hex_3)[2]}) 100%)`"
                                class="circuloProducto"
                              ></div>
                              <div
                                v-else-if="valor.color_hex_2 !== null && valor.color_hex_3 === null"
                                v-bind="attrs"
                                v-on="on"
                                :style="`background: linear-gradient(rgb(${hextToRgb(valor.color_hex_1)[0]}, ${hextToRgb(valor.color_hex_1)[1]}, ${hextToRgb(valor.color_hex_1)[2]}) 40%, rgb(${hextToRgb(valor.color_hex_2)[0]}, ${hextToRgb(valor.color_hex_2)[1]}, ${hextToRgb(valor.color_hex_2)[2]}) 50%)`"
                                class="circuloProducto"
                              >
                              </div>
                              <div
                                v-else
                                v-bind="attrs"
                                v-on="on"
                                :style="'background:' + valor.color_hex_1"
                                class="circuloProducto"
                              ></div>
                            </template>
                            <span>{{valor.color_nombre}}</span>
                          </v-tooltip>
                        </div>
                          {{valor.variedad}}
                        </template>
                        <template v-else>
                          <template v-if="index === 0">
                            $ {{addCommas(Math.round(valor.precio))}} + iva
                          </template>
                        </template>
                      </v-card-title>
                      <v-card-subtitle class="px-0 pt-5">
                        <span class="font-weight-black primary--text">Última Actualización de Precio:</span> {{productoCodigo[0].materiales[0].ultima_actualizacion_precio.substr(0,10)}}
                      </v-card-subtitle>
                    </div>
                  </template>
                  <p v-if="productoCodigo[0].texto_informacion !== null" class="ma-0" :style="'color: ' + productoCodigo[0].color_texto_informacion">{{productoCodigo[0].texto_informacion}}</p>
                  <p class="ma-0 primary--text">El color de los artículos pueden variar según la calibración y resolución de la pantalla.</p>
              </v-card-text>
              <v-card-actions>
                <div class="display-1 primary--text my-2" v-if="Math.round(productoCodigo[0].materiales[0].precio_descuento) !== Math.round(productoCodigo[0].materiales[0].precio)">{{Math.round(productoCodigo[0].materiales[0].descuento)}}% de descuento</div>
                <v-row>
                  <div v-if="productoCodigo[0].etiquetas.length > 0">
                    <img
                      class="pr-2"
                      v-if="productoCodigo[0].etiquetas[0].id === 1"
                      src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/nuevo.png?alt=media&token=7dbffaa3-1580-435a-9739-86c155c5194b"
                      alt="Novedad"
                    >
                  </div>
                  <img
                    class="pr-2"
                    v-if="productoCodigo[0].materiales[0].estado == '3'"
                    src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/saldo.png?alt=media&token=b1d4cf45-0dcc-4285-87e9-c32f63c808d8"
                    alt="Saldo"
                  >
                  <div v-if="productoCodigo[0].etiquetas.length > 0">
                    <img
                      v-if="productoCodigo[0].etiquetas[0].id === 4"
                      src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/Neto.png?alt=media&token=f718bea7-0e92-480d-82e4-56a2d3a2dcbe"
                      alt="Neto"
                      >
                  </div>
                </v-row>
                <v-tooltip v-model="mostrarTooltip" bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      icon
                      @click.stop="dialogTransito = true"
                      class="my-2"
                    >
                      <v-icon>{{mdiFerry}}</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver Importaciones</span>
                </v-tooltip>
                <v-tooltip v-if="productoCodigo[0].videos.length > 0" bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn icon v-on="on" v-bind="attrs" @click="$vuetify.goTo(target, options)">
                      <v-icon>{{ mdiVideoVintage }}</v-icon>
                    </v-btn>
                  </template>
                  <span class="mt-10">Ver Vídeo del Producto</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <!-- eslint-disable-next-line vue/no-parsing-error -->
                    <v-btn icon v-on="on" v-bind="attrs" :href="`https://marpicoprod.azurewebsites.net/api/productos/imagenes/${productoCodigo[0].id}?producto=${productoCodigo[0].familia}`">
                      <v-icon>{{ mdiDownload }}</v-icon>
                    </v-btn>
                  </template>
                  <span class="mt-10">Descargar Imagenes</span>
                </v-tooltip>
              </v-card-actions>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="850" overlay-color="grey darken-4" overlay-opacity="0.9">
      <v-btn dark icon class="float-right mr-5" color="white" @click.stop="dialog = false">
        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
      </v-btn>
      <img v-if="this.imagenPrincipalGrande === ''" :src="productoCodigo[0].imagenes[0].imagen.file" max-height="100%" :alt="productoCodigo[0].descripcion_comercial" />
      <img v-else :src="imagenPrincipalGrande" max-height="100%" :alt="productoCodigo[0].descripcion_comercial" />
    </v-dialog>
    <v-container class="pt-0">
      <v-sheet class="mx-auto" elevation="8">
        <v-slide-group v-model="model" class="px-4 py-5" :prev-icon="mdiChevronLeft" :next-icon="mdiChevronRight">
          <v-slide-item v-for="imagen in productoCodigo[0].imagenes" :key="imagen.id">
            <v-row class="grupoImagenes">
              <v-card class="mx-1" outlined>
                <v-img
                  @click="imagenReferencia(imagen.imagen.file_md, imagen.imagen.file), $vuetify.goTo(target2, options2)"
                  width="150"
                  :src="imagen.imagen.file_sm"
                  :alt="productoCodigo[0].descripcion_comercial"
                  class="imagenReferencia"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-row>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-row>
        <v-col cols="12" sm="6">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">SUGERIDOS</th>
                <th class="text-left">COLOR</th>
                <th class="text-left">VARIEDAD</th>
                <th class="text-left">CANTIDADES DISPONIBLES</th>
                <th class="text-left">REFERENCIA</th>
              </tr>
            </thead>
            <tbody v-for="existencias in productoCodigo" :key="existencias.codigo">
              <tr v-for="(existencia, index) in existencias.materiales" :key="index">
                <template>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attrs}">
                        <v-btn
                          v-on="on"
                          v-bind="attrs"
                          icon
                          small=""
                          @click.stop="actualizar(existencia.codigo)"
                          color="primary"
                        >
                          <v-icon>{{mdiMagnify}}</v-icon>
                        </v-btn>
                      </template>
                      <span>Ver Sugerencia en {{existencia.color_nombre}}</span>
                    </v-tooltip>
                  </td>
                  <td>
                    <div class="contenedor_color">
                      <v-tooltip bottom dense>
                        <template v-slot:activator="{on, attrs}">
                          <div
                            v-if="existencia.color_hex_2 !== null && existencia.color_hex_3 !== null"
                            @click.stop="actualizar(existencia.codigo)"
                            v-bind="attrs"
                            v-on="on"
                            :style="`background: linear-gradient(rgb(${hextToRgb(existencia.color_hex_1)[0]}, ${hextToRgb(existencia.color_hex_1)[1]}, ${hextToRgb(existencia.color_hex_1)[2]}) 0%, rgb(${hextToRgb(existencia.color_hex_2)[0]}, ${hextToRgb(existencia.color_hex_2)[1]}, ${hextToRgb(existencia.color_hex_2)[2]}) 48%, rgb(${hextToRgb(existencia.color_hex_2)[0]}, ${hextToRgb(existencia.color_hex_2)[1]}, ${hextToRgb(existencia.color_hex_2)[2]}) 62%, rgb(${hextToRgb(existencia.color_hex_3)[0]}, ${hextToRgb(existencia.color_hex_3)[1]}, ${hextToRgb(existencia.color_hex_3)[2]}) 66%, rgb(${hextToRgb(existencia.color_hex_3)[0]}, ${hextToRgb(existencia.color_hex_3)[1]}, ${hextToRgb(existencia.color_hex_3)[2]}) 100%)`"
                          ></div>
                          <div
                            v-else-if="existencia.color_hex_2 !== null && existencia.color_hex_3 === null"
                            @click.stop="actualizar(existencia.codigo)"
                            v-bind="attrs"
                            v-on="on"
                            :style="`background: linear-gradient(rgb(${hextToRgb(existencia.color_hex_1)[0]}, ${hextToRgb(existencia.color_hex_1)[1]}, ${hextToRgb(existencia.color_hex_1)[2]}) 40%, rgb(${hextToRgb(existencia.color_hex_2)[0]}, ${hextToRgb(existencia.color_hex_2)[1]}, ${hextToRgb(existencia.color_hex_2)[2]}) 50%)`"
                          >
                          </div>
                          <div
                            v-else
                            @click.stop="actualizar(existencia.codigo)"
                            v-bind="attrs"
                            v-on="on"
                            :style="'background:' + existencia.color_hex_1"
                          ></div>
                        </template>
                        <span>{{existencia.color_nombre}}</span>
                      </v-tooltip>
                    </div>
                  </td>
                  <td>
                    {{existencia.color_nombre}} <span v-if="existencia.variedad !== null">{{existencia.variedad}}</span>
                  </td>
                  <td class="red--text" v-if="existencia.inventario < 10">Agotado</td>
                  <td v-else>{{existencia.inventario}}</td>
                  <td>{{existencia.codigo}}</td>
                </template>
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="productoCodigo[0].videos.length > 0" class="mt-3">
            <v-responsive :aspect-ratio="16/9">
              <video loop autoplay muted controls tabindex="0" width="100%">
                <source :src="productoCodigo[0].videos[0].video" type="video/mp4" />
              </video>
            </v-responsive>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <h1 class="primary--text text-center">
            Productos Sugeridos
          </h1>

          <v-divider class="mx-10"></v-divider>
          <h3 v-if="this.textoSugerido !== ''" class="text-center">
            {{this.textoSugerido}}
          </h3>
          <v-row v-if="productoSugerencia.length > 0">
            <v-col cols="12" sm="6" v-for="producto in productoSugerencia" :key="producto.familia">
              <v-card outlined class="mx-auto tarjetaProducto">
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
                          <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </router-link>
                </v-card-text>
                    <v-card-title
                  class="text-center text-subtitle-2"
                >
                  {{ producto.producto.descripcion_comercial }}
                </v-card-title>
                <v-card-subtitle>
                  {{ producto.producto.familia }}
                </v-card-subtitle>
                <v-card-text class="text-center">
                  <div class="red--text" v-if="producto.inventario < 10">Agotado en {{producto.color_nombre}}</div>
                  <div v-else>Inventario: {{producto.inventario}} unidades.</div>
                </v-card-text>
                <div class="text-center">
                  <img v-if="producto.estado == '2'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/nuevo.png?alt=media&token=7dbffaa3-1580-435a-9739-86c155c5194b" alt="Novedad" class="text-center" width="80">
                  <img v-if="producto.estado == '3'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/saldo.png?alt=media&token=b1d4cf45-0dcc-4285-87e9-c32f63c808d8" alt="Saldo" class="text-center" width="80">
                </div>
                <v-card-title v-if="existeUsuario">
                  ${{ addCommas(Math.round(producto.precio)) }} + iva
                </v-card-title>
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
          <v-col v-else>
            <div class="text-center pt-10">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-col>
      </v-row>

    </v-container>

    <v-dialog v-model="dialogTransito" max-width="650" overlay-color="grey darken-4" overlay-opacity="0.9">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">COLOR</th>
            <th class="text-left">CANTIDADES EN TRÁNSITO</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="existencias in productoCodigo">
            <tr v-for="(existencia, index) in existencias.materiales" :key="index">
              <td>{{existencia.color_nombre}} <span v-if="existencia.variedad !== null">{{existencia.variedad}}</span></td>
              <td>{{existencia.en_transito}}</td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

  </div>
  <div v-else class="mx-auto">
    <v-container class="fill-height mt-16 mx-auto">
      <v-row align="center" justify="center">
        <v-progress-circular
          :size="100"
          :width="7"
          color="primary"
          indeterminate
        >
          Cargando
        </v-progress-circular>
      </v-row>
    </v-container>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import {
  mdiCloseCircleOutline,
  mdiChevronRight,
  mdiChevronLeft,
  mdiFerry,
  mdiMagnify,
  mdiVideoVintage,
  mdiDownload,
} from '@mdi/js';

export default {
  name: 'codigo',
  data() {
    return {
      textoSugerido: '',
      textoInfo: '',
      productoCodigo: [],
      productoSugerencia: [],
      imagenPrincipalMediana: '',
      imagenPrincipalGrande: '',
      codigo: this.$route.params.codigo,
      dialog: false,
      dialogTransito: false,
      mdiCloseCircleOutline,
      mdiChevronRight,
      mdiChevronLeft,
      mdiFerry,
      mdiMagnify,
      mdiVideoVintage,
      mdiDownload,
      model: null,
      overlay: false,
      mostrarTooltip: false,
      categoriaPrincipal: '',
      categoriaSecundaria: '',
      duration: 1000,
      number: 1650,
      number2: 250,
      offset: 0,
      easing: 'easeInQuart',
      type: 'number',
      type2: 'number2',
    };
  },
  watch: {
    overlay(valor) {
      // eslint-disable-next-line no-unused-expressions
      valor && setTimeout(() => {
        this.overlay = false;
      }, 500);
    },
  },
  computed: {
    ...mapGetters(['existeUsuario']),
    target() {
      const value = this[this.type];
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(value)) return Number(value);
      return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
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
    hextToRgb(hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        // eslint-disable-next-line prefer-template
        (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    },
    mostrarTextoInfo(texto) {
      this.textoInfo = texto;
    },
    cerrarTextoInfo() {
      this.textoInfo = '';
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
        this.categoriaPrincipal = this.productoCodigo[0].subcategoria_1.categoria.nombre;
        this.categoriaSecundaria = this.productoCodigo[0].subcategoria_1.nombre;
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
};
</script>

<style scoped>
  .router-link-active {
    color: inherit !important;
  }
  .router-link-active:hover {
    color: #2196f3 !important;
  }
  .imagenCaracteristica {
   width: 80px;
  }
  .fotoTarjeta {
    margin-top: -45px;
    width: 100%;
    max-width: 100%;
    cursor: zoom-in;
  }

  .fotoTarjetaGrande {
    margin-left: 20px;
  }

  .grupoImagenes {
    margin: 0 !important;
  }

  .titulo {
    font-size: 20px;
  }

  .imagenReferencia {
    cursor: pointer;
    transition: 500ms;
    opacity: .3;
  }

  .imagenReferencia:hover {
    opacity: 1;
  }

  .linkCategoria:hover {
    color: #1976d2 !important;
    text-decoration: underline;
  }
  .precio {
    padding: 0 !important;
  }

  .linksCategorias {
    color: inherit !important;
    transition: color .3s;
  }
  .linksCategorias:hover {
    color: #1976d2 !important;
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
.contenedor_color {
  position: relative;
  height: 20px;
  max-height: 20px;
  width: 20px;
  margin: 2px 4px;
  border-radius: 100%;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid black;
}
.contenedor_color div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.tarjetaProducto {
  transition: all .4s;
}
.tarjetaProducto:hover {
  transform: translateY(-15px);
}
</style>
