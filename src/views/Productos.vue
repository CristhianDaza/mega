<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero :title="titulo"/>
    <v-container class="pt-0">
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <v-row>
        <v-col class="pt-1" cols="12" sm="4" md="3">
          <filter-inventory
            v-if="productos.length > 0"
          />
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
          <filter-color
            v-if="listaColores.length > 0"
            :colorList="listaColores"
          />
          <v-card
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            class="mt-3"
            shaped
            elevation="3"
          >
            <v-list
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              v-if="categories"
              dense
            >
              <v-subheader
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >Categorías</v-subheader>
              <v-list-group
                v-for="categoria in categories"
                :key="categoria.id_pagina"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title
                      :style="{ color: $vuetify.theme.themes[theme].azul }"
                    >
                      {{ categoria.nombre }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="subCategoria in categoria.subcategorias"
                  :key="subCategoria.id_pagina"
                  @click="buscarSubCategoria(subCategoria.jerarquia, subCategoria.nombre)"
                >
                  <v-list-item-content>
                    <v-list-item-title
                    :style="{ color: $vuetify.theme.themes[theme].colorText }">
                      {{ subCategoria.nombre }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <h2 v-if="this.infoProductos.length > 0" class="text-subtitle-1 mb-2" :style="{color: 'white'}">Resultados: {{this.infoProductos.count}}</h2>
            <div v-if="this.productos.length > 0" >
              <mp-button
                v-if="Number(totalPaginas) > 1"
                is-full
                @click="cambiarPorPagina(Number(infoProductos.count))"
              >
                VER TODOS LOS {{ Number(infoProductos.count) }} PRODUCTOS
              </mp-button>
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
                  <Products :producto='producto' :colores='producto.materiales' />
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
              <mp-button
                v-if="Number(totalPaginas) > 1"
                is-full
                @click="cambiarPorPagina(Number(infoProductos.count))"
              >
                VER TODOS LOS {{ Number(infoProductos.count) }} PRODUCTOS
              </mp-button>
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
import layoutPrincipal from '@/mixins/layoutPrincipal';
import hextToRgb from '@/helpers/hextToRgb';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProductosMega',
  mixins: [layoutPrincipal],
  data() {
    return {
      hextToRgb,
      listaCategorias: true,
      productos: [],
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
      listaEtiquetas: [],
      listaColores: [],
      nombreCategoria: 'Productos',
    };
  },
  components: {
    FilterColor: () => import(/* webpackChunkName: "filterColor" */ '@/components/Productos/FilterColor.vue'),
    FilterInventory: () => import(/* webpackChunkName: "filterInventory" */ '@/components/Productos/FilterInventory.vue'),
    Products: () => import(/* webpackChunkName: "products" */ '@/components/Productos/Products.vue'),
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
  },
  computed: {
    ...mapState('categories', ['categories']),
    breadcrumbs() {
      return [
        { title: 'Inicio', disabled: false, toLink: '/' },
        { title: 'Productos', disabled: true, toLink: '/productos' },
      ];
    },
  },
  methods: {
    ...mapActions('categories', ['getCategories']),
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

<style>
  .v-text-field__details {
    display: none !important;
  }
</style>
