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
                v-model="titulo"
                :prepend-icon="mdiFormatTitle">
              </v-text-field>
              <v-text-field
                label="Etiqueta"
                v-model="etiqueta"
                :prepend-icon="mdiCartArrowRight">
              </v-text-field>
            </v-card-text>
            <v-card-text v-if="error != null">{{error}}</v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions>
              <v-btn
                outlined
                :style="{color: $vuetify.theme.themes[theme].azul}"
                @click.prevent="subirProducto"
                :loading="loading">
                  Agregar Producto
                </v-btn>
              <v-btn
                outlined
                @click="$router.back()"
                :style="{color: $vuetify.theme.themes[theme].amarillo}"
              >Atras</v-btn>
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
import { db } from '@/firebase';

export default {
  name: 'agregar-slider',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiCartArrowRight,
      error: null,
      titulo: '',
      etiqueta: '',
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
    async subirProducto() {
      try {
        this.loading = true;
        await db.collection('producto')
          .add({
            titulo: this.titulo,
            label: this.etiqueta,
          })
          .then(() => {
            Swal.fire(
              '¡Creada!',
              'El producto ha sido creado.',
              'success',
            );
            this.$router.push({
              path: '/admin/productos-inicio',
            });
          });

        this.error = 'Producto creado con éxito';
      } catch (error) {
        Swal.fire(
          'Error!',
          'Hubo un error, intente de nuevo.',
          'error',
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
