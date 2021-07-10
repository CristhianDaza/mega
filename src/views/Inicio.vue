<template>
  <div>
    <Hero />
    <Carrusel />
    <VideoPromocion />
    <Servicios />
    <Newsletters />
    <ProductosNuevos />
  </div>
</template>

<script>
import Hero from '@/components/Index/Hero.vue';
import Carrusel from '@/components/Index/Carrusel.vue';
import Servicios from '@/components/Index/Servicios.vue';
import Newsletters from '@/components/Index/Newsletters.vue';
import ProductosNuevos from '@/components/Index/ProductosNuevos.vue';
import VideoPromocion from '@/components/Index/VideoPromocion.vue';

export default {
  name: 'Inicio',
  components: {
    Hero,
    Carrusel,
    Servicios,
    Newsletters,
    ProductosNuevos,
    VideoPromocion,
  },
  metaInfo: {
    title: 'Megapromocionales LTDA',
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
