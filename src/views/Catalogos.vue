<template>
  <div>
    <Hero titulo="Catálogos"/>
    <v-container v-if="this.catalogos.length > 0">
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="{ path: item.href}"
            :disabled="item.disabled"
            class="primary--text"
            exact
          >
            {{ item.titulo.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="catalogo in catalogos" :key="catalogo.id">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                outlined
                class="mx-auto transition-swing"
                :class="`elevation-${hover ? 24 : 0}`"
              >
                <div class="div-catalogo hidden">
                  <v-img :src="catalogo.linkImagen" :alt="catalogo.nombre" class="imagen-catalogo">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <Loader />
                      </v-row>
                    </template>
                  </v-img>
                </div>
                <v-card-actions>
                  <a
                    class="linksCatalogos"
                    :href="catalogo.linkVirtual"
                    target="_blank"
                  >
                    <v-btn color="primary" width="100%" text>
                      Ver Catálogo  {{catalogo.nombre}} <v-icon class="ml-1" small>
                        {{mdiOpenInNew}}
                      </v-icon>
                    </v-btn>
                  </a>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="mx-auto">
      <v-container class="fill-height mt-16 mx-auto">
        <v-row align="center" justify="center">
          <Loader />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import Loader from '@/components/Global/Loader.vue';
import { mapState, mapActions } from 'vuex';
import { mdiFilePdfBox, mdiOpenInNew } from '@mdi/js';

export default {
  name: 'Catalogos',
  data() {
    return {
      mdiFilePdfBox,
      mdiOpenInNew,
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'catálogo',
          disabled: true,
          href: '/catalogo/',
        },
      ],
    };
  },
  head() {
    return {
      title: 'Catálogos 📖',
    };
  },
  components: {
    Hero,
    Loader,
  },
  computed: {
    ...mapState(['catalogos']),
  },
  methods: {
    ...mapActions(['traerCatalogo']),
  },
  mounted() {
    this.traerCatalogo();
  },
  metaInfo: {
    title: 'Catálogos 📖',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Descarga o mira nuestros catálogos virtuales. Catálogo Escritura, Catálogo de Bolsos, Catálogo de Antiestrés, Catálogo de USB, Catálogo de Bebidas, Catálogo de Hogar, Catálogo de Tecnología, Catálogo de Oficina, Catálogo de Herramientas, Catálogo de Gorras, Catálogo Viejes, Recreación y Deportes, Catálogo de Paraguas, Catálogo de Salud.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Catálogos Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/catalogos/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Descarga o mira nuestros catálogos virtuales. Catálogo Escritura, Catálogo de Bolsos, Catálogo de Antiestrés, Catálogo de USB, Catálogo de Bebidas, Catálogo de Hogar, Catálogo de Tecnología, Catálogo de Oficina, Catálogo de Herramientas, Catálogo de Gorras, Catálogo Viejes, Recreación y Deportes, Catálogo de Paraguas, Catálogo de Salud.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
  created() {
    this.$store.commit('setLayout', 'defaultLayout');
  },
};
</script>

<style scoped>
.div-catalogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.div-catalogo.hidden {
  overflow: hidden;
}
.div-catalogo .imagen-catalogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transform: scale(1);
  transition: all 1s ease;
}
.div-catalogo:hover .imagen-catalogo {
  transform: scale(1.2);
  -ms-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -o-transform: scale(1.2);
}
.linksCatalogos {
  width: 100%;
}
</style>
