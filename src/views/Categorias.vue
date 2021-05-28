<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Categorías"/>
    <v-container>
      <div class="links">
        <ul>
          <li>
            <router-link exact to="/" class="links__item">INICIO</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            <router-link exact to="/productos" class="links__item">PRODUCTOS</router-link>
          </li>
          <li class="links__divider">/</li>
          <li>
            CATEGORÍAS
          </li>
        </ul>
      </div>
        <div v-if="this.categorias.length > 0">
          <v-row class="fondoCard my-5">
            <v-col
              cols="12"
              sm="6"
              lg="4"
              v-for="categoria in this.categorias[0]"
              :key="categoria.id_pagina"
            >
              <v-card class="fondoCard">
                <div class="d-flex flex-no-wrap justify-flex-start">
                  <v-avatar
                    class="ma-3"
                    size="100"
                    tile
                  >
                    <v-img
                      :aspect-ratio="16/9"
                      :src="categoria.imagen.file_md"
                      :alt="categoria.nombre">
                    </v-img>
                  </v-avatar>
                    <v-card-title class="tituloCategoria headline" :style="{color: '#005C91'}" >
                      <router-link
                        :to="`/productos?categoria=${categoria.jerarquia}&titulo=${categoria.nombre}`" >
                        {{categoria.nombre}}
                      </router-link>
                    </v-card-title>
                </div>
                <v-divider class="mx-5"></v-divider>
                <v-card-subtitle class="tituloCategoria">
                  <ul>
                    <li
                      v-for="subCategoria in categoria.subcategorias"
                      :key="subCategoria.id_pagina"
                      class="font-weight-medium"
                      :style="{color: 'white'}"
                    >
                      <router-link
                      :to="`/productos?subCategoria=${subCategoria.jerarquia}&titulo=${subCategoria.nombre}`"
                      >
                        {{subCategoria.nombre}}
                      </router-link>
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
import Hero from '@/components/Global/Hero.vue';
import Loader from '@/components/Global/Loader.vue';
import axios from 'axios';

export default {
  name: 'Categorias',
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
          href: '/productos',
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
    Loader,
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
  created() {
    this.$store.commit('setLayout', 'defaultLayout');
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
};
</script>

<style scoped>
  .contenedorCategoria {
    width: 100%;
    height: 100%;
    transition: background .4s;
  }
  a {
    color: inherit !important;
    transition: color .3s;
  }
  a:hover {
    color:  #005C91 !important;
  }
  .fondoCard {
    background: rgba( 255, 255, 255, 0.25 ) !important;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ) !important;
    backdrop-filter: blur( 4px ) !important;
    -webkit-backdrop-filter: blur( 4px ) !important;
    border-radius: 10px !important;
    border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
  }

  .tituloCategoria {
    word-break: keep-all;
  }
    .links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    list-style: none;
    margin: 0;
    padding: 18px 12px;
  }

  .links li {
    align-items: center;
    display: inline-flex;
    font-size: 14px;
  }
  .links__item {
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    transition: all .3s cubic-bezier(0.25, 0.8, 0.5, 1);
    color: white !important;
  }
  .links li:nth-child(2n){
    padding: 0 12px;
  }

  .links ul {
    padding: 0;
  }
</style>
