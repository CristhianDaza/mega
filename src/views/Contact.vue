<template>
  <div>
    <Hero title="Contacto"/>
    <div class="fondoContacto">
      <v-container class="pt-0">
        <mp-breadcrumbs
          :breadcrumbs="breadcrumbs"
        />
      </v-container>
      <Redes />
      <FormularioContacto />
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9149134310364!2d-74.09503018525827!3d4.609251243727199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f998d474cd877%3A0x65ee5ebb4dd5eb1d!2sMegapromocionales!5e0!3m2!1ses!2sco!4v1593195206764!5m2!1ses!2sco" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
  </div>
</template>

<script>
import layoutPrincipal from '@/mixins/layoutPrincipal';

export default {
  name: 'ContactView',
  mixins: [layoutPrincipal],
  data() {
    return {
    };
  },
  components: {
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
    FormularioContacto: () => import(/* webpackChunkName: "formularioContacto" */ '@/components/Index/FormularioContacto.vue'),
    Redes: () => import(/* webpackChunkName: "redes" */ '@/components/Index/Redes.vue'),
    MpBreadcrumbs: () => import(/* webpackChunkName: "mpBreadcrumbs" */ '@/components/UI/Mp-Breadcrumbs.vue'),
  },
  computed: {
    breadcrumbs() {
      const breadcrumbs = [
        { title: 'Inicio', disabled: false, toLink: '/' },
        { title: 'Contacto', disabled: true, toLink: '/contact' },
      ];

      return breadcrumbs;
    },
  },
  metaInfo: {
    title: 'Contacto ☎',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Visitanos en nuestro almacen, tambien nos puedes escribir por WhatsApp, por correo electrónico 💬 o envianos un mensaje por medio del formulario de contacto. 🤝🏼. Centro Nacional de Artes Gráficas Carrera 28 # 10 - 60 Local 137. WhatsApp 315 927 51 44. WhatsApp 315 927 41 44. WhatsApp 320 585 55 31. Correo Electrónico megapromocional@gmail.com' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Contacto Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/contacto/' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Visitanos en nuestro almacen, tambien nos puedes escribir por WhatsApp, por correo electrónico 💬 o envianos un mensaje por medio del formulario de contacto. 🤝🏼. Centro Nacional de Artes Gráficas Carrera 28 # 10 - 60 Local 137. WhatsApp 315 927 51 44. WhatsApp 315 927 41 44. WhatsApp 320 585 55 31. Correo Electrónico megapromocional@gmail.com' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
};
</script>

<style>
.fondoContacto {
  background-position: top;
  background-size: 100%;
}
</style>
