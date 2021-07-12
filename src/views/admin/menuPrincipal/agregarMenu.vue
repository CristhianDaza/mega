<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" xl="6">
          <v-card
            :style="{background: $vuetify.theme.themes.dark.basebackground}"
            class="elevation-12">
            <v-progress-linear
              color="light-blue"
              height="10"
              value="100"
              striped
              :indeterminate="loading"
            ></v-progress-linear>
            <v-card-title>Agregar Menú</v-card-title>
            <v-card-text>
              <v-text-field
                label="Nombre"
                v-model="nombre"
                :prepend-icon="mdiFormatTitle">
              </v-text-field>
              <v-text-field
                label="Orden"
                v-model="orden"
                :prepend-icon="mdiNumeric">
              </v-text-field>
              <v-text-field
                label="Link"
                v-model="link"
                :prepend-icon="mdiLinkVariant">
              </v-text-field>
            </v-card-text>
            <v-card-text v-if="error != null">{{error}}</v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions>
              <v-btn
                outlined
                color="primary"
                @click.prevent="subirProducto"
                :loading="loading">
                  Agregar Menú
                </v-btn>
              <v-btn outlined @click="$router.back()" color="error">Atras</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiFormatTitle, mdiLinkVariant, mdiNumeric } from '@mdi/js';
import layoutAdmin from '@/mixins/layoutAdmin';
import { db } from '@/firebase';
import Swal from 'sweetalert2';
import router from '@/router';

export default {
  name: 'agregar-menu',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiLinkVariant,
      mdiNumeric,
      error: null,
      nombre: '',
      link: '',
      orden: '',
      loading: false,
      uploading: 0,
    };
  },
  metaInfo: {
    title: 'Agregar Menú',
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
        await db.collection('menu')
          .add({
            nombre: this.nombre,
            orden: this.orden,
            link: this.link,
          })
          .then(() => {
            Swal.fire(
              '¡Creada!',
              'El menú ha sido creado.',
              'success',
            );
            router.push({
              path: '/admin/menu-principal',
            });
          });

        this.error = 'Menú creado con éxito';
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
