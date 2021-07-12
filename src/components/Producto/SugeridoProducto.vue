<template>
<!-- eslint-disable max-len -->
  <div class="fondoCard pa-2">
    <h1 :style="{color: '#005C91'}" class="text-center">
      Productos Sugeridos
    </h1>
    <v-divider class="mx-10"></v-divider>
    <h3 v-if="sugerencia.length === 0" class="text-center white--text">
      No se encontraron productos
    </h3>
    <v-row class="mt-3" v-if="sugerencia.length > 0">
      <v-col cols="12" md="6" v-for="producto in sugerencia" :key="producto.familia">
        <v-card
          outlined
          class="mx-auto tarjetaProducto">
          <v-card-text class="pa-0">
            <router-link
              append
              :to="{path: `/producto/${producto.producto.familia}`}"
            >
              <v-img
                :src="producto.imagen.imagen.file_md"
                width="100%"
                :alt="producto.descripcion_comercial"
                class="imagenProducto"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <Loader />
                  </v-row>
                </template>
              </v-img>
            </router-link>
          </v-card-text>
              <v-card-title
            class="text-center text-subtitle-2 white--text"
          >
            {{ producto.producto.descripcion_comercial }}
          </v-card-title>
          <v-card-subtitle
            class="white--text"
          >
            {{ producto.producto.familia }}
          </v-card-subtitle>
          <v-card-text class="text-center">
            <div
              class="error--text"
              v-if="producto.inventario < 10"
            >
                Agotado en {{producto.color_nombre}}.
            </div>
            <div
              v-else
              class="white--text">
                <span class="font-weight-black"
                :style="{color: '#005C91'}">Inventario:</span> {{addCommas(producto.inventario)}} color {{producto.color_nombre}}.
            </div>
            <div
              v-if="producto.en_transito > 1"
              class="white--text"
            >
                <span class="font-weight-black"
                :style="{color: '#005C91'}">En transito:</span> {{addCommas(producto.en_transito)}} unidades.
            </div>
          </v-card-text>
          <v-divider class="mx-5"></v-divider>
          <v-card-actions>
          <v-btn
            :to="{path: `/producto/${producto.producto.familia}`}"
            outlined
            block
            class="white--text"
          >
              Ver Producto
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-else class="mx-auto">
      <v-container class="fill-height mt-16 mx-auto">
        <v-row align="center" justify="center">
          <Loader />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Global/Loader.vue';
import addCommas from '@/mixins/addCommas';

export default {
  props: ['sugerencia'],
  mixins: [addCommas],
  data() {
    return {
    };
  },
  components: {
    Loader,
  },
};
</script>

<style>
  .tarjetaProducto {
    transition: all .4s;
    background: rgba( 255, 255, 255, 0.25 ) !important;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px !important;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
  .tarjetaProducto:hover {
    transform: translateY(-15px);
  }
  .imagenProducto {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>
