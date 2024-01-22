<template>
  <v-card
    class="cardProducts"
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
    :class="{'cardProductsLogin': isLogin}"
  >
    <v-card-text class="pa-0">
      <router-link
        :to="{ path: `/producto/${product.familia}` }"
        class="pointer"
      >
        <v-img
          :src="product.imagen.imagen.file_md"
          width="100%"
          max-width="100%"
          max-height="100%"
          :alt="product.descripcion_comercial"
          class="imageProduct"
          :class="{'filterImage': drained }"
        >
        </v-img>
      </router-link>
    </v-card-text>
    <v-card-title
      class="text-subtitle-1 titleProd pb-2 font-weight-light"
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
    >
      {{ product.descripcion_comercial }}
    </v-card-title>
    <v-card-subtitle
      class="text-subtitle-2 font-weight-bold pb-1"
      :style="{ color: $vuetify.theme.themes[theme].invertSecondary }"
    >
      {{ product.familia }}
    </v-card-subtitle>
    <v-card-subtitle class="d-flex flex-wrap pt-0 pb-2">
      <div v-for="color in colors" :key="color.codigo">
        <mp-color-inventory
          :color="color"
          v-if="color.inventario > 10"
        />
      </div>
    </v-card-subtitle>
    <v-card-title
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
      v-if="isLogin"
      class="precio pt-0"
    >
      <template v-if="product.etiquetas.length > 0">
        <template
          v-if="product.etiquetas[0].id === 4 ||
          product.etiquetas[0].id === 10 ||
          product.etiquetas[0].id === 20 ||
          product.etiquetas[0].id === 36"
        >
          $ {{addCommas(Math.round(product.materiales[0].precio * 1.35))}} + iva
        </template>

        <template v-else>
          <template v-if="product.materiales[0].precio > product.materiales[0].precio_descuento">
            <span
            :style="{ color: $vuetify.theme.themes[theme].textoError }"
            class="text-decoration-line-through mr-3 subtitle-1"
            >
              $ {{addCommas(Math.round(product.materiales[0].precio))}} + iva
            </span>
            $ {{addCommas(Math.round(product.materiales[0].precio_descuento))}} + iva
          </template>
          <template v-else>
            $ {{addCommas(Math.round(product.materiales[0].precio))}} + iva
          </template>
        </template>
      </template>

      <template v-else>
        <template v-if="product.materiales[0].precio > product.materiales[0].precio_descuento">
          <span
          :style="{ color: $vuetify.theme.themes[theme].textoError }"
          class="text-decoration-line-through mr-3 subtitle-1"
          >
            $ {{addCommas(Math.round(product.materiales[0].precio))}} + iva
          </span>
          $ {{addCommas(Math.round(product.materiales[0].precio_descuento))}} + iva
        </template>
        <template v-else>
          $ {{addCommas(Math.round(product.materiales[0].precio))}} + iva
        </template>
      </template>
    </v-card-title>
    <div class="actionCard">
      <div class="d-flex justify-center text-center my-2 pointer">
        <template v-if="product.etiquetas.length > 0">
          <div
            v-for="label in product.etiquetas"
            :key="label.id"
            @click="filterLabel(label)"
          >
            <img
              width="60px"
              :src="label.imagen.file_sm"
              :alt="label.nombre"
            >
          </div>
        </template>
      </div>
      <v-card-subtitle class="py-1">
        <div v-html="totalInventory(product.materiales)"></div>
      </v-card-subtitle>
      <v-divider class="mx-5"></v-divider>
      <v-card-actions class="d-block">
        <router-link :to="{ path: `/producto/${product.familia}` }">
          <mp-button
            is-full
            @click="$router.push({path: `/producto/${product.familia}`})"
          >
            Ver Producto
          </mp-button>
        </router-link>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import addCommas from '@/mixins/addCommas';
import hextToRgb from '@/helpers/hextToRgb';

export default {
  name: 'ProductsComponent',
  components: {
    MpColorInventory: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Color-Inventory.vue'),
    MpButton: () => import(/* webpackChunkName: "filterColor" */ '@/components/UI/Mp-Button.vue'),
  },
  props: {
    product: {
      type: Object,
      require: true,
    },
    colors: {
      type: Array,
      require: true,
    },
  },
  mixins: [addCommas],
  data() {
    return {
      hextToRgb,
      drained: false,
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    totalInventory(products) {
      let total = 0;
      let inTransit = 0;
      products.forEach((product) => {
        total += product.inventario;
        inTransit += product.en_transito;
      });
      if (total <= 10) {
        this.drained = true;
        if (inTransit > 0) return `<span class="font-weight-bold blue--text text--accent-2">En transito</span> ${this.addCommas(inTransit)} unidades`;
        return '<strong class="red--text text--lighten-1">Agotado</strong>';
      }
      return `<span class="font-weight-bold blue--text text--accent-1">Existencias:</span> ${this.addCommas(total)} unidades`;
    },
    filterLabel(label) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          etiqueta: label.id,
          title: label.nombre,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
  },
};
</script>

<style>
.cardProducts {
  transition: all .6s;
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  min-height: 490px;
}

.cardProductsLogin {
  min-height: 590px;
}

.titleProd {
  word-break: normal;
  text-transform: capitalize;
}

.imageProduct {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.filterImage {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.actionCard {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
