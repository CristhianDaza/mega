<template>
  <div>
    <Hero />
    <Carousel />
    <Servicios />
    <InfoImagen />
    <ProductosNuevos />
    <Instagram />
    <FormularioContacto />
  </div>
</template>

<script>
import Hero from '@/components/Index/Hero.vue';
import Carousel from '@/components/Index/Carousel.vue';
import Servicios from '@/components/Index/Servicios.vue';
import InfoImagen from '@/components/Index/InfoImagen.vue';
import ProductosNuevos from '@/components/Index/ProductosNuevos.vue';
import Instagram from '@/components/Index/Instagram.vue';
import FormularioContacto from '@/components/Index/FormularioContacto.vue';

export default {
  name: 'Inicio',
  components: {
    Hero,
    Carousel,
    Servicios,
    InfoImagen,
    Instagram,
    FormularioContacto,
    ProductosNuevos,
  },
  metaInfo: {
    title: 'Inicio 🚀',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Megapromocionales, venta de articulos publicitarios y merchandising, productos promocionales de la mejor calidad y al mejor precio.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Megapromocionales, venta de articulos publicitarios y merchandising, productos promocionales de la mejor calidad y al mejor precio.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
  created() {
    this.$store.commit('setLayout', 'defaultLayout');
  },
};
</script>
