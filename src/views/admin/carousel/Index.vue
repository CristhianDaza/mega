<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      :style="{color: $vuetify.theme.themes[theme].amarillo}"
      large
      outlined
      to="/admin/carrusel/agregar-carousel">
        Agregar Imagen
    </v-btn>
    <v-divider class="my-5"></v-divider>
    <v-row class="mx-0">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="imagen in imagenSlider" :key="imagen.uid">
        <v-card
          :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
        >
          <v-card-subtitle
            :style="{color: $vuetify.theme.themes[theme].colorText}"
          >
            <h2>{{imagen.nombreProducto}}</h2>
          </v-card-subtitle>
          <v-card-text class="pb-0">
            <v-img :src="imagen.linkImagen" :alt="imagen.nombreProducto">
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
          <v-card-actions class="pt-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :style="{color: $vuetify.theme.themes[theme].textoError}"
                  v-bind="attrs"
                  v-on="on"
                  class="mt-3"
                  @click="confirmarEliminarImagen(imagen.id, imagen.nombreProducto)"
                >
                  <v-icon>{{ mdiDelete }}</v-icon>
                </v-btn>
              </template>
              <span>Eliminar Imagen</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import layoutAdmin from '@/mixins/layoutAdmin';
import { mdiDelete } from '@mdi/js';
import Swal from 'sweetalert2';
import { storage } from '@/firebase';

export default {
  name: 'Carousel',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiDelete,
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
    ...mapActions(['traerImagenSlider', 'eliminarImagenSlider']),
    confirmarEliminarImagen(id, nombre) {
      Swal.fire({
        title: '¿Estas segur@?',
        text: '¡No se podrá revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si. ¡Eliminarlo!',
      }).then((result) => {
        if (result.value) {
          const archivoEliminar = storage.ref().child('slider').child(nombre);
          this.eliminarImagenSlider(id);
          archivoEliminar.delete().then(() => {}).catch(() => {
            Swal.fire(
              'Error!',
              'Hubo un error, intente de nuevo.',
              'error',
            );
          });
          Swal.fire(
            '¡Eliminada!',
            'La imagen del carrusel ha sido eliminada.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['imagenSlider']),
  },
  mounted() {
    this.traerImagenSlider();
  },
};
</script>
