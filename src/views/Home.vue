<template>
  <div>
    <Hero />
    <Carrusel />
    <VideoPromocion />
    <Servicios />
  </div>
</template>

<script>
import layoutPrincipal from '@/mixins/layoutPrincipal';

export default {
  name: 'HomeView',
  mixins: [layoutPrincipal],
  components: {
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Index/Hero.vue'),
    Carrusel: () => import(/* webpackChunkName: "carrusel" */ '@/components/Index/Carrusel.vue'),
    Servicios: () => import(/* webpackChunkName: "servicios" */ '@/components/Index/Servicios.vue'),
    VideoPromocion: () => import(/* webpackChunkName: "videoPromocion" */ '@/components/Index/VideoPromocion.vue'),
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
};
</script>
