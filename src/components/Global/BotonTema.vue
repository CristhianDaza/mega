<template>
  <div class="botonTema">
    <v-switch
      v-model="botonTema"
      @change="cambiarTema"
      inset
      :class="$vuetify.theme.dark ? 'icon-dark' : 'icon-light'"
    >
    </v-switch>
  </div>
</template>

<script>
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';

export default {
  data() {
    return {
      mostrarTooltip: false,
      mdiWhiteBalanceSunny,
      mdiMoonWaningCrescent,
      botonTema: false,
    };
  },
  methods: {
    cambiarTema() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      } else {
        this.$vuetify.theme.dark = true;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      }
    },
  },
  mounted() {
    const theme = localStorage.getItem('darkTheme');
    if (theme) {
      if (theme === 'true') {
        this.botonTema = true;
      } else {
        this.botonTema = false;
        this.$vuetify.theme.dark = false;
      }
    } else {
      this.botonTema = false;
      this.$vuetify.theme.dark = false;
    }
  },
};
</script>

<style>
</style>
