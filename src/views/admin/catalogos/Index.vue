<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      :style="{color: $vuetify.theme.themes[theme].amarillo}"
      large
      outlined
      to="/admin/catalogos/agregar-catalogo"
    >
      Agregar Catálogo
    </v-btn>
    <v-divider class="my-5"></v-divider>

      <v-row class="mx-0">
      <v-col cols="12" md="6" lg="3" v-for="catalogo in catalogos" :key="catalogo.id">
        <v-card
          :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
          class="mx-auto">
          <v-card-text class="pb-0">
            <v-img :src="catalogo.linkImagen" :alt="catalogo.nombre">
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
            <a
              :href="catalogo.linkVirtual"
              target="_blank"
            >
              <v-btn
                :style="{color: $vuetify.theme.themes[theme].amarillo}"
                width="100%" text>
                {{catalogo.nombre}} <v-icon class="ml-1" small>
                  {{mdiOpenInNew}}
                </v-icon>
              </v-btn>
            </a>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                  class="ml-2"
                  @click="confirmarEliminarCatalogo(catalogo.id, catalogo.nombre)"
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
  name: 'lita-catalogos',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFilePdfBox,
      mdiOpenInNew,
      mdiDelete,
    };
  },
  metaInfo: {
    title: 'Catálogos',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerCatalogo', 'eliminarCatalogo']),
    confirmarEliminarCatalogo(id, nombre) {
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
          const archivoEliminar = storage.ref().child('catalogo').child(nombre);
          this.eliminarCatalogo(id);
          archivoEliminar.delete().then(() => {}).catch(() => {
            Swal.fire(
              'Error!',
              'Hubo un error, intente de nuevo.',
              'error',
            );
          });
          Swal.fire(
            '¡Eliminado!',
            'El catálogo ha sido eliminado.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['catalogos']),
  },
  mounted() {
    this.traerCatalogo();
  },
};
</script>
