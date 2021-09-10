<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Buscar"/>
    <v-container class="pt-0">
      <div class="links">
        <ul>
          <li>
            <router-link
              exact
              to="/"
              class="links__item"
            >INICIO</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            BUSCAR
          </li>
        </ul>
      </div>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <v-card
            v-if="this.productos.length > 0"
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
          >
            <v-card-text class="py-0">
              <v-list
                :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              >
                <v-subheader
                  class="pa-0"
                  :style="{ color: $vuetify.theme.themes[theme].colorText }"
                >Filtrar por inventario</v-subheader>
                <v-text-field
                  label="Inventario Mayor a"
                  outlined
                  type="number"
                  v-model="inputInventario"
                  @keyup.enter="buscarInventario(inputInventario)"
                >
                </v-text-field>
                <v-btn
                  @click="buscarInventario(inputInventario)"
                  :style="{ color: $vuetify.theme.themes[theme].azul }"
                  block
                  outlined
                >
                  Filtrar
                </v-btn>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card
            v-if="this.listaColores.length > 0"
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            class="mt-3">
            <v-list
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              dense
            >
              <v-subheader
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >Filtrar por color</v-subheader>
              <v-list-item-group>
                <v-card-subtitle class="d-flex flex-wrap pt-0">
                  <template v-for="color in this.listaColores">
                    <div
                      class="contenedor_color"
                      :key="color.id"
                      @click="buscarColor(color.id)"
                    >
                      <v-tooltip bottom dense>
                        <template v-slot:activator="{on, attrs}">
                          <div
                            v-if="color.hex_2 !== null && color.hex_3 !== null"
                            v-bind="attrs"
                            v-on="on"
                            :style="`background: linear-gradient(rgb(${hextToRgb(color.hex_1)[0]}, ${hextToRgb(color.hex_1)[1]}, ${hextToRgb(color.hex_1)[2]}) 0%, rgb(${hextToRgb(color.hex_2)[0]}, ${hextToRgb(color.hex_2)[1]}, ${hextToRgb(color.hex_2)[2]}) 48%, rgb(${hextToRgb(color.hex_2)[0]}, ${hextToRgb(color.hex_2)[1]}, ${hextToRgb(color.hex_2)[2]}) 62%, rgb(${hextToRgb(color.hex_3)[0]}, ${hextToRgb(color.hex_3)[1]}, ${hextToRgb(color.hex_3)[2]}) 66%, rgb(${hextToRgb(color.hex_3)[0]}, ${hextToRgb(color.hex_3)[1]}, ${hextToRgb(color.hex_3)[2]}) 100%)`"
                          ></div>
                          <div
                            v-else-if="color.hex_2 !== null && color.hex_3 === null"
                            v-bind="attrs"
                            v-on="on"
                            :style="`background: linear-gradient(rgb(${hextToRgb(color.hex_1)[0]}, ${hextToRgb(color.hex_1)[1]}, ${hextToRgb(color.hex_1)[2]}) 40%, rgb(${hextToRgb(color.hex_2)[0]}, ${hextToRgb(color.hex_2)[1]}, ${hextToRgb(color.hex_2)[2]}) 50%)`"
                          >
                          </div>
                          <div
                            v-else
                            v-bind="attrs"
                            v-on="on"
                            :style="'background:' + color.hex_1"
                          ></div>
                        </template>
                        <span>
                          {{color.nombre}}
                        </span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-card-subtitle>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <div v-if="this.productos.length > 0">
            <h1
              :style="{color: 'white'}"
            >Busqueda: {{this.$route.query.busqueda}}</h1>
            <h2
              :style="{color: 'white'}"
              class="text-subtitle-1 mb-4">
              Resultados: {{this.infoProductos.count}}
            </h2>
            <v-btn
              v-if="Number(this.totalPaginas) > 1"
              block
              outlined
              x-large
              color="white"
              @click="cambiarPorPagina(infoProductos.count)">
                Ver los {{ Number(this.infoProductos.count) }} productos
            </v-btn>
            <v-row justify="center">
              <v-col v-if="Number(this.infoProductos.count) > 18" cols="12">
                <v-container class="max-width">
                  <v-pagination
                    circle
                    v-model="pagina"
                    :length="totalPaginas"
                    @input="cambiarPagina(pagina)"
                  >
                  </v-pagination>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <h2
                v-if="Number(this.infoProductos.count) === 0"
                class="text-center error mt-2 ml-2 sinResultados">
                Sin resultados
              </h2>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="(producto) in productos[0]"
                :key="producto.id"
                class="pa-1 mb-5"
              >
                <Productos :producto='producto' :colores='producto.materiales' />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col v-if="Number(this.infoProductos.count) > 18" cols="12">
                <v-container class="max-width">
                  <v-pagination
                    circle
                    v-model="pagina"
                    :length="totalPaginas"
                    @input="cambiarPagina(pagina)"
                  >
                  </v-pagination>
                </v-container>
              </v-col>
            </v-row>
            <v-btn
              v-if="Number(this.totalPaginas) > 1"
              block
              outlined
              x-large
              color="white"
              @click="cambiarPorPagina(infoProductos.count)">
                Ver los {{ Number(this.infoProductos.count) }} productos
            </v-btn>
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
import Swal from 'sweetalert2';
import layoutPrincipal from '@/mixins/layoutPrincipal';

