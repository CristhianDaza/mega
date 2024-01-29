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
            <v-card-title>Editar Menú</v-card-title>
            <v-form
              @submit.prevent="editMenu(menu)"
            >
            <v-card-text>
                <v-text-field
                  label="Nombre"
                  v-model="menu.name"
                  color="white darken-2"
                  :prepend-icon="mdiFormatTitle">
                </v-text-field>
                <v-text-field
                  label="Orden"
                  v-model="menu.order"
                  color="white darken-2"
                  :prepend-icon="mdiNumeric">
                </v-text-field>
                <v-text-field
                  label="Link"
                  v-model="menu.link"
                  color="white darken-2"
                  :prepend-icon="mdiLinkVariant">
                </v-text-field>
                <v-checkbox
                  v-model="menu.isExternal"
                  label="Link externo"
                  class="ml-4"
                  color="#1976d2"
                ></v-checkbox>
              </v-card-text>
              <v-divider class="mx-5"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  :style="{color: $vuetify.theme.themes[theme].textoBlanco,
                  background: $vuetify.theme.themes['dark'].azul}"
                  :loading="loading"
                >
                    Editar Menú
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
import { mdiFormatTitle, mdiLinkVariant, mdiNumeric } from '@mdi/js';
import Swal from 'sweetalert2';
import { mapActions, mapState } from 'vuex';
import layoutAdmin from '@/mixins/layoutAdmin';

export default {
  name: 'editMenu',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiLinkVariant,
      mdiNumeric,
      loading: false,
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
    ...mapActions('menu', ['getMenu', 'editMainMenu']),
    async editMenu(menu) {
      try {
        this.loading = true;
        await this.editMainMenu(menu);
        await Swal.fire(
          '¡Modificado!',
          'El menu ha sido modificado.',
          'success',
        );
        await this.$router.push({
          path: '/admin/menu-principal',
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
  mounted() {
    this.getMenu(this.id);
  },
  computed: {
    ...mapState('menu', ['menu']),
  },
};
</script>
