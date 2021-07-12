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
            <v-card-title>Editar Menú</v-card-title>
            <v-form
              @submit.prevent="editarProducto(menu)"
            >
            <v-card-text>
                <v-text-field
                  label="Nombre"
                  v-model="menu.nombre"
                  :prepend-icon="mdiFormatTitle">
                </v-text-field>
                <v-text-field
                  label="Orden"
                  v-model="menu.orden"
                  :prepend-icon="mdiNumeric">
                </v-text-field>
                <v-text-field
                  label="Link"
                  v-model="menu.link"
                  :prepend-icon="mdiLinkVariant">
                </v-text-field>
              </v-card-text>
              <v-card-text v-if="error != null">{{error}}</v-card-text>
              <v-divider class="mx-5"></v-divider>
              <v-card-actions>
                <v-btn
                  outlined
                  color="primary"
                  type="submit"
                  :loading="loading">
                    Editar Menú
                  </v-btn>
                <v-btn outlined @click="$router.back()" color="error">Atras</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiFormatTitle, mdiLinkVariant, mdiNumeric } from '@mdi/js';
import layoutAdmin from '@/mixins/layoutAdmin';
import { db } from '@/firebase';
import Swal from 'sweetalert2';
import router from '@/router';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'editar-producto',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiLinkVariant,
      mdiNumeric,
      error: null,
      nombre: '',
      link: '',
      orden: '',
      loading: false,
      uploading: 0,
      id: this.$route.params.id,
    };
  },
  metaInfo: {
    title: 'Editar Menú',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerMenu']),
    async editarProducto(menu) {
      this.loading = true;
      const { nombre, orden, link } = menu;
      await db.collection('menu').doc(this.id).update({
        nombre,
        orden,
        link,
      })
        .then(() => {
          Swal.fire(
            '¡Modificado!',
            'El menu ha sido modificado.',
            'success',
          );
          router.push({
            path: '/admin/menu-principal',
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
  mounted() {
    this.traerMenu(this.id);
  },
  computed: {
    ...mapState(['menu']),
  },
};
</script>
