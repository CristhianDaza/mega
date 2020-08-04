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
};
</script>
