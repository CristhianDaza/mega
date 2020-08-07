<template>
  <v-card class="mx-10">
    <v-card-actions>
      <v-btn
        color="success"
        large outlined
        class="ma-5"
        to="/admin/carousel/agregar-carousel">
          Agregar Imagen al Carrusel
        </v-btn>
    </v-card-actions>
    <v-divider class="mx-5"></v-divider>

    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="imagen in imagenSlider" :key="imagen.uid">
          <h2>{{imagen.nombreProducto.toUpperCase()}}</h2>
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
          <v-btn
            color="error"
            class="mt-3"
            outlined
            @click="confirmarEliminarImagen(imagen.id, imagen.nombreProducto)"
          >
            Eliminar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import { storage } from '@/firebase';

export default {
  name: 'Carousel',
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
          archivoEliminar.delete().then(() => {}).catch((err) => console.log(err));
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
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
