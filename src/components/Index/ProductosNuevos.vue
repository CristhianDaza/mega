<template>
  <div>
    <v-parallax
      v-if="this.productos.length > 0"
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/background.webp?alt=media&token=721b2b8a-d1a9-4fc2-b008-e8dfd795562d"
        :height="this.$vuetify.breakpoint.xs ? '100' : '200'"
      >
      <h1
        :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
        class="mb-2 text-center font-weight-black"
        :style="{color: $vuetify.theme.themes.dark.basetexto}"
      >
        {{this.titulos[0].titulo}}
      </h1>
    </v-parallax>

    <v-container>
      <v-divider class="mx-5 mb-5"></v-divider>
      <v-row v-if="this.productos.length > 0">
        <v-col
          cols="6"
          sm="4"
          md="3"
          v-for="(producto) in this.productos"
          :key="producto.familia"
        >
          <Productos :producto='producto' :colores="producto.materiales"/>
        </v-col>
      </v-row>
      <v-btn
        class="mt-6"
        v-if="this.productos.length > 0"
        :to="{
          path: `/productos?etiqueta=${this.titulos[0].etiqueta}&titulo=${this.titulos[0].titulo}`
        }"
        :style="{background: $vuetify.theme.themes[theme].colorPrimary}"
        elevation="8"
      >
          Ver Todos los Productos
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Productos from '@/components/Productos/Productos.vue';
import { mdiSale, mdiArrowRight } from '@mdi/js';

export default {
  data() {
    return {
      mdiSale,
      mdiArrowRight,
    };
  },
  methods: {
    ...mapActions(['traerProducto']),
  },
  computed: {
    ...mapState(['productos', 'titulos']),
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  mounted() {
    this.traerProducto();
  },
  components: {
    Productos,
  },
};
</script>
