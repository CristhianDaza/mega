<template>
  <div>
    <Hero :titulo="'Catálogos ' + new Date().getFullYear()"/>
    <v-container>
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
          <v-hover v-slot:default="{ hover }" close-delay="200" open-delay="100">
            <v-card class="mx-auto" :elevation="hover ? 18 : 2">
              <div class="div-catalogo hidden">
                <v-img :src="catalogo.linkImagen" :alt="catalogo.nombre" class="imagen-catalogo">
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
              </div>
              <v-card-actions>
                <v-btn outlined>
                  <a :href="catalogo.linkPDF" target="_blank">
                    <v-icon class="mr-1">{{mdiFilePdfBox}}</v-icon> PDF
                  </a>
                </v-btn>
                <v-btn outlined>
                  <a :href="catalogo.linkVirtual" target="_blank">
                    <v-icon class="mr-1">{{mdiOpenInNew}}</v-icon> Virtual
                  </a>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import { mapState, mapActions } from 'vuex';
import { mdiFilePdfBox, mdiOpenInNew } from '@mdi/js';

export default {
  name: 'Catalogo',
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
  -ms-transform: scale(1);
  -moz-transform: scale(1);
  -webkit-transform: scale(1);
  -o-transform: scale(1);
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
}
.div-catalogo:hover .imagen-catalogo {
  transform: scale(1.2);
  -ms-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -o-transform: scale(1.2);
}
</style>
