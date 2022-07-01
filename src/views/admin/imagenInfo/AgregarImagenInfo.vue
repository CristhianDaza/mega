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
            <v-card-title>Agregar Imagen</v-card-title>
            <v-card-text>
              <v-file-input
                accept="image/*"
                @change="buscarImagen($event)"
                label="Seleccionar Imagen">
              </v-file-input>
              <v-text-field
                required label="Nombre"
                v-model="nombre"
                :prepend-icon="mdiBookOpenPageVariant">
              </v-text-field>
              <v-text-field
                required label="Url"
                v-model="url"
                :prepend-icon="mdiCartArrowRight">
              </v-text-field>
            </v-card-text>
            <v-card-text v-if="error != null">{{error}}</v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions>
              <v-btn
                outlined
                :style="{color: $vuetify.theme.themes[theme].azul}"
                @click.prevent="subirCatalogo"
                :disabled="file === null"
                :loading="loading">
                  Agregar Imagen
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

    <v-container class="fill-height" fluid v-if="prev != ''">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" xl="6">
          <v-card
            :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
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
import { mdiBookOpenPageVariant, mdiCartArrowRight } from '@mdi/js';
import Swal from 'sweetalert2';
import layoutAdmin from '@/mixins/layoutAdmin';
import { storage, db } from '@/firebase';

export default {
  name: 'AgregarComponent',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiBookOpenPageVariant,
      mdiCartArrowRight,
      error: null,
      file: null,
      nombre: '',
      prev: '',
      url: '',
      loading: false,
      uploading: 0,
    };
  },
  metaInfo: {
    title: 'Agregar Imagen Informativa',
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
    async subirCatalogo() {
      try {
        this.loading = true;
        const refImagen = storage.ref().child('info').child(this.nombre);
        // eslint-disable-next-line no-unused-vars
        const res = await refImagen.put(this.file);
        const urlDescarga = await refImagen.getDownloadURL();

        await db.collection('info')
          .add({
            nombre: this.nombre,
            linkImagen: urlDescarga,
            url: this.url,
          })
          .then(() => {
            Swal.fire(
              '¡Creada!',
              'La imagen de información ha sido creada.',
              'success',
            );
            this.$router.push({
              path: '/admin/imagen-info',
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
