<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Categorías"/>
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
        <div v-if="this.categorias.length > 0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              lg="4"
              v-for="categoria in this.categorias[0]"
              :key="categoria.id_pagina"
            >
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-img
                    :aspect-ratio="16/9"
                    :src="categoria.imagen.file_md"
                    :alt="categoria.nombre">
                    <div
                      class="contenedorCategoria"
                      :class="$vuetify.theme.dark
                      ? 'contenedorCategoriaOscuro'
                      : 'contenedorCategoriaClaro'
                      "
                    >
                      <v-card-title class="font-weight-bold">
                        <router-link :to="'/productos?categoria=' + categoria.jerarquia">
                          {{categoria.nombre}}
                        </router-link>
                      </v-card-title>
                      <v-card-subtitle>
                        <ul>
                          <li
                            v-for="subCategoria in categoria.subcategorias"
                            :key="subCategoria.id_pagina"
                            class="font-weight-medium"
                          >
                            <router-link :to="'/productos?subCategoria=' + subCategoria.jerarquia">
                              {{subCategoria.nombre}}
                            </router-link>
                          </li>
                        </ul>
                      </v-card-subtitle>
                    </div>
                  </v-img>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else class="mx-auto">
          <v-container class="fill-height mt-16 mx-auto">
            <v-row align="center" justify="center">
              <v-progress-circular
                :size="100"
                :width="7"
                color="primary"
                indeterminate
              >
                Cargando
              </v-progress-circular>
            </v-row>
          </v-container>
        </div>
      </v-container>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import axios from 'axios';

export default {
  name: 'Productos',
  data() {
    return {
      categorias: [],
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'productos',
          disabled: false,
          href: '/productos/',
        },
        {
          titulo: 'categorias',
          disabled: true,
          href: '/categorias/',
        },
      ],
    };
  },
  components: {
    Hero,
  },
  methods: {
    async getCategorias() {
      const url = 'https://marpicoprod.azurewebsites.net/api/categorias/';
      const config = {
        method: 'get',
        url,
        headers: {
          Authorization: 'Bearer Api-Key fBc8kc9ejmpvIqSLeKh9bIL955E0LOdNfFKfNZhGy3xRlGTxtDl7ADOdSzrLfgLj',
        },
      };

      await axios(config).then((res) => {
        this.categorias.push(res.data);
      });
    },
  },
  mounted() {
    this.getCategorias();
  },
};
</script>

<style scoped>
  .contenedorCategoria {
    width: 100%;
    height: 100%;
    transition: background .4s;
  }
  .contenedorCategoriaOscuro {
    background: rgba(0, 0, 0, .7);
  }
  .contenedorCategoriaClaro {
    background: rgba(255, 255, 255, .7);
  }
  .contenedorCategoriaOscuro:hover {
    background: rgba(0, 0, 0, .9);
  }
  .contenedorCategoriaClaro:hover {
    background: rgba(255, 255, 255, .9);
  }
  a {
    color: inherit !important;
    transition: color .3s;
  }
  a:hover {
    color: #1976d2 !important;
  }
</style>
