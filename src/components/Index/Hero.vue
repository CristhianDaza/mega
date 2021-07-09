<template>
  <div>
    <v-img
      :src="(this.$vuetify.theme.dark) ? imgHeroDark : imgHero"
      alt="Imagen Principal Megapromocionales"
      height="350px"
      position="bottom"
      >
      <v-container class="contenedorHero fondoOscuro">
        <div class="infoHero">
          <p
            style="color: #FFCD17"
            :class="this.$vuetify.breakpoint.xs ? 'display-1' : 'headline'"
          >
            BIENVENID@ A</p>
          <p
            :style="{color: $vuetify.theme.themes.dark.basetexto}"
            :class="this.$vuetify.breakpoint.xs ? 'title' : 'display-1'"
          >
            MEGAPROMOCIONALES <span
            style="color: #FFCD17">LTDA</span></p>
          <p
            :style="{color: $vuetify.theme.themes.dark.basetexto}"
            class="body-1 mt-1 font-weight-medium">
            Somos una empresa dedicada a la venta de artículos
            <br> promocionales, comprometidos con nuestro equipo
            <br> de trabajo a tener la mejor calidad de servicio y productos.
          </p>
          <v-btn
            to="/contacto"
            elevation="5"
            large
            outlined
            block
            style="color: #FFCD17"
            class="mt-2">
            Contacto
          </v-btn>
        </div>
        <div class="imgHero">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/hongo.png?alt=media&token=a77aaf62-9ca2-41de-907b-59b0b756bfde"
            width="300px"
            class="imagenHero mt-5"
          ></v-img>
        </div>
      </v-container>
    </v-img>
  </div>
</template>

<script>
import imgHeroDark from '@/assets/hero-dark.svg';
import imgHero from '@/assets/hero.svg';

export default {
  data() {
    return {
      imgHero,
      imgHeroDark,
    };
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  components: {
  },
};
</script>

<style>
  .contenedorHero {
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .imagenHero {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-15px);
    }
    100% {
      transform: translatey(0px);
    }
  }
  @media (max-width: 900px) {
    .fondoOscuro {
      background: rgba(0, 0, 0, .8);
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  @media (max-width: 750px) {
    .imagenHero {
      display: none;
    }
  }
</style>
