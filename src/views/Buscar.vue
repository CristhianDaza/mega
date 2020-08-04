<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Buscar"/>
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
          <v-text-field
            :append-icon="mdiMagnify"
            v-model="busqueda"
            label="Buscar..."
            v-on:keyup.enter="productosPorBusqueda(busqueda)"
            @click:append="productosPorBusqueda(busqueda)"
            outlined
          ></v-text-field>
          <v-btn v-if="historial.length > 0" @click.prevent="limpiar" x-small color="secondary" dark class="ma-2">Limpiar Historial</v-btn>
          <v-list v-if="historial.length > 0" dense class="mb-2">
            <v-subheader>Historial</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, index) in historial" :key="index" @click="buscarHistorial(item)">
                <v-list-item-content>
                  <v-list-item-title>
                    {{item}}
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn icon @click.stop="eliminar(index)">
                  <v-icon dense>{{mdiCloseCircle}}</v-icon>
                </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-list dense :class="this.$vuetify.breakpoint.xs ? 'd-none' : ''">
            <v-subheader>Categorías</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, index) in listaCategorias" :key="index" @click="buscarCategoria(item.nombre)">
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
          <h2 class="text-center">{{mensaje}}</h2>
          <v-row v-if="loading">
            <v-col>
              <div class="text-center pt-10">
                <v-progress-circular
                  indeterminate
                  :size="50"
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="!loading">
            <v-col cols="12" sm="6" md="4" lg="4" v-for="producto in productosBusqueda" :key="producto.familia" >
              <v-card outlined class="mx-auto">
                <v-card-text class="pa-0">
                  <span v-if="(Math.round(producto.materiales[0].descuento)) > 0" class="sale-label">{{producto.materiales[0].descuento}}%</span>
                  <nuxt-link :to="{name: 'productos-codigo', params: { codigo: producto.familia }}">
                    <v-img :src="producto.imagenes[0].imagen.file_md" width="100%" :alt="producto.descripcion_comercial">
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
                  </nuxt-link>
                </v-card-text>
                <v-card-subtitle class="text-center py-1 font-weight-medium">{{ producto.familia }} - {{ producto.descripcion_comercial }}</v-card-subtitle>
                  <v-card-subtitle v-if="existeUsuario" class="precio">
                    <div class="text-center font-weight-medium">${{ Math.round(producto.materiales[0].precio) }} + iva</div>
                  </v-card-subtitle>
                <v-card-text class="text-center">
                  <img v-if="producto.materiales[0].estado == '2'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/nuevo.png?alt=media&token=7dbffaa3-1580-435a-9739-86c155c5194b" alt="Novedad" class="text-center" width="80">
                  <img v-if="producto.materiales[0].estado == '3'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/saldo.png?alt=media&token=b1d4cf45-0dcc-4285-87e9-c32f63c808d8" alt="Saldo" class="text-center" width="80">
                  <div v-if="producto.etiquetas.length > 0">
                    <img v-if="producto.etiquetas[0].id == 4" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/Neto.png?alt=media&token=f718bea7-0e92-480d-82e4-56a2d3a2dcbe" alt="Neto" class="text-center" width="80">
                  </div>
                </v-card-text>
                <v-divider class="mx-5"></v-divider>
                <v-card-actions>
                <v-btn :to="{name: 'productos-codigo', params: { codigo: producto.familia }}" outlined block color="primary" text>
                    Ver inventario
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            </v-row>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import { mdiMagnify, mdiCloseCircle } from '@mdi/js';
import { mapGetters } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'busqueda',
  data() {
    return {
      mdiMagnify,
      mdiCloseCircle,
      busqueda: this.$route.query.busqueda || '',
      historial: [],
      productosBusqueda: [],
      loading: false,
      imagenes: 'https://www.mppromocionales.com/images/grandes/',
      mensaje: 'Puedes buscar por referencia, codigo o palabras claves...',
      listaCategorias: [
        { nombre: 'Antiestrés' },
        { nombre: 'Bar' },
        { nombre: 'Bebidas' },
        { nombre: 'Bolsos' },
        { nombre: 'Escritura' },
        { nombre: 'Gorras y Viseras' },
        { nombre: 'Herramientas, Linternas y Llaveros' },
        { nombre: 'Hogar y Estilos de vida' },
        { nombre: 'Oficina' },
        { nombre: 'Paraguas e Impermeables' },
        { nombre: 'Salud y Belleza' },
        { nombre: 'Tecnología' },
        { nombre: 'USB' },
        { nombre: 'Viajes, Recreación y Deportes' },
      ],
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'buscar',
          disabled: true,
          href: '/buscar/',
        },
      ],
    };
  },
  components: {
    Hero,
  },
  computed: {
    ...mapGetters(['existeUsuario']),
  },
  methods: {
    productosPorBusqueda(valor) {
      this.productoCodigo = [];
      this.$router.push({
        path: this.$route.path,
        query: {
          busqueda: this.busqueda,
        },
      });

      if (this.busqueda !== '' && this.busqueda.length >= 3) {
        this.traerProductosBusqueda(valor);
      } else {
        Swal.fire(
          '¡Error!',
          'La búsqueda no debe ir vacía y debe contener más de 3 carácteres.',
          'error',
        );
      }

      if (this.busqueda !== '' && this.busqueda.length >= 3) {
        this.historial.unshift(this.busqueda);
      }
      if (process.browser) {
        localStorage.setItem('historial', JSON.stringify(this.historial));
      }
      this.busqueda = '';
      this.mensaje = '';
    },
    buscarCategoria(valor) {
      this.busqueda = valor;
      this.productosPorBusqueda(valor);
    },
    buscarHistorial(valor) {
      this.$router.push({
        path: this.$route.path,
        query: {
          busqueda: valor,
        },
      });
      this.traerProductosBusqueda(valor);
      this.busqueda = '';
      this.mensaje = '';
    },
    eliminar(index) {
      this.historial.splice(index, 1);
      localStorage.setItem('historial', JSON.stringify(this.historial));
    },
    limpiar() {
      this.historial = [];
      localStorage.removeItem('historial');
    },
    async traerProductosBusqueda(valor) {
      this.loading = true;
      const url = `https://marpicoprod.azurewebsites.net/api/productos/materialref?referencia=${valor}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        console.log(res);
        this.productosBusqueda.push(res.data);
      });
    },
  },
  created() {
    if (this.busqueda !== '' && this.busqueda.length >= 3) {
      this.traerProductosBusqueda(this.$route.query.busqueda);
      this.busqueda = '';
      this.mensaje = '';
    }
  },
  mounted() {
    const historial = localStorage.getItem('historial');
    if (historial) {
      this.historial = JSON.parse(historial);
    }
  },
};
</script>

<style>
  .sale-label {
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: #f13340;
    padding: 4px 0 4px;
    text-align: center;
    display: block;
    position: absolute;
    z-index: 1;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
