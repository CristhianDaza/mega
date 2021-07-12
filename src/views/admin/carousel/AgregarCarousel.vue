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
            <v-card-title>Agregar Imagen</v-card-title>
            <v-card-subtitle>Imagen Carrusel</v-card-subtitle>
            <v-card-text>
              <v-file-input
                accept="image/*"
                @change="buscarImagen($event)"
                label="Seleccionar Imagen">
              </v-file-input>
              <v-text-field
                label="Nombre"
                v-model="nombreProducto"
                :prepend-icon="mdiLinkVariant">
              </v-text-field>
              <v-text-field
                label="URL Producto"
                v-model="urlProducto"
                :prepend-icon="mdiCartArrowRight">
              </v-text-field>
              <span class="caption">/producto/</span>
            </v-card-text>
            <v-card-text v-if="error != null">{{error}}</v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions>
              <v-btn
                outlined
                color="primary"
                @click.prevent="subirImagen"
                :disabled="file === null"
                :loading="loading">
                  Agregar Imagen
                </v-btn>
              <v-btn outlined @click="$router.back()" color="error">Atras</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="fill-height" fluid v-if="prev != ''">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" xl="6">
          <v-card
            :style="{background: $vuetify.theme.themes.dark.basebackground}"
            class="elevation-12">
            <v-card-text>
              <v-img :src="prev"></v-img>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiLinkVariant, mdiCartArrowRight } from '@mdi/js';
import layoutAdmin from '@/mixins/layoutAdmin';
import { storage, db } from '@/firebase';
import Swal from 'sweetalert2';
import router from '@/router';

export default {
  name: 'agregar-slider',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiLinkVariant,
      mdiCartArrowRight,
      error: null,
      file: null,
      urlProducto: '',
      nombreProducto: '',
      prev: '',
      loading: false,
      uploading: 0,
    };
  },
  metaInfo: {
    title: 'Imagen Carrusel',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    buscarImagen(event) {
      if (event) {
        if (event.type === 'image/jpeg' || event.type === 'image/png') {
          this.file = event;
          this.error = null;
        } else {
          this.error = 'Archivo no valido';
          this.file = null;
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          this.prev = e.target.result;
        };
      } else {
        this.file = null;
        this.prev = '';
      }
    },
    async subirImagen() {
      try {
        this.loading = true;

        const refImagen = storage.ref().child('slider').child(this.nombreProducto.toUpperCase());

        // eslint-disable-next-line no-unused-vars
        const res = await refImagen.put(this.file);

        const urlDescarga = await refImagen.getDownloadURL();

        await db.collection('imagenSlider')
          .add({
            linkImagen: urlDescarga,
            urlProducto: this.urlProducto,
            nombreProducto: this.nombreProducto.toUpperCase(),
          })
          .then(() => {
            Swal.fire(
              '¡Creada!',
              'La imagen del carrusel ha sido creada.',
              'success',
            );
            router.push({
              path: '/admin/carrusel',
            });
          });

        this.error = 'Imagen subida con éxito';
        this.file = null;
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
