<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      color="success"
      large outlined
      class="mb-5"
      to="/admin/videos/agregar-video">
        Agregar Video
      </v-btn>
      <v-divider></v-divider>

      <v-row class="mx-0">
      <v-col cols="12" md="6" lg="4" v-for="video in videos" :key="video.id">
        <v-card class="mx-auto">
          <v-card-text class="pb-0">
            <v-responsive :aspect-ratio="16/9">
              <video loop controls tabindex="0" width="100%">
                <source :src="video.linkVideo" type="video/mp4" />
              </video>
            </v-responsive>
          </v-card-text>
          <v-divider class="mt-3"></v-divider>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                  class="ml-2"
                  @click="confirmarEliminarVideo(video.id, video.nombre)"
                >
                  <v-icon>{{mdiDelete}}</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mdiDelete } from '@mdi/js';
import Swal from 'sweetalert2';
import { storage } from '@/firebase';

export default {
  name: 'video-admin',
  data() {
    return {
      mdiDelete,
    };
  },
  metaInfo: {
    title: 'Video',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerVideos', 'eliminarVideo']),
    confirmarEliminarVideo(id, nombre) {
      Swal.fire({
        title: '¿Estas segur@?',
        text: '¡No se podrá revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si. ¡Eliminar!',
      }).then((result) => {
        if (result.value) {
          const archivoEliminar = storage.ref().child('video').child(nombre);
          this.eliminarVideo(id);
          archivoEliminar.delete().then(() => {}).catch(() => {
            Swal.fire(
              'Error!',
              'Hubo un error, intente de nuevo.',
              'error',
            );
          });
          Swal.fire(
            '¡Eliminado!',
            'El video ha sido eliminado.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['videos']),
  },
  mounted() {
    this.traerVideos();
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
