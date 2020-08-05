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
          <v-divider></v-divider>
          <v-list dense>
            <v-subheader>Categorías</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, index) in listaCategorias"
                :key="index"
                @click="buscarCategoria(item.value)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{item.nombre}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" sm="8" md="9">
          <v-row v-if="this.productos.length > 0">
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(producto) in productos[0]"
              :key="producto.id"
            >
              <Productos :producto='producto' />
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

export default {
  data() {
    return {
      productos: [],
      listaCategorias: [
        { nombre: 'Antiestrés', value: 30001 },
        { nombre: 'Bar', value: 30002 },
        { nombre: 'Bebidas', value: 30003 },
        { nombre: 'Bolsos', value: 30004 },
        { nombre: 'Escritura', value: 30005 },
        { nombre: 'Gorras y Viseras', value: 30006 },
        { nombre: 'Herramientas, Linternas y Llaveros', value: 30007 },
        { nombre: 'Hogar y Estilos de vida', value: 30008 },
        { nombre: 'Oficina', value: 30009 },
        { nombre: 'Paraguas e Impermeables', value: 30010 },
        { nombre: 'Salud y Belleza', value: 30011 },
        { nombre: 'Tecnología', value: 30012 },
        { nombre: 'USB', value: 30013 },
        { nombre: 'Viajes, Recreación y Deportes', value: 30014 },
      ],
      pagina: Number(this.$route.query.pagina) || 1,
      categoria: Number(this.$route.query.categoria) || '',
      subCategoria: Number(this.$route.query.subCategoria) || '',
      etiqueta: Number(this.$route.query.etiqueta) || '',
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
    async getProductos(pagina, porPagina, categoria, subCategoria, etiqueta) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=${porPagina}&page=${pagina}&categoria=${categoria}&subcategoria=${subCategoria}&order=paginacion_web&etiqueta=${etiqueta}`;
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
        },
      });
      this.getProductos(pagina, this.porPagina, this.categoria, this.subCategoria, this.etiqueta);
    },
    cambiarPorPagina(porPagina) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: this.$route.query.pagina,
          porPagina,
          categoria: this.$route.query.categoria,
          subCategoria: this.$route.query.subCategoria,
          etiqueta: this.$route.query.etiqueta,
        },
      });
      this.getProductos(this.pagina, porPagina, this.categoria, this.subCategoria, this.etiqueta);
    },
    buscarCategoria(categoria) {
      this.$router.push({
        path: this.$route.path,
        query: {
          pagina: 1,
          porPagina: 12,
          categoria,
        },
      });
      this.getProductos(this.pagina, this.porPagina, categoria, this.subCategoria, this.etiqueta);
    },
  },
  mounted() {
    this.getProductos(
      this.pagina,
      this.porPagina,
      this.categoria,
      this.subCategoria,
      this.etiqueta,
    );
  },
};
</script>
