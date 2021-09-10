<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      :style="{color: $vuetify.theme.themes[theme].amarillo}"
      large outlined
      to="/admin/imagen-info/agregar-imagen-info">
        Agregar Imagen
      </v-btn>
      <v-divider class="my-5"></v-divider>

      <v-row class="mx-0">
      <v-col cols="12" md="6" lg="3" v-for="imagen in imagenInfo" :key="imagen.id">
        <v-card
          :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
          class="mx-auto">
          <v-card-text class="pb-0">
            <v-img :src="imagen.linkImagen" :alt="imagen.nombre">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card-text>
          <v-divider class="mt-3"></v-divider>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :style="{color: $vuetify.theme.themes[theme].textoError}"
                  v-bind="attrs"
                  v-on="on"
                  class="ml-2"
                  @click="confirmarEliminarImagenInfo(imagen.id, imagen.nombre)"
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
import { mdiFilePdfBox, mdiOpenInNew, mdiDelete } from '@mdi/js';
import Swal from 'sweetalert2';
import layoutAdmin from '@/mixins/layoutAdmin';
import { storage } from '@/firebase';

export default {
  name: 'imagen-informativa',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFilePdfBox,
      mdiOpenInNew,
      mdiDelete,
    };
  },
  metaInfo: {
    title: 'Imagen Informativa',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerImagenInfo', 'eliminarImagenInfo']),
    confirmarEliminarImagenInfo(id, nombre) {
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
          const archivoEliminar = storage.ref().child('info').child(nombre);
          this.eliminarImagenInfo(id);
          archivoEliminar.delete().then(() => {}).catch(() => {
            Swal.fire(
              'Error!',
              'Hubo un error, intente de nuevo.',
              'error',
            );
          });
          Swal.fire(
            '¡Eliminada!',
            'La imagen informativa ha sido eliminada.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['imagenInfo']),
  },
  mounted() {
    this.traerImagenInfo();
  },
};
</script>
