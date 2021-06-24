<template>
  <div
    :style="{ backgroundImage: `url(${Novedades})` }"
    class="fondoNovedades py-10"
  >
    <h1
      :class="this.$vuetify.breakpoint.xs ? 'display-1 mt-2' : 'display-2'"
      class="mb-5 pt-5 text-center font-weight-black text-uppercase"
      :style="{color: '#005C91'}"
    >
      {{this.titulos[0].titulo}}
    </h1>
    <v-container>
      <v-row v-if="this.productos.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
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
          path:
            // eslint-disable-next-line max-len
            `/productos?etiqueta=${this.titulos[0].etiqueta}&titulo=${this.titulos[0].titulo}&pagina=2`
        }"
        outlined
        block
        large
        color="white"
        elevation="8"
      >
          Ver más Productos
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Productos from '@/components/Productos/Productos.vue';
import { mdiSale, mdiArrowRight } from '@mdi/js';
import Novedades from '@/assets/novedades.svg';

export default {
  data() {
    return {
      mdiSale,
      mdiArrowRight,
      Novedades,
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
<style>
.fondoNovedades {
  background-size: contain;
}
</style>
