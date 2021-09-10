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
            <v-card-title>Editar Producto</v-card-title>
            <v-form @submit.prevent="editarProducto(producto)">
              <v-card-text>
                <v-text-field
                  label="Titulo"
                  v-model="producto.titulo"
                  :prepend-icon="mdiFormatTitle">
                </v-text-field>
                <v-text-field
                  label="Etiqueta"
                  v-model="producto.etiqueta"
                  :prepend-icon="mdiCartArrowRight">
                </v-text-field>
              </v-card-text>
              <v-card-text v-if="error != null">{{error}}</v-card-text>
              <v-divider class="mx-5"></v-divider>
              <v-card-actions>
                <v-btn
                  outlined
                  :style="{color: $vuetify.theme.themes[theme].azul}"
                  type="submit"
                  :loading="loading">
                    Editar Producto
                  </v-btn>
                <v-btn
                  outlined
                  :style="{color: $vuetify.theme.themes[theme].amarillo}"
                  @click="$router.back()"
                >Atras</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiFormatTitle, mdiCartArrowRight } from '@mdi/js';
import Swal from 'sweetalert2';
import { mapActions, mapState } from 'vuex';
import layoutAdmin from '@/mixins/layoutAdmin';
import { db } from '@/firebase';
import router from '@/router';

export default {
  name: 'editar-producto',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiCartArrowRight,
      error: null,
      titulo: '',
      etiqueta: '',
      loading: false,
      uploading: 0,
      id: this.$route.params.id,
    };
  },
  metaInfo: {
    title: 'Editar Producto',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerProductoId']),
    async editarProducto(producto) {
      this.loading = true;
      const { titulo, etiqueta } = producto;
      await db.collection('producto').doc(this.id).update({
        titulo,
        etiqueta,
      })
        .then(() => {
          Swal.fire(
            '¡Modificado!',
            'El prodcuto ha sido modificado.',
            'success',
          );
          router.push({
            path: '/admin/productos-inicio',
          });
        })
        .catch(() => {
          Swal.fire(
            '¡Error!',
            'Hubo un error, por favor intente de nuevo.',
            'error',
          );
        });
      this.loading = false;
    },
  },
  computed: {
    ...mapState(['producto']),
  },
  mounted() {
    this.traerProductoId(this.id);
  },
};
</script>
