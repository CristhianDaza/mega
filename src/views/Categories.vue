<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero title="Categorías"/>
    <v-container class="pt-0">
      <mp-breadcrumbs
        :breadcrumbs="breadcrumbs"
      />
      <div v-if="categories">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            lg="4"
            v-for="categoria in categories"
            :key="categoria.id_pagina"
          >
            <v-card
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              class="tarjetaCategoria"
              shaped
              elevation="3"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-card-title class="tituloCategoria headline" :style="{color: '#005C91'}" >
                  <div
                    class="pointer"
                    @click="$router.push({ path: `/productos?categoria=${categoria.jerarquia}&titulo=${categoria.nombre}` })">
                    {{categoria.nombre}}
                  </div>
                </v-card-title>
                <v-avatar
                  class="ma-3"
                  size="100"
                  tile
                >
                  <v-img
                    class="imageCategories"
                    :aspect-ratio="16/9"
                    :src="categoria.imagen.file_md"
                    :alt="categoria.nombre">
                  </v-img>
                </v-avatar>
              </div>
              <v-divider class="mx-5"></v-divider>
              <v-card-subtitle class="tituloCategoria">
                <ul>
                  <li
                    v-for="subCategoria in categoria.subcategorias"
                    :key="subCategoria.id_pagina"
                    class="font-weight-medium"
                    :style="{ color: $vuetify.theme.themes[theme].colorText }"
                  >
                    <div
                      class="pointer d-inline"
                      @click="$router.push({ path: `/productos?subCategoria=${subCategoria.jerarquia}&titulo=${subCategoria.nombre}` })"
                    >
                      {{subCategoria.nombre}}
                    </div>
                  </li>
                </ul>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else class="mx-auto">
        <v-container class="fill-height mt-16 mx-auto">
          <v-row align="center" justify="center">
            <Loader />
          </v-row>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
import layoutPrincipal from '@/mixins/layoutPrincipal';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CategoriesView',
  mixins: [layoutPrincipal],
  components: {
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
  },
  methods: {
    ...mapActions('categories', ['getCategories']),
  },
  mounted() {
    if (!this.categories) this.getCategories();
  },
  computed: {
    ...mapState('categories', ['categories']),
    breadcrumbs() {
      return [
        { title: 'Inicio', disabled: false, toLink: '/' },
        { title: 'Productos', disabled: false, toLink: '/productos' },
        { title: 'Categorías', disabled: true, toLink: '/search' },
      ];
    },
  },
  metaInfo: {
    title: 'Categorías 🏷',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Categorías Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/categorias/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Productos promocionales, boligrafos viajes recreacion y deportes, usb, tecnologia, bolsos, paja de trigo, bar, salud y belleza, oficina, hogar y estilos de vida, antiestrés, gorras, escritura y más.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
};
</script>

<style>
.tarjetaCategoria {
  min-height: 360px;
  justify-content: space-around;
}

.tituloCategoria div {
  color: inherit;
  transition: all .5s;
}
.tituloCategoria div:hover {
  color:  #005C91;
}
.tituloCategoria {
  word-break: keep-all;
}

.imageCategories {
  float: left;
}
</style>
