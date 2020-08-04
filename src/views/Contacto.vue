<template>
  <div>
    <Hero titulo="Contacto"/>
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
    </v-container>
    <FormularioContacto />
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9149134310364!2d-74.09503018525827!3d4.609251243727199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f998d474cd877%3A0x65ee5ebb4dd5eb1d!2sMegapromocionales!5e0!3m2!1ses!2sco!4v1593195206764!5m2!1ses!2sco" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
  </div>
</template>

<script>
import Hero from '@/components/Global/Hero.vue';
import FormularioContacto from '@/components/Index/FormularioContacto.vue';

export default {
  name: 'Contacto',
  data() {
    return {
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'contacto',
          disabled: true,
          href: '/contacto/',
        },
      ],
    };
  },
  components: {
    Hero,
    FormularioContacto,
  },
};
</script>
