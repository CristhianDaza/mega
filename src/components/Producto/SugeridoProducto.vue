<template>
<!-- eslint-disable max-len -->
  <div class="pa-2">
    <h1 :style="{ color: $vuetify.theme.themes[theme].amarillo }" class="text-center">
      Productos Sugeridos
    </h1>
    <v-divider class="mx-10"></v-divider>
    <v-row class="mt-3" v-if="sugerencia.length > 0">
      <v-col cols="12" md="6" v-for="producto in sugerencia" :key="producto.familia">
        <v-card
          :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
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
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="text-center text-subtitle-2"
            >
            {{ producto.producto.descripcion_comercial }}
          </v-card-title>
          <v-card-subtitle
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
          >
            {{ producto.producto.familia }}
          </v-card-subtitle>
          <v-card-text class="text-center">
            <div
              :style="{ color: $vuetify.theme.themes[theme].textoError }"
              v-if="producto.inventario < 10"
            >
                Agotado en {{producto.color_nombre}}.
            </div>
            <div
              v-else
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
            >
                <span class="font-weight-black"
                :style="{ color: $vuetify.theme.themes[theme].azul }"
              >Inventario:</span> {{addCommas(producto.inventario)}} color {{producto.color_nombre}}.
            </div>
            <div
              v-if="producto.en_transito > 1"
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
            >
                <span class="font-weight-black"
                :style="{ color: $vuetify.theme.themes[theme].azul }"
              >En transito:</span> {{addCommas(producto.en_transito)}} unidades.
            </div>
          </v-card-text>
          <v-divider class="mx-5"></v-divider>
          <v-card-actions>
          <v-btn
            :to="{path: `/producto/${producto.producto.familia}`}"
            outlined
            block
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
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
import addCommas from '@/mixins/addCommas';

export default {
  name: 'SugeridoProducto',
  props: ['sugerencia'],
  mixins: [addCommas],
  data() {
    return {
    };
  },
  components: {
    Loader: () => import(/* webpackChunkName: "Loader" */ '@/components/Global/Loader.vue'),
  },
};
</script>

<style>
  .tarjetaProducto {
    transition: all .4s;
  }
  .tarjetaProducto:hover {
    transform: translateY(-15px);
  }
  .imagenProducto {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>
