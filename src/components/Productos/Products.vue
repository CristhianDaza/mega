<template>
<!-- eslint-disable max-len -->
  <v-card
    class="tarjetaProductos"
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
  >
    <v-card-text class="pa-0">
      <router-link
        :to="{ path: `/producto/${producto.familia}` }"
        class="pointer"
      >
        <v-img
          :src="producto.imagen.imagen.file_md"
          width="100%"
          max-width="100%"
          max-height="100%"
          :alt="producto.descripcion_comercial"
          class="imagenProducto"
        >
        </v-img>
      </router-link>
    </v-card-text>
    <v-card-title
      class="text-h6 titleProd font-weight-light"
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
    >
      {{ producto.descripcion_comercial }} a
    </v-card-title>
    <v-card-subtitle
      class="text-subtitle-1 font-weight-bold"
      :style="{ color: $vuetify.theme.themes[theme].invertSecondary }"
    >
      {{ producto.familia }}
    </v-card-subtitle>
    <v-card-subtitle class="d-flex flex-wrap pt-0">
      <div v-for="color in colores" :key="color.codigo">
        <mp-color-inventory
          :color="color"
          v-if="color.inventario > 10 "
        />
      </div>
    </v-card-subtitle>
<!--    <div class="d-flex justify-center text-center my-2">-->
<!--      <template v-if="producto.etiquetas.length > 0">-->
<!--        <div-->
<!--          v-for="etiqueta in producto.etiquetas"-->
<!--          :key="etiqueta.id"-->
<!--        >-->
<!--          <img-->
<!--            width="80px"-->
<!--            :src="etiqueta.imagen.file_sm"-->
<!--            :alt="etiqueta.nombre"-->
<!--            >-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
    <v-card-title
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
      v-if="isLogin" class="precio">
      <template v-if="producto.etiquetas.length > 0">
        <template v-if="producto.etiquetas[0].id == 4 || producto.etiquetas[0].id == 10 || producto.etiquetas[0].id == 20">
          $ {{addCommas(Math.round(producto.materiales[0].precio * 1.35))}} + iva
        </template>

        <template v-else>
          <template v-if="producto.materiales[0].precio > producto.materiales[0].precio_descuento">
            <span
            :style="{ color: $vuetify.theme.themes[theme].textoError }"
            class="text-decoration-line-through mr-3 subtitle-1"
            >
              $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
            </span>
            $ {{addCommas(Math.round(producto.materiales[0].precio_descuento))}} + iva
          </template>
          <template v-else>
            $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
          </template>
        </template>
      </template>

      <template v-else>
        <template v-if="producto.materiales[0].precio > producto.materiales[0].precio_descuento">
          <span
          :style="{ color: $vuetify.theme.themes[theme].textoError }"
          class="text-decoration-line-through mr-3 subtitle-1"
          >
            $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
          </span>
          $ {{addCommas(Math.round(producto.materiales[0].precio_descuento))}} + iva
        </template>
        <template v-else>
          $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
        </template>
      </template>
    </v-card-title>
    <v-card-subtitle class="py-1">
      <div v-html="totalInventory(producto.materiales)"></div>
    </v-card-subtitle>
    <v-divider class="mx-5"></v-divider>
    <v-card-actions class="d-block">
      <router-link :to="{ path: `/producto/${producto.familia}` }">
        <mp-button
          is-full
          @click="$router.push({path: `/producto/${producto.familia}`})"
        >
          Ver Producto
        </mp-button>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import addCommas from '@/mixins/addCommas';
import hextToRgb from '@/helpers/hextToRgb';

export default {
  name: 'ProductosComponent',
  components: {
    MpColorInventory: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Color-Inventory.vue'),
    MpButton: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Button.vue'),
  },
  props: {
    producto: {
      type: Object,
      require: true,
    },
    colores: {
      type: Array,
      require: true,
    },
  },
  mixins: [addCommas],
  data() {
    return {
      hextToRgb,
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  methods: {
    totalInventory(products) {
      let total = 0;
      let inTransit = 0;
      products.forEach((product) => {
        total += product.inventario;
        inTransit += product.en_transito;
      });
      if (total <= 10) {
        if (inTransit > 0) return `<span class="font-weight-bold blue--text text--accent-2">En transito</span> ${this.addCommas(inTransit)} unidades`;
        return '<strong class="red--text text--lighten-1">Agotado</strong>';
      }
      return `<span class="font-weight-bold text--primary">Existencias:</span> ${this.addCommas(total)} unidades`;
    },
  },
};
</script>

<style>
.tarjetaProductos {
  transition: all .6s;
  border-top-left-radius: 25px !important;
  border-top-right-radius: 25px !important;
}
.tarjetaProductos:hover {
  //transform: translateY(-10px);
}
.titleProd {
  word-break: normal;
  text-transform: capitalize;
}
.imagenProducto {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}
</style>
