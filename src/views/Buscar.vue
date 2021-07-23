<template>
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
    </v-container>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import Productos from '@/components/Productos/Productos.vue';
import Loader from '@/components/Global/Loader.vue';
import axios from 'axios';
import layoutPrincipal from '@/mixins/layoutPrincipal';

export default {
  name: 'Buscar',
  mixins: [layoutPrincipal],
  data() {
    return {
      productos: [],
      infoProductos: [],
      busqueda: this.$route.query.busqueda || '',
      pagina: Number(this.$route.query.pagina) || 1,
      porPagina: Number(this.$route.query.porPagina) || 20,
      totalPaginas: 0,
    };
  },
  components: {
    Hero,
    Productos,
    Loader,
  },
  methods: {
    async getProductosBusqueda(
      pagina,
      porPagina,
      busqueda,
    ) {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=${porPagina}&page=${pagina}&search=${busqueda}`;
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
        },
      });
    },
  },
  mounted() {
    this.getProductosBusqueda(
      this.pagina,
      this.porPagina,
      this.busqueda,
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
