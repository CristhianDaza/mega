<template>
  <div>
    <v-parallax
      v-if="this.productosEtiqueta.length > 0"
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_offer.webp?alt=media&token=e57afeca-ebe2-430d-a6e7-664b3a372763"
        :height="this.$vuetify.breakpoint.xs ? '100' : '200'"
      >
      <h1
        :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
        class="mb-2 text-center font-weight-black"
      >
        {{this.productos[0].titulo}}
      </h1>
    </v-parallax>

    <v-container>
      <v-divider class="mx-5 mb-5"></v-divider>
      <v-row v-if="this.productosEtiqueta.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(producto) in productosEtiqueta"
          :key="producto.familia"
        >
          <Productos :producto='producto' :colores="producto.materiales"/>
        </v-col>
      </v-row>

      <v-hover v-slot:default="{ hover }" v-if="this.productosEtiqueta.length > 0">
        <v-card
          outlined
          class="d-inline-block"
          :to="'/productos?etiqueta=' + this.productos[0].etiqueta"
          :elevation="hover ? 5 : 2"
          :class="{ 'on-hover': hover }"
        >
          <v-row>
            <v-col class="pa-0" cols="3">
              <v-list-item>
                <v-list-item-content>
                  <v-avatar>
                    <v-icon>{{mdiSale}}</v-icon>
                  </v-avatar>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col class="pa-0" cols="7">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Ver más</v-list-item-title>
                  <v-list-item-subtitle>
                    Ver todos los {{this.productos[0].etiqueta}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col class="px-0" cols="2">
              <v-list-item >
                <v-list-item-content>
                  <v-icon>{{mdiArrowRight}}</v-icon>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-hover>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Productos from '@/components/Productos/Productos.vue';
import { mdiSale, mdiArrowRight } from '@mdi/js';
import axios from 'axios';

export default {
  data() {
    return {
      productosEtiqueta: [],
      mdiSale,
      mdiArrowRight,
      producto: [],
    };
  },
  methods: {
    ...mapActions(['traerProducto']),
    async getProductosNuevos() {
      const url = `https://marpicoprod.azurewebsites.net/api/productos/?page_size=12&page=1&order=paginacion_web&etiqueta=${this.productos[0].etiqueta}`;
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };
      await axios(config).then((res) => {
        // console.log(res.data.results[0].imagen.imagen.file_md);
        res.data.results.forEach((producto) => {
          this.productosEtiqueta.push(producto);
        });
      });
    },
    llenarProductos() {
      this.productos.forEach((producto) => {
        this.producto = producto;
      });
      this.getProductosNuevos();
      console.log(this.product);
    },
  },
  computed: {
    ...mapState(['productos']),
  },
  mounted() {
    this.llenarProductos();
    this.traerProducto();
  },
  components: {
    Productos,
  },
};
</script>
