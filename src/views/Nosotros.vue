<template>
<!-- eslint-disable max-len -->
  <div :style="{background: $vuetify.theme.themes[theme].primary}">
    <Hero titulo="Nosotros"/>
    <div
      :style="{ backgroundImage:
        `url(${this.$vuetify.theme.dark ? nosotrosDark : nosotros })` }"
        class="fondoNosotros"
    >
      <v-container>
        <v-breadcrumbs :items="items">
          <div
            class="links"
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
          >
            <ul>
              <li>
                <router-link
                  exact
                  to="/"
                  class="links__item"
                  :style="{ color: $vuetify.theme.themes[theme].colorText }"
                >INICIO</router-link>
              </li>
              <li class="links__divider">/</li>
              <li>
                NOSOTROS
              </li>
            </ul>
          </div>
        </v-breadcrumbs>
        <v-row
          :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
          class="d-flex justify-space-around pa-5 mb-2">
          <v-col cols="12" md="6">
            <h1 class="text-center display-1"
              :style="{color: $vuetify.theme.themes[theme].amarillo}"
            >Misión</h1>
            <v-divider class="mx-10 my-2"></v-divider>
            <p
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            >
          Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.</p>
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="text-center display-1"
              :style="{color: $vuetify.theme.themes[theme].amarillo}"
            >Visión</h1>
            <v-divider class="mx-10 my-2"></v-divider>
            <p
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            >
          Consolidarnos como una empresa líder en el mercado de artículos promocionales, ampliar nuestros horizontes e introducir al mercado productos de marca propia atendiendo a las necesidades de nuestros clientes, utilizando tecnología e ideas nuevas que nos permitan ofrecer un excelente servicio, con precios competitivos, conservando la calidez y responsabilidad social como pilares de nuestro crecimiento personal y económico mejorando calidad de vida de nuestros colaboradores directos e indirectos.</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import nosotros from '@/assets/nosotros.svg';
import nosotrosDark from '@/assets/nosotros-dark.svg';

export default {
  name: 'Nosotros',
  data() {
    return {
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'nosotros',
          disabled: true,
          href: '/nosotros/',
        },
      ],
      nosotros,
      nosotrosDark,
    };
  },
  components: {
    Hero,
  },
  metaInfo: {
    title: 'Nosotros 💙',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Nosotros Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/nosotros' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
  created() {
    this.$store.commit('setLayout', 'defaultLayout');
  },
};
</script>

<style>
.fondoNosotros {
  background-position: right;
  background-size: cover;
}
</style>
