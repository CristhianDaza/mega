<template>
  <div class="pa-2">
    <h1 :style="{ color: $vuetify.theme.themes[theme].azul }" class="text-center">
      Productos Sugeridos
    </h1>
    <v-divider class="mx-10"></v-divider>
    <v-row class="mt-3" v-if="suggestion.length > 0">
      <v-col cols="12" md="6" v-for="product in suggestion" :key="product.familia">
        <v-card
          :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
          outlined
          class="mx-auto cardProducts"
        >
          <v-card-text class="pa-0">
            <router-link
              :to="{path: `/producto/${product.producto.familia}`}"
              class="pointer"
            >
              <v-img
                :src="product.imagen.imagen.file_md"
                max-width="100%"
                max-height="100%"
                :alt="product.descripcion_comercial"
                class="imageProduct"
              >
                <span v-if="product.descuento" class="percent">
                 {{ product.descuento }}%
                </span>
              </v-img>
            </router-link>
          </v-card-text>
            <v-card-title
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="text-subtitle-1 titleProd pb-2 font-weight-light"
            >
            {{ product.producto.descripcion_comercial }}
          </v-card-title>
          <v-card-subtitle
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            class="text-subtitle-2 font-weight-bold pb-1"
          >
            {{ product.producto.familia }}
          </v-card-subtitle>
          <div class="actionCard">
            <v-card-text>
              <div
                :style="{ color: $vuetify.theme.themes[theme].textoError }"
                v-if="product.inventario < 10"
              >
                  Agotado en {{product.color_nombre}}.
              </div>
              <div
                v-else
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >
                  <span class="font-weight-black"
                  :style="{ color: $vuetify.theme.themes[theme].azul }"
                >
                  Inventario:
                </span> {{addCommas(product.inventario)}} color {{product.color_nombre}}.
              </div>
              <div
                v-if="product.en_transito > 1"
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >
                  <span class="font-weight-black"
                  :style="{ color: $vuetify.theme.themes[theme].azul }"
                >En transito:</span> {{addCommas(product.en_transito)}} unidades.
              </div>
            </v-card-text>
            <v-divider class="mx-5"></v-divider>
            <div class="pa-2">
              <router-link :to="{ path: `/producto/${product.producto.familia}`}">
                <mp-button
                  is-full
                  @click="$router.push({path: `/producto/${product.producto.familia}`})"
                >
                  Ver Producto
                </mp-button>
              </router-link>
            </div>
          </div>
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
  props: ['suggestion'],
  mixins: [addCommas],
  data() {
    return {
    };
  },
  components: {
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    MpButton: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Button.vue'),
  },
};
</script>

<style scoped>
.cardProducts {
  transition: all .6s;
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  min-height: 390px;
}

.titleProd {
  word-break: normal;
  text-transform: capitalize;
}

.imageProduct {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.actionCard {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.imageProduct span {
  width: 110px;
  height: 20px;
  top: 11px;
  right: -36px;
  position: absolute;
  display: block;
  background: #005C91;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 22px;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}
</style>
