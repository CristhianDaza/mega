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
            <v-card-title>Agregar Video</v-card-title>
            <v-card-text>
              <v-file-input
                @change="buscarVideo($event)"
                label="Seleccionar Video">
              </v-file-input>
              <v-text-field
                required label="Nombre"
                v-model="nombre"
                :prepend-icon="mdiBookOpenPageVariant">
              </v-text-field>
              <v-text-field
                required label="Url Producto"
                v-model="urlProducto"
                :prepend-icon="mdiLinkVariant">
              </v-text-field>
              <v-select
                :items="completo"
                item-text="name"
                item-value="value"
                label="Vídeo Completo"
                :prepend-icon="mdiImageSizeSelectLarge"
                v-model="videoCompleto"
                required
                return-object
              ></v-select>
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
                  Agregar Video
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
          <div class="elevation-12">
            <v-responsive
              :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
              class="pa-0" :aspect-ratio="16/9">
              <video loop controls tabindex="0" width="100%">
                <source :src="prev" type="video/mp4" />
              </video>
            </v-responsive>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiBookOpenPageVariant, mdiLinkVariant, mdiImageSizeSelectLarge } from '@mdi/js';
import Swal from 'sweetalert2';
import layoutAdmin from '@/mixins/layoutAdmin';
import { storage, db } from '@/firebase';

export default {
  name: 'agregar-video',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiBookOpenPageVariant,
      mdiLinkVariant,
      mdiImageSizeSelectLarge,
      error: null,
      file: null,
      nombre: '',
      urlProducto: '',
      prev: '',
      videoCompleto: false,
      loading: false,
      uploading: 0,
      completo: [
        { name: 'Si', value: true },
        { name: 'No', value: false },
      ],
    };
  },
  metaInfo: {
    title: 'Agregar Video',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    buscarVideo(event) {
      if (event) {
        this.file = event;
        this.error = null;
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
        const refVideo = storage.ref().child('video').child(this.nombre);
        // eslint-disable-next-line no-unused-vars
        const res = await refVideo.put(this.file);
        const urlDescarga = await refVideo.getDownloadURL();

        await db.collection('video')
          .add({
            nombre: this.nombre,
            linkVideo: urlDescarga,
            urlProducto: this.urlProducto,
            completo: this.videoCompleto,
          })
          .then(() => {
            Swal.fire(
              '¡Creado!',
              'El video ha sido creado.',
              'success',
            );
            this.$router.push({
              path: '/admin/videoPromocion',
            });
          });
        this.error = 'Video subido con éxito';
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