export default {
  name: 'Buscar',
  mixins: [layoutPrincipal],
  data() {
    return {
      productos: [],
      infoProductos: [],
      listaColores: [],
      busqueda: this.$route.query.busqueda || '',
      pagina: Number(this.$route.query.pagina) || 1,
      porPagina: Number(this.$route.query.porPagina) || 20,
      inputInventario: Number(this.$route.query.inventario) || null,
      inventario: Number(this.$route.query.inventario) || '',
      color: this.$route.query.color || '',
      totalPaginas: 0,
    };
  },
  components: {
    Hero: () => import(/* webpackChunkName: "Hero" */ '@/components/Global/Hero.vue'),
    Loader: () => import(/* webpackChunkName: "Loader" */ '@/components/Global/Loader.vue'),
    Productos: () => import(/* webpackChunkName: "Productos" */ '@/components/Productos/Productos.vue'),
  },
  methods: {
    async getProductosBusqueda(
      pagina,
      porPagina,
      busqueda,
      inventario,
      color,
    ) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=${porPagina}&page=${pagina}&search=${busqueda}&inventario=${inventario}${color ? `&color=${color}` : ''}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.productos.push(res.data.results);
        this.infoProductos = res.data;
        this.totalPaginas = Math.ceil((this.infoProductos.count / this.porPagina));
        this.listaColores = res.data.filtros.colores;
      });
    },
    hextToRgb(hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        // eslint-disable-next-line prefer-template
        (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    },
    cambiarPagina(pagina) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina,
          porPagina: this.$route.query.porPagina,
          etiqueta: this.$route.query.etiqueta,
          inventario: this.$route.query.inventario,
          busqueda: this.$route.query.busqueda,
          color: this.$route.query.color,
        },
      });
    },
    cambiarPorPagina(porPagina) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: 1,
          porPagina,
          inventario: this.$route.query.inventario,
          busqueda: this.$route.query.busqueda,
          color: this.$route.query.color,
        },
      });
    },
    // eslint-disable-next-line consistent-return
    buscarInventario(inventario) {
      if (inventario == null) {
        Swal.fire(
          '¡Error!',
          'El filtro no puede ir vacío.',
          'error',
        );
        return;
      }
      if (inventario.trim() === '' || inventario == null) {
        Swal.fire(
          '¡Error!',
          'El filtro no puede ir vacío.',
          'error',
        );
        return;
      }
      if (inventario.trim() < 0) {
        Swal.fire(
          '¡Error!',
          'El filtro no puede ser negativo.',
          'error',
        );
        return;
      }
      // eslint-disable-next-line eqeqeq
      if (inventario.trim() == 0) {
        Swal.fire(
          '¡Error!',
          'El filtro debe ser mayor a 0.',
          'error',
        );
        return;
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          inventario,
          busqueda: this.$route.query.busqueda,
          color: this.$route.query.color,
        },
      });
    },
    buscarColor(color) {
      this.$router.push({
        path: this.$route.path,
        query: {
          inventario: this.$route.query.inventario,
          busqueda: this.$route.query.busqueda,
          color,
        },
      });
    },
  },
  mounted() {
    this.getProductosBusqueda(
      this.pagina,
      this.porPagina,
      this.busqueda,
      this.inventario,
      this.color,
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
