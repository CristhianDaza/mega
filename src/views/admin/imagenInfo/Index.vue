<template>
  <v-card class="mx-10">
    <v-card-actions>
      <v-btn
        color="success"
        large outlined
        class="ma-5"
        to="/admin/imagen-info/agregar-imagen-info">
          Agregar Imagen Informativa
        </v-btn>
    </v-card-actions>
    <v-divider class="mx-5"></v-divider>

    <v-container>
        <v-row>
        <v-col cols="12" md="6" lg="4" v-for="imagen in imagenInfo" :key="imagen.id">
          <v-card class="mx-auto">
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
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="red"
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
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mdiFilePdfBox, mdiOpenInNew, mdiDelete } from '@mdi/js';
import Swal from 'sweetalert2';
import { storage } from '@/firebase';

export default {
  name: 'imagen-informativa',
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
          archivoEliminar.delete().then(() => {}).catch((err) => console.log(err));
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
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
