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
              <v-img v-if="this.imagenPrincipalMediana === ''" :class="$vuetify.breakpoint.xs ? '' : 'fotoTarjetaGrande'" class="fotoTarjeta elevation-18" @click.stop="dialog = true" :src="productoCodigo[0].imagenes[0].imagen.file_md" :alt="productoCodigo[0].descripcion_comercial">
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

              <v-img v-else :class="$vuetify.breakpoint.xs ? '' : 'fotoTarjetaGrande'" class="fotoTarjeta elevation-18" @click.stop="dialog = true" :src="imagenPrincipalMediana" :alt="productoCodigo[0].descripcion_comercial">
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

              <div v-if="productoCodigo[0].caracteristicas.length > 0" class="mt-8 mr-5 ml-2">
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
                <h1 class="titulo">{{ productoCodigo[0].descripcion_comercial }} - {{ productoCodigo[0].familia }}</h1>
              </v-card-title>
              <v-divider class="mx-8"></v-divider>
              <v-card-text>
                  <p class="ma-0">{{ productoCodigo[0].descripcion_larga }}</p>
                  <p class="ma-0" v-if="productoCodigo[0].material !== null">
                    <strong class="font-weight-black primary--text">MATERIAL:</strong> {{ productoCodigo[0].material }}
                  </p>
                  <p class="ma-0">
                    <strong class="font-weight-black primary--text">MEDIDAS:</strong> {{ productoCodigo[0].medidas }}
                  </p>
                  <p class="ma-0" v-if="productoCodigo[0].area_impresion !== null">
                    <strong class="font-weight-black primary--text">ÁREA DE IMPRESIÓN APROXIMADA:</strong> {{ productoCodigo[0].area_impresion }}
                  </p>
                  <p class="ma-0" v-if="productoCodigo[0].tecnica_marca_descripcion !== null">
                    <strong class="font-weight-black primary--text">MARCA:</strong> {{ productoCodigo[0].tecnica_marca_descripcion }}
                  </p>
                  <p class="ma-0">
                    <strong class="font-weight-black primary--text">EMPAQUE:</strong> {{ productoCodigo[0].empaque }}
                  </p>
                  <div v-if="existeUsuario">
                    <p class="ma-0" v-if="Math.round(productoCodigo[0].materiales[0].precio_descuento) === Math.round(productoCodigo[0].materiales[0].precio)">
                      <strong class="font-weight-black primary--text">PRECIO:</strong> ${{Math.round(productoCodigo[0].materiales[0].precio)}} + iva
                    </p>
                    <p class="ma-0" v-else>
                      <strong class="font-weight-black primary--text">PRECIO:</strong> ${{Math.round(productoCodigo[0].materiales[0].precio_descuento)}} + iva
                    </p>
                  </div>
                  <p class="ma-0 mt-4 primary--text">El color de los artículos pueden variar según la calibración y resolución de la pantalla.</p>
              </v-card-text>
              <v-card-text>
                <p class="ma-0">
                  <strong class="font-weight-black primary--text">Categorias:</strong> <router-link :to="'/productos?subCategoria=' + productoCodigo[0].subcategoria_1.jerarquia">{{ productoCodigo[0].subcategoria_1.nombre }}</router-link> | <router-link :to="'/productos?categoria=' + productoCodigo[0].subcategoria_1.categoria.jerarquia">{{productoCodigo[0].subcategoria_1.categoria.nombre}}</router-link>
                </p>
              </v-card-text>
              <v-card-actions class="pl-4 d-block">
                <div class="display-1 primary--text d-block my-2" v-if="Math.round(productoCodigo[0].materiales[0].precio_descuento) !== Math.round(productoCodigo[0].materiales[0].precio)">{{Math.round(productoCodigo[0].materiales[0].descuento)}}% de descuento</div>
                <div v-if="productoCodigo[0].etiquetas.length > 0">
                  <img
                    class="d-block my-2"
                    v-if="productoCodigo[0].etiquetas[0].id === 1"
                    src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/nuevo.png?alt=media&token=7dbffaa3-1580-435a-9739-86c155c5194b"
                    alt="Novedad"
                  >
                </div>
                <img
                  class="d-block my-2"
                  v-if="productoCodigo[0].materiales[0].estado == '3'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/saldo.png?alt=media&token=b1d4cf45-0dcc-4285-87e9-c32f63c808d8"
                  alt="Saldo"
                >
                <div v-if="productoCodigo[0].etiquetas.length > 0">
                  <img
                    v-if="productoCodigo[0].etiquetas[0].id === 4"
                    src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/Neto.png?alt=media&token=f718bea7-0e92-480d-82e4-56a2d3a2dcbe"
                    alt="Neto"
                    class="d-block my-2">
                </div>
                <v-tooltip v-model="mostrarTooltip" bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      icon
                      @click.stop="dialogTransito = true"
                      class="d-block my-2"
                    >
                      <v-icon>{{mdiFerry}}</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver Importaciones</span>
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
      <v-img v-if="this.imagenPrincipalGrande === ''" :src="productoCodigo[0].imagenes[0].imagen.file" max-height="100%" :alt="productoCodigo[0].descripcion_comercial">
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
      <v-img v-else :src="imagenPrincipalGrande" max-height="100%" :alt="productoCodigo[0].descripcion_comercial">
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
    </v-dialog>
    <v-container>
      <v-sheet class="mx-auto" elevation="8">
        <v-slide-group v-model="model" class="px-4 py-5" :prev-icon="mdiChevronLeft" :next-icon="mdiChevronRight">
          <v-slide-item v-for="imagen in productoCodigo[0].imagenes" :key="imagen.id">
            <v-row class="grupoImagenes">
              <v-card class="mx-1" outlined>
                <v-img
                  @click="imagenReferencia(imagen.imagen.file_md, imagen.imagen.file)"
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
          <v-simple-table class="mt-5">
            <thead>
              <tr>
                <th class="text-left">COLOR</th>
                <th class="text-left">CANTIDADES DISPONIBLES</th>
                <th class="text-left">REFERENCIA</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="existencias in productoExistencias[0].materiales" :key="existencias.codigo">
                <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      icon
                      small=""
                      @click.stop="actualizar(existencias.codigo)"
                      color="primary"
                    >
                      <v-icon>{{mdiMagnify}}</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver Sugerencia en {{existencias.color_nombre}}</span>
                </v-tooltip>
                  {{existencias.color_nombre}}
                </td>
                <td class="red--text" v-if="existencias.inventario_almacen[0].cantidad < 10">Agotado</td>
                <td v-else>{{existencias.inventario}}</td>
                <td>{{existencias.codigo}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="productoCodigo[0].videos.length > 0" class="mt-3">
            <v-responsive :aspect-ratio="16/9">
              <video loop controls tabindex="0" width="100%">
                <source :src="productoCodigo[0].videos[0].video" type="video/mp4" />
              </video>
            </v-responsive>
          </div>
        </v-col>
        <v-col cols="12" sm="6" v-if="productoSugerencia.length > 0">
          <h1 class="primary--text text-center">
            Productos Sugeridos
          </h1>

          <v-divider class="mx-10"></v-divider>
          <v-row>
            <v-col cols="12" sm="6" v-for="producto in productoSugerencia" :key="producto.familia">
              <v-card outlined class="mx-auto">
                <v-card-text class="pa-0 div-img">
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
                    <div class="text">Ver Producto</div>
                  </router-link>
                </v-card-text>
                <v-card-subtitle
                  class="text-center font-weight-medium"
                >
                  {{ producto.producto.familia }} - {{ producto.producto.descripcion_comercial }}
                </v-card-subtitle>
                  <v-card-subtitle v-if="existeUsuario" class="precio">
                      <div
                      class="text-center font-weight-medium"
                    >
                      ${{ Math.round(producto.precio) }} + iva
                    </div>
                  </v-card-subtitle>
                <v-card-text class="text-center">
                  <img v-if="producto.estado == '2'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/nuevo.png?alt=media&token=7dbffaa3-1580-435a-9739-86c155c5194b" alt="Novedad" class="text-center" width="80">
                  <img v-if="producto.estado == '3'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/saldo.png?alt=media&token=b1d4cf45-0dcc-4285-87e9-c32f63c808d8" alt="Saldo" class="text-center" width="80">
                </v-card-text>
                <v-divider class="mx-5"></v-divider>
                <v-card-actions>
                <v-btn
                  :to="{path: `/producto/${producto.producto.familia}`}"
                  outlined block
                  color="primary"
                  text
                  append
                >
                    Ver inventario
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else>
          <div class="text-center pt-10">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>

    </v-container>

    <v-dialog v-model="dialogTransito" max-width="650" overlay-color="grey darken-4" overlay-opacity="0.9">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">COLOR</th>
            <th class="text-left">CANTIDADES EN TRÁNSITO</th>
            <th class="text-left">ESTADO DEL PRODUCTO</th>
            <th class="text-left">INGRESO AL SISTEMA</th>
            <th class="text-left">ÚLTIMA ACTUALIZACIÓN</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="existencias in productoExistencias[0].materiales">
            <tr v-for="traking in existencias.trackings_importacion" :key="traking.codigo">
              <td>{{existencias.color_nombre}}</td>
              <td>{{traking.cantidad}}</td>
              <td>{{traking.estado}}</td>
              <td>{{traking.fecha}}</td>
              <td>{{traking.ultima_actualizacion.substr(0,10)}}</td>
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
} from '@mdi/js';

