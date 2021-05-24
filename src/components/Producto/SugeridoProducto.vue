<template>
<!-- eslint-disable max-len -->
  <div>
    <h1 class="primary--text text-center mt-2">
      Productos Sugeridos
    </h1>
    <v-divider class="mx-10"></v-divider>
    <h3 v-if="sugerencia.length === 0" class="text-center">
      No se encontraron productos
    </h3>
    <v-row class="mt-3" v-if="sugerencia.length > 0">
      <v-col cols="6" v-for="producto in sugerencia" :key="producto.familia">
        <v-card
          :style="{background: $vuetify.theme.themes[theme].basebackground}"
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
            class="text-center text-subtitle-2"
            :style="{color: $vuetify.theme.themes[theme].basetexto}"
          >
            {{ producto.producto.descripcion_comercial }}
          </v-card-title>
          <v-card-subtitle
            :style="{color: $vuetify.theme.themes[theme].basetexto}"
          >
            {{ producto.producto.familia }}
          </v-card-subtitle>
          <v-card-text class="text-center">
            <div
              class="red--text"
              v-if="producto.inventario < 10"
            >
                Agotado en {{producto.color_nombre}}.
            </div>
            <div
              v-else
              :style="{color: $vuetify.theme.themes[theme].basetexto}">
                <span class="font-weight-black"
                :style="{color: $vuetify.theme.themes[theme].colorPrimary}">Inventario:</span> {{addCommas(producto.inventario)}} color {{producto.color_nombre}}.
            </div>
            <div
              v-if="producto.en_transito > 1"
              :style="{color: $vuetify.theme.themes[theme].basetexto}"
            >
                <span class="font-weight-black"
                :style="{color: $vuetify.theme.themes[theme].colorPrimary}">En transito:</span> {{addCommas(producto.en_transito)}} unidades.
            </div>
          </v-card-text>
          <v-divider class="mx-5"></v-divider>
          <v-card-actions>
          <v-btn
            :to="{path: `/producto/${producto.producto.familia}`}"
            outlined block
            color="primary"
            text
            append
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

export default {
  props: ['sugerencia'],
  data() {
    return {
    };
  },
  methods: {
    addCommas(nStr) {
      // eslint-disable-next-line no-param-reassign
      nStr += '';
      const x = nStr.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? `.${x[1]}` : '';
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1.$2');
      }
      return x1 + x2;
    },
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  components: {
    Loader,
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
</style>
