<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero :titulo="titulo"/>
    <v-container>
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="{ path: item.href}"
            :disabled="item.disabled"
            :style="{color: 'white'}"
            exact
          >
            {{ item.titulo.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <v-card
            class="fondoCard">
            <v-card-text class="pb-0">
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
          <v-card
            v-if="this.listaEtiquetas.length > 0"
            class="mt-3">
            <v-list class="fondoCard" dense>
              <v-subheader :style="{color: '#005C91'}">Etiquetas</v-subheader>
              <v-list-item-group>
                <v-list-item v-for="etiqueta in this.listaEtiquetas" :key="etiqueta.id">
                  <v-list-item-title
                    :style="{color: 'white'}"
                    @click="buscarEtiqueta(etiqueta.id)">
                    {{ etiqueta.nombre }} {{ etiqueta.count === 1 ? `(${etiqueta.count} producto)` : `(${etiqueta.count} productos)` }}
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card
            class="mt-3">
            <v-list v-if="this.categorias.length > 0" dense class="fondoCard">
              <v-subheader :style="{color: '#005C91'}">Categorías</v-subheader>
              <v-list-group
                v-for="categoria in this.categorias[0]"
                :key="categoria.id_pagina"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title
                      :style="{color: '#005C91'}"
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
                    <v-list-item-title :style="{color: 'white'}" v-text="subCategoria.nombre"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <h2 v-if="this.infoProductos.length > 0" class="text-subtitle-1 mb-2" :style="{color: 'white'}">Resultados: {{this.infoProductos[0].count}}</h2>
          <v-row v-if="this.productos.length > 0" justify="center">
            <v-col v-if="Number(this.infoProductos[0].count) > 16" cols="12">
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
            <h2 v-if="Number(this.infoProductos[0].count) === 0" class="text-center error mt-2 ml-2 sinResultados">Sin resultados</h2>
            <v-col
              cols="6"
              sm="4"
              md="3"
              v-for="(producto) in productos[0]"
              :key="producto.id"
              class="pa-1"
            >
              <Productos :producto='producto' :colores='producto.materiales' />
            </v-col>
          </v-row>
          <v-row v-if="this.productos.length > 0" justify="center">
            <v-col v-if="Number(this.infoProductos[0].count) > 16" cols="12">
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
import axios from 'axios';
import Hero from '@/components/Global/Hero.vue';
import Loader from '@/components/Global/Loader.vue';

export default {
  name: 'productosmega',
  data() {
    return {
      listaCategorias: true,
      productos: [],
      categorias: [],
      colores: [],
      inputInventario: Number(this.$route.query.inventario) || 0,
      pagina: Number(this.$route.query.pagina) || 1,
      categoria: Number(this.$route.query.categoria) || '',
      subCategoria: Number(this.$route.query.subCategoria) || '',
      etiqueta: Number(this.$route.query.etiqueta) || '',
      inventario: Number(this.$route.query.inventario) || '',
      busqueda: this.$route.query.busqueda || '',
      titulo: this.$route.query.titulo || 'Productos',
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
    ) {
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
        this.listaEtiquetas = res.data.filtros.etiquetas;
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
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          inventario: this.$route.query.inventario,
          busqueda: this.$route.query.busqueda,
          titulo: this.$route.query.titulo,
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
    buscarInventario(inventario) {
      this.$router.push({
        path: this.$route.path,
        query: {
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
          inventario,
          busqueda: this.$route.query.busqueda,
          titulo: this.$route.query.titulo,
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
  .theme--light.v-pagination .v-pagination__item,
  .theme--light.v-pagination .v-pagination__navigation {
    background: white !important;
  }

  .theme--light.v-pagination .v-pagination__item--active {
    background:#005C91 !important;
  }
  .theme--light.v-sheet {
    background: inherit;
  }
  </style>