export default {
  name: 'codigo',
  data() {
    return {
      textoInfo: '',
      productoCodigo: [],
      productoExistencias: [],
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
      model: null,
      overlay: false,
      mostrarTooltip: false,
      categoriaPrincipal: '',
      categoriaSecundaria: '',
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
  },
  methods: {
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
        this.getProductoExistencias(this.codigo);
        this.getProductosSugerencia(this.productoCodigo[0].materiales[0].codigo);
        this.categoriaPrincipal = this.productoCodigo[0].subcategoria_1.categoria.nombre;
        this.categoriaSecundaria = this.productoCodigo[0].subcategoria_1.nombre;
      });
    },
    async getProductoExistencias(codigo) {
      const url = `https://marpicoprod.azurewebsites.net/api/inventarios/materialesAPIByProducto?producto=${codigo}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.productoExistencias.push(res.data[0]);
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
};
</script>

<style>
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

  .div-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.div-img .imagenProducto {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transform: scale(1);
  -ms-transform: scale(1);
  -moz-transform: scale(1);
  -webkit-transform: scale(1);
  -o-transform: scale(1);
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
}
.div-img .text {
  font-family: "Open Sans";
  padding-top: 5px;
  display: block;
  text-align: center;
  width: 100%;
  transform: translate(0px);
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
  opacity: 0;
  transition: transfom opacity 1.5s;
}
.div-img:hover .imagenProducto {
  transform: scale(0.8);
  -ms-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -webkit-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
.div-img:hover .text {
  transform: translate(0px, -20px);
  opacity: 1;
}

  a {
    color: inherit !important;
    transition: color .3s;
  }
  a:hover {
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
</style>
