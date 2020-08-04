<template>
  <div>
    <v-parallax
      v-if="this.productoNuevo.length > 0"
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/offer.jpg?alt=media&token=f89a64ad-5af3-44f3-b382-8d126336ca13"
        :height="this.$vuetify.breakpoint.xs ? '100' : '200'"
      >
      <h1
        :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
        class="mb-2 text-center font-weight-black"
      >
        Productos <span class="primary--text">Nuevos</span>
      </h1>
    </v-parallax>

    <v-container>
      <v-divider class="mx-5 mb-5"></v-divider>
      <v-row v-if="this.productoNuevo.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(producto) in productoNuevo"
          :key="producto.familia"
        >
          <Productos :producto='producto' />
        </v-col>
      </v-row>

      <v-hover v-slot:default="{ hover }" v-if="this.productoNuevo.length > 0">
        <v-card
          outlined
          class="d-inline-block"
          to="/productos/categoria/descuento/"
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
                  <v-list-item-subtitle>Ver todos los productos Nuevos</v-list-item-subtitle>
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
import Productos from '@/components/Productos/Productos.vue';
import { mdiSale, mdiArrowRight } from '@mdi/js';
import axios from 'axios';

export default {
  data() {
    return {
      productoNuevo: [],
      mdiSale,
      mdiArrowRight,
    };
  },
  methods: {
    async getProductosNuevos() {
      const url = 'https://marpicoprod.azurewebsites.net/api/productos/?page_size=12&page=1&order=paginacion_web&etiqueta=1';
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
          this.productoNuevo.push(producto);
        });
      });
    },
  },
  mounted() {
    this.getProductosNuevos();
  },
  components: {
    Productos,
  },
};
</script>
