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
            <v-form @submit.prevent="editProduct(selectedProductHome)">
              <v-card-text>
                <v-text-field
                  label="Titulo"
                  v-model="selectedProductHome.title"
                  color="white darken-2"
                  :prepend-icon="mdiFormatTitle"
                ></v-text-field>
                <v-text-field
                  label="Etiqueta"
                  v-model="selectedProductHome.label"
                  color="white darken-2"
                  :prepend-icon="mdiCartArrowRight"
                ></v-text-field>
              </v-card-text>
              <v-card-text v-if="error != null">{{error}}</v-card-text>
              <v-divider class="mx-5"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :style="{color: $vuetify.theme.themes[theme].textoBlanco,
                  background: $vuetify.theme.themes['dark'].azul}"
                  type="submit"
                  :loading="loading">
                    Editar Producto
                  </v-btn>
                <v-btn
                  :style="{color: $vuetify.theme.themes[theme].textoNegro,
                    background: $vuetify.theme.themes['dark'].amarillo}"
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
import { mapActions, mapGetters } from 'vuex';
import layoutAdmin from '@/mixins/layoutAdmin';

export default {
  name: 'editar-producto',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiCartArrowRight,
      error: null,
      title: '',
      label: '',
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
    ...mapActions('homeProduct', ['getProductHomeId', 'editProductHome']),
    async editProduct(product) {
      try {
        this.loading = true;
        await this.editProductHome(product);
        await Swal.fire(
          '¡Modificado!',
          'El prodcuto ha sido modificado.',
          'success',
        );
        await this.$router.push({
          path: '/admin/productos-inicio',
        });
      } catch (error) {
        await Swal.fire(
          '¡Error!',
          'Hubo un error, por favor intente de nuevo.',
          'error',
        );
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters('homeProduct', ['selectedProductHome']),
  },
  mounted() {
    this.getProductHomeId(this.id);
  },
};
</script>
