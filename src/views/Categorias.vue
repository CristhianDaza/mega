<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Categorías"/>
    <v-container>
      <div
        class="links"
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
      >
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
          <v-row class="my-5">
            <v-col
              cols="12"
              sm="6"
              lg="4"
              v-for="categoria in this.categorias[0]"
              :key="categoria.id_pagina"
            >
              <v-card
                :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
                class="tarjetaCategoria"
              >
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
                      :style="{ color: $vuetify.theme.themes[theme].colorText }"
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
};
</script>

<style scoped>
.tarjetaCategoria {
  min-height: 350px;
}

a {
  color: inherit !important;
  transition: color .3s;
}
a:hover {
  color:  #005C91 !important;
}
.tituloCategoria {
  word-break: keep-all;
}
</style>
