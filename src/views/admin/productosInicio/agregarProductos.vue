<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" xl="6">
          <v-card
            :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
            class="elevation-12">
            <v-progress-linear
              color="light-blue"
              height="10"
              value="100"
              striped
              :indeterminate="loading"
            ></v-progress-linear>
            <v-card-title>Agregar Productos</v-card-title>
            <v-card-text>
              <v-text-field
                label="Titulo"
                v-model="title"
                color="white darken-2"
                :prepend-icon="mdiFormatTitle">
              </v-text-field>
              <v-text-field
                label="N. Etiqueta"
                v-model="label"
                color="white darken-2"
                type="number"
                :prepend-icon="mdiCartArrowRight">
              </v-text-field>
            </v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :style="{color: $vuetify.theme.themes[theme].textoBlanco,
                  background: $vuetify.theme.themes['dark'].azul}"
                @click.prevent="createProduct"
                :loading="loading"
                :disabled="isValidProduct"
              >
                Agregar Producto
              </v-btn>
              <v-btn
                outlined
                @click="$router.back()"
                :style="{color: $vuetify.theme.themes[theme].textoNegro,
                background: $vuetify.theme.themes['dark'].amarillo}"
              >
                Atras
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiFormatTitle, mdiCartArrowRight } from '@mdi/js';
import Swal from 'sweetalert2';
import layoutAdmin from '@/mixins/layoutAdmin';
import { mapActions } from 'vuex';

export default {
  name: 'agregar-slider',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiCartArrowRight,
      title: null,
      label: null,
      loading: false,
      uploading: 0,
    };
  },
  metaInfo: {
    title: 'Agregar Producto',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions('homeProduct', ['createProductHome']),
    async createProduct() {
      try {
        this.loading = true;
        const productHomeCreate = {
          title: this.title,
          label: this.label,
        };
        await this.createProductHome(productHomeCreate);
        await Swal.fire(
          '¡Creado!',
          'El producto ha sido creado.',
          'success',
        );
        await this.$router.push({
          path: '/admin/productos-inicio',
        });
      } catch (error) {
        await Swal.fire(
          'Error!',
          'Hubo un error, intente de nuevo.',
          'error',
        );
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    isValidProduct() {
      if (this.title && this.label) {
        return false;
      }
      return true;
    },
  },
};
</script>
