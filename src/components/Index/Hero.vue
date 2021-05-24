<template>
  <div>
    <v-img
      src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_megapromocionales.webp?alt=media&token=9650fc01-9559-4b48-b8f1-b298ebbe6aa7"
      alt="Imagen Principal Megapromocionales"
      class="imagenPrincipal"
      height="400px"
      >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <Loader />
        </v-row>
      </template>
      <v-row :class="this.$vuetify.breakpoint.xs ? 'fondoOscuro' : ''" align="center" class="pa-2">
        <v-col>
          <v-container>
            <p
              :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
              :class="this.$vuetify.breakpoint.xs ? 'display-1' : 'headline'"
            >
              BIENVENID@ A</p>
            <p
              :style="{color: $vuetify.theme.themes.dark.basetexto}"
              :class="this.$vuetify.breakpoint.xs ? 'title' : 'display-1'"
            >
              MEGAPROMOCIONALES <span
              :style="{color: $vuetify.theme.themes[theme].colorPrimary}">LTDA</span></p>
            <p
              :style="{color: $vuetify.theme.themes.dark.basetexto}"
              class="body-1 mt-1 font-weight-medium">
              Somos una empresa dedicada a la venta de artículos
              <br> promocionales, comprometidos con nuestro equipo
              <br> de trabajo a tener la mejor calidad de servicio y productos.
            </p>
            <v-btn
              to="/contacto"
              :style="{background: $vuetify.theme.themes[theme].colorPrimary}"
              elevation="20"
              class="mt-2 white--text">
              Contacto
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
import Loader from '@/components/Global/Loader.vue';

export default {
  components: {
    Loader,
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
};
</script>

<style>
  .fondoOscuro {
    background: rgba(0, 0, 0, .8);
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .imagenPrincipal {
    height: 100%;
  }
</style>
