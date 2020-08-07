<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Productos"/>
    <v-container>
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="{ path: item.href}"
            :disabled="item.disabled"
            class="primary--text"
            exact
          >
            {{ item.titulo.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <v-card>
            <v-card-text class="pb-0">
              <v-text-field
                :append-icon="mdiMagnify"
                v-model="busqueda"
                label="Buscar..."
                v-on:keyup.enter="productosPorBusqueda(busqueda)"
                @click:append="productosPorBusqueda(busqueda)"
                outlined
                class="m-0"
              ></v-text-field>
            </v-card-text>
            <v-card-text class="pb-0 pt-0">
              <v-select
                :items="listaPorPaginas"
                item-text="text"
                item-value="value"
                label="Ítems por Página"
                class="mt-2"
                dense
                filled
                v-model="porPagina"
                @change="cambiarPorPagina(porPagina)"
              ></v-select>
            </v-card-text>
            <v-card-text class="pb-0">
              <v-text-field
                label="Inventario"
                placeholder="Inventario mayor a:"
                filled
                v-model="inputInventario"
                type="number"
                @keyup.enter="buscarInventario(inputInventario)"
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card class="mt-3">
            <v-list dense>
              <v-subheader>Etiqueta</v-subheader>
              <v-list-item-group>
                <v-list-item @click="buscarEtiqueta(1)">
                  <v-list-item-title>Productos Nuevos</v-list-item-title>
                </v-list-item>
                <v-list-item @click="buscarEtiqueta(4)">
                  <v-list-item-title>Productos Netos</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card class="mt-3">
            <v-list v-if="this.categorias.length > 0" dense>
              <v-subheader>Categorías</v-subheader>
              <v-list-group
                v-for="categoria in this.categorias[0]"
                :key="categoria.id_pagina"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="categoria.nombre"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="subCategoria in categoria.subcategorias"
                  :key="subCategoria.id_pagina"
                  @click="buscarSubCategoria(subCategoria.jerarquia)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="subCategoria.nombre"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <h2 v-if="this.infoProductos.length > 0" class="text-subtitle-1">Resultados: {{this.infoProductos[0].count}}</h2>
          <v-row v-if="this.productos.length > 0">
            <h2 v-if="Number(this.infoProductos[0].count) === 0" class="text-center error mt-2 ml-2 sinResultados">Sin resultados</h2>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(producto) in productos[0]"
              :key="producto.id"
            >
              <Productos :producto='producto' :colores='producto.materiales' />
            </v-col>
          </v-row>
          <v-row v-if="this.productos.length > 0" justify="center">
            <v-col cols="12">
              <v-container class="max-width">
                <v-pagination
                  v-model="pagina"
                  class="my-4"
                  :length="totalPaginas"
                  @input="cambiarPagina(pagina)"
                >
                </v-pagination>
              </v-container>
            </v-col>
          </v-row>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Productos from '@/components/Productos/Productos.vue';
import axios from 'axios';
import Hero from '@/components/Global/Hero.vue';
import { mdiMagnify } from '@mdi/js';

export default {
  name: 'productosmega',
  data() {
    return {
      listaCategorias: true,
      productos: [],
      categorias: [],
      colores: [],
      mdiMagnify,
      inputInventario: Number(this.$route.query.inventario) || 0,
      pagina: Number(this.$route.query.pagina) || 1,
      categoria: Number(this.$route.query.categoria) || '',
      subCategoria: Number(this.$route.query.subCategoria) || '',
      etiqueta: Number(this.$route.query.etiqueta) || '',
      inventario: Number(this.$route.query.inventario) || '',
      busqueda: this.$route.query.busqueda || '',
      infoProductos: [],
      totalPaginas: 0,
      porPagina: Number(this.$route.query.porPagina) || 12,
      listaPorPaginas: [
        { text: '12', value: 12 },
        { text: '24', value: 24 },
        { text: '48', value: 48 },
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
          href: '/productos/',
        },
      ],
    };
  },
  components: {
    Productos,
    Hero,
  },
  methods: {
    async getProductos(pagina, porPagina, categoria, subCategoria, etiqueta, inventario, busqueda) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=${porPagina}&page=${pagina}&categoria=${categoria}&subcategoria=${subCategoria}&order=paginacion_web&etiqueta=${etiqueta}&inventario=${inventario}&search=${busqueda}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.productos.push(res.data.results);
        this.infoProductos.push(res.data);
        this.totalPaginas = Math.ceil((this.infoProductos[0].count / this.porPagina));
        // eslint-disable-next-line prefer-destructuring
        this.colores = this.productos[0];
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
        },
      });
      this.getProductos(
        pagina,
        this.porPagina,
        this.categoria,
        this.subCategoria,
        this.etiqueta,
        this.inventario,
        this.busqueda,
      );
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
        },
      });
      this.getProductos(
        this.pagina,
        porPagina,
        this.categoria,
        this.subCategoria,
        this.etiqueta,
        this.inventario,
        this.busqueda,
      );
    },
    buscarSubCategoria(subCategoria) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: 1,
          porPagina: 12,
          subCategoria,
        },
      });
      this.getProductos(
        this.pagina,
        this.porPagina,
        this.categoria,
        subCategoria,
        this.etiqueta,
        this.inventario,
        this.busqueda,
      );
    },
    buscarInventario(inventario) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: 1,
          porPagina: 12,
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          busqueda: this.$route.query.busqueda,
          inventario,
        },
      });
      this.getProductos(
        this.pagina,
        this.porPagina,
        this.categoria,
        this.subCategoria,
        this.etiqueta,
        inventario,
        this.busqueda,
      );
    },
    productosPorBusqueda(busqueda) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: 1,
          porPagina: 12,
          busqueda,
        },
      });
      this.getProductos(
        this.pagina,
        this.porPagina,
        this.categoria,
        this.subCategoria,
        this.etiqueta,
        this.inventario,
        busqueda,
      );
    },
    buscarEtiqueta(etiqueta) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: 1,
          porPagina: 12,
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta,
        },
      });
      this.getProductos(
        this.pagina,
        this.porPagina,
        this.categoria,
        this.subCategoria,
        this.etiqueta,
        this.inventario,
        this.busqueda,
        etiqueta,
      );
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
      this.etiqueta,
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
  created() {
    this.$store.commit('setLayout', 'defaultLayout');
  },
};
</script>

<style>
  .sinResultados {
    width: 100%;
  }
</style>
