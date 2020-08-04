<template>
<!-- eslint-disable max-len -->
  <div>
    <Hero titulo="Nosotros"/>
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
        <v-col cols="12" md="6">
          <h1 class="primary--text text-center display-1">Misión</h1>
          <v-divider class="mx-10 my-2"></v-divider>
          <p class="text-justify">Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.</p>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="primary--text text-center display-1">Visión</h1>
          <v-divider class="mx-10 my-2"></v-divider>
          <p class="text-justify">Consolidarnos como una empresa líder en el mercado de artículos promocionales, ampliar nuestros horizontes e introducir al mercado productos de marca propia atendiendo a las necesidades de nuestros clientes, utilizando tecnología e ideas nuevas que nos permitan ofrecer un excelente servicio, con precios competitivos, conservando la calidez y responsabilidad social como pilares de nuestro crecimiento personal y económico mejorando calidad de vida de nuestros colaboradores directos e indirectos.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';

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
    };
  },
  components: {
    Hero,
  },
};
</script>
