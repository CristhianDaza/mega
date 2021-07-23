<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero :titulo="titulo"/>
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
            PRODUCTOS
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
                  Filtrar Inventario
                </v-btn>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card
            v-if="this.listaEtiquetas.length > 0"
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            class="mt-3">
            <v-list
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              dense
            >
              <v-subheader
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >Etiquetas</v-subheader>
              <v-list-item-group>
                <v-list-item v-for="etiqueta in this.listaEtiquetas" :key="etiqueta.id">
                  <v-list-item-title
                    :style="{ color: $vuetify.theme.themes[theme].colorText }"
                    @click="buscarEtiqueta(etiqueta.id)">
                    {{ etiqueta.nombre }} {{ etiqueta.count === 1 ? `(${etiqueta.count} producto)` : `(${etiqueta.count} productos)` }}
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
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
          <v-card
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            class="mt-3">
            <v-list
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              v-if="this.categorias.length > 0"
              dense
            >
              <v-subheader
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >Categorías</v-subheader>
              <v-list-group
                v-for="categoria in this.categorias[0]"
                :key="categoria.id_pagina"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title
                      :style="{ color: $vuetify.theme.themes[theme].azul }"
                      v-text="categoria.nombre"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="subCategoria in categoria.subcategorias"
                  :key="subCategoria.id_pagina"
                  @click="buscarSubCategoria(subCategoria.jerarquia, subCategoria.nombre)"
                >
                  <v-list-item-content>
                    <v-list-item-title
                    :style="{ color: $vuetify.theme.themes[theme].colorText }"
                    v-text="subCategoria.nombre"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <h2 v-if="this.infoProductos.length > 0" class="text-subtitle-1 mb-2" :style="{color: 'white'}">Resultados: {{this.infoProductos.count}}</h2>
            <div v-if="this.productos.length > 0" >
              <v-btn
                v-if="Number(this.totalPaginas) > 1"
                block
                outlined
                large
                color="white"
                @click="cambiarPorPagina(Number(infoProductos.count))">
                  Ver los {{Number(this.infoProductos.count) }} productos
              </v-btn>
              <v-row justify="center">
                <v-col v-if="Number(this.infoProductos.count) > 16" cols="12">
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

              <v-row v-if="this.productos.length > 0">
                <h2 v-if="Number(this.infoProductos.count) === 0" class="text-center error mt-2 ml-2 sinResultados">Sin resultados</h2>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  v-for="(producto) in productos[0]"
                  :key="producto.id"
                  class="pa-1"
                >
                  <Productos :producto='producto' :colores='producto.materiales' />
                </v-col>
              </v-row>
              <v-row v-if="this.productos.length > 0" justify="center">
                <v-col v-if="Number(this.infoProductos.count) > 16" cols="12">
                  <v-container class="max-width">
                    <v-pagination
                      v-model="pagina"
                      circle
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
                large
                color="white"
                @click="cambiarPorPagina(Number(infoProductos.count))">
                  Ver los {{Number(this.infoProductos.count) }} productos
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
import Productos from '@/components/Productos/Productos.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import Hero from '@/components/Global/Hero.vue';
import Loader from '@/components/Global/Loader.vue';
import layoutPrincipal from '@/mixins/layoutPrincipal';
import hextToRgb from '@/mixins/hextToRgb';

export default {
  name: 'ProductosMega',
  mixins: [layoutPrincipal, hextToRgb],
  data() {
    return {
      listaCategorias: true,
      productos: [],
      categorias: [],
      colores: [],
      inputInventario: Number(this.$route.query.inventario) || null,
      pagina: Number(this.$route.query.pagina) || 1,
      categoria: Number(this.$route.query.categoria) || '',
      subCategoria: Number(this.$route.query.subCategoria) || '',
      etiqueta: Number(this.$route.query.etiqueta) || '',
      inventario: Number(this.$route.query.inventario) || '',
      busqueda: this.$route.query.busqueda || '',
      titulo: this.$route.query.titulo || 'Productos',
      color: this.$route.query.color || '',
      infoProductos: [],
      totalPaginas: 0,
      porPagina: Number(this.$route.query.porPagina) || 16,
      listaPorPaginas: [
        { text: '16', value: 16 },
        { text: '32', value: 32 },
        { text: '64', value: 64 },
      ],
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'productos',
          disabled: false,
          href: '/productos',
        },
      ],
      listaEtiquetas: [],
      listaColores: [],
      nombreCategoria: 'Productos',
    };
  },
  components: {
    Productos,
    Hero,
    Loader,
  },
  methods: {
    async getProductos(
      pagina,
      porPagina,
      categoria,
      subCategoria,
      etiqueta,
      inventario,
      busqueda,
      color,
    ) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=${porPagina}&page=${pagina}&categoria=${categoria}&subcategoria=${subCategoria}&order=paginacion_web&etiqueta=${etiqueta}&inventario=${inventario}&search=${busqueda}${color ? `&color=${color}` : ''}`;
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
        this.listaEtiquetas = res.data.filtros.etiquetas;
        this.listaColores = res.data.filtros.colores;
      });
    },
    cambiarPagina(pagina) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina,
          porPagina: this.$route.query.porPagina,
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          inventario: this.$route.query.inventario,
          busqueda: this.$route.query.busqueda,
          titulo: this.$route.query.titulo,
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
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          inventario: this.$route.query.inventario,
          busqueda: this.$route.query.busqueda,
          titulo: this.$route.query.titulo,
          color: this.$route.query.color,
        },
      });
    },
    buscarSubCategoria(subCategoria, titulo) {
      this.$router.push({
        path: this.$route.path,
        query: {
          subCategoria,
          titulo,
        },
      });
    },
    // eslint-disable-next-line consistent-return
    buscarInventario(inventario) {
      if (inventario.trim() === '') {
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
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          inventario,
          busqueda: this.$route.query.busqueda,
          titulo: this.$route.query.titulo,
          color: this.$route.query.color,
        },
      });
    },
    buscarEtiqueta(etiqueta) {
      this.$router.push({
        path: this.$route.path,
        query: {
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta,
          titulo: this.$route.query.titulo,
          color: this.$route.query.color,
        },
      });
    },
    buscarColor(color) {
      this.$router.push({
        path: this.$route.path,
        query: {
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          titulo: this.$route.query.titulo,
          color,
        },
      });
    },
    async getCategorias() {
      const url = 'https://marpicoprod.azurewebsites.net/api/categorias/';
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.categorias.push(res.data);
      });
    },
  },
  mounted() {
    this.getProductos(
      this.pagina,
      this.porPagina,
      this.categoria,
      this.subCategoria,
      this.etiqueta,
      this.inventario,
      this.busqueda,
      this.color,
    );
    this.getCategorias();
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
