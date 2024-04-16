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
            <v-card-title>Agregar Menú</v-card-title>
            <v-checkbox
              v-if="!isPageProducts"
              v-model="isExternal"
              label="Link externo"
              class="ml-4"
              color="#1976d2"
            ></v-checkbox>
            <v-card-text>
              <template v-if="isExternal">
                <v-text-field
                  label="Nombre"
                  v-model="menuName"
                  color="white darken-2"
                  :prepend-icon="mdiFormatTitle"
                ></v-text-field>
                <v-text-field
                  label="Link"
                  v-model="menuLink"
                  color="white darken-2"
                  :prepend-icon="mdiLinkVariant">
                </v-text-field>
              </template>
              <template v-else>
                <v-checkbox
                  v-model="isPageProducts"
                  label="Es página de productos"
                  class="mt-0"
                  color="#1976d2"
                ></v-checkbox>
                <v-text-field
                  label="Nombre"
                  v-model="menuName"
                  color="white darken-2"
                  :prepend-icon="mdiFormatTitle"
                ></v-text-field>
                <template v-if="isPageProducts">
                  <v-text-field
                    label="Título de página"
                    v-model="menuTitle"
                    color="white darken-2"
                    :prepend-icon="mdiFormatTitle"
                  ></v-text-field>
                  <v-text-field
                    label="Etiqueta"
                    v-model="menuLabel"
                    color="white darken-2"
                    :prepend-icon="mdiLabelOutline"
                    type="number"
                  ></v-text-field>
                  <v-text-field
                    label="Categoria"
                    v-model="menuCategory"
                    color="white darken-2"
                    :prepend-icon="mdiViewList"
                    type="number"
                  ></v-text-field>
                  <v-text-field
                    label="Sub categoria"
                    v-model="menuSubCategory"
                    color="white darken-2"
                    :prepend-icon="mdiViewModule"
                    type="number"
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-text-field
                    label="Link"
                    v-model="menuLink"
                    color="white darken-2"
                    :prepend-icon="mdiLinkVariant">
                  </v-text-field>
                </template>
              </template>
              <v-text-field
                label="Orden"
                v-model="menuOrder"
                color="white darken-2"
                :prepend-icon="mdiNumeric"
                type="number"
              ></v-text-field>
              <div
                class="text-caption"
                v-show="isValidMenu"
              >
                {{ isExternal ? link : `${basePage}${link}` }}
              </div>
            </v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <a
                :href="isValidMenu ? navigate : '#'"
                :target="isValidMenu ? '_blank' : '_parent'"
              >
                <v-btn
                  text
                  class="mr-2"
                  :disabled="!isValidMenu"
                >
                  Comprobar Link
                </v-btn>
              </a>
              <v-btn
                :style="{color: $vuetify.theme.themes[theme].textoBlanco,
                  background: $vuetify.theme.themes['dark'].azul}"
                @click="createMenu($event)"
                :loading="loading"
                :disabled="!isValidMenu"
              >
                Agregar
              </v-btn>
              <v-btn
                :style="{color: $vuetify.theme.themes[theme].textoNegro,
                background: $vuetify.theme.themes['dark'].amarillo}"
                @click="$router.back()"
                :disabled="loading"
              >
                Atras
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  mdiFormatTitle,
  mdiLinkVariant,
  mdiNumeric,
  mdiLabelOutline,
  mdiViewList,
  mdiViewModule,
} from '@mdi/js';
import Swal from 'sweetalert2';
import layoutAdmin from '@/mixins/layoutAdmin';
// import { db } from '@/firebase';
import { mapActions } from 'vuex';

export default {
  name: 'agregar-menu',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiFormatTitle,
      mdiLinkVariant,
      mdiNumeric,
      mdiLabelOutline,
      mdiViewList,
      mdiViewModule,
      error: null,
      isExternal: false,
      loading: false,
      uploading: 0,
      menuName: null,
      menuTitle: null,
      menuLink: null,
      menuLabel: null,
      menuCategory: null,
      menuSubCategory: null,
      isPageProducts: false,
      menuOrder: 0,
      basePage: 'https://megapromocionales.com.co',
    };
  },
  watch: {
    isExternal() {
      this.cleanPage();
    },
    isPageProducts() {
      this.cleanPage();
    },
  },
  metaInfo: {
    title: 'Agregar Menú',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions('menu', ['createMainMenu']),
    async createMenu() {
      try {
        this.loading = true;
        const menuCreate = {
          name: this.menuName,
          link: this.isExternal ? this.menuLink : this.link,
          isExternal: this.isExternal,
          order: this.menuOrder,
        };
        await this.createMainMenu(menuCreate);
        await Swal.fire(
          '¡Creado!',
          'El menú ha sido creado.',
          'success',
        );
        await this.$router.push({
          path: '/admin/menu-principal',
        });
        this.cleanPage();
      } catch (error) {
        await Swal.fire(
          '¡Error!',
          'Hubo un error, intente de nuevo.',
          'error',
        );
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    cleanPage() {
      this.error = null;
      this.uploading = 0;
      this.menuName = null;
      this.menuTitle = null;
      this.menuLink = null;
      this.menuLabel = null;
      this.menuCategory = null;
      this.menuSubCategory = null;
    },
  },
  computed: {
    link() {
      let baseLink = this.isPageProducts ? '/productos?' : `/${this.menuLink ? `${this.menuLink}` : ''}` || '';

      if (this.menuTitle) {
        baseLink += `&title=${this.menuTitle}`;
      }
      if (this.menuLabel) {
        baseLink += `&label=${this.menuLabel}`;
      }
      if (this.menuCategory) {
        baseLink += `&category=${this.menuCategory}`;
      }
      if (this.menuSubCategory) {
        baseLink += `&subCategory=${this.menuSubCategory}`;
      }

      return baseLink;
    },
    navigate() {
      if (this.isExternal) {
        return this.menuLink;
      }
      return this.link;
    },
    isValidMenu() {
      if (this.menuName) {
        if (this.isPageProducts
          && this.menuTitle
          && (this.menuLabel || this.menuCategory || this.menuSubCategory)
        ) {
          return true;
        }
        if (this.isExternal && this.menuLink) {
          return true;
        }
        if (!this.isPageProducts && this.menuLink) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
