<template>
  <div>
    <img
      class="fotoTarjeta border-black elevation-5"
      @click.stop="dialog = true"
      :src="mainImage"
      :alt="product.descripcion_comercial"
    />
      <p
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        class="mt-5 font-weight-bold text-body-2"
      >
        El color de los artículos pueden variar según la calibración y resolución de la pantalla.
      </p>
    <v-card-actions v-if="imageProduct">
      <v-row>
        <template>
          <div
            v-for="label in product.etiquetas"
            :key="label.id"
          >
            <img
              width="100px"
              :src="label.imagen"
              :alt="label.nombre"
            >
          </div>
        </template>
      </v-row>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      max-width="700"
      :overlay-color="this.$vuetify.theme.dark ? 'blue-grey darken-4' : 'grey darken-4'"
      overlay-opacity="0.9"
    >
      <v-btn dark icon class="float-right mr-5" color="white" @click.stop="dialog = false">
        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
      </v-btn>
      <v-img
        :src="mainImage"
        max-width="100%"
        width="100%"
        cover
        :alt="product.descripcion_comercial"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiCloseCircleOutline } from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  name: 'ImagenProducto',
  data() {
    return {
      textoInfo: '',
      dialog: false,
      mdiCloseCircleOutline,
    };
  },
  props: ['product', 'mainImage'],
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
  },
  computed: {
    imageProduct() {
      return this.product !== {};
    },
  },
};
</script>

<style>

  .fotoTarjeta {
    width: 100%;
    max-width: 100%;
    cursor: zoom-in;
  }

  .imagenCaracteristica {
   width: 80px;
   cursor: pointer;
   margin-top: 15px;
  }

  .border-black {
    border: 2px solid rgb(197, 197, 197);
    border-radius: 10px;
  }
</style>
