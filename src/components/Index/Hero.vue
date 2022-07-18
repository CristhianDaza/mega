<template>
  <v-container class="contenedorHero fondoOscuro">
    <div class="infoHero">
      <p
        :style="{ color: $vuetify.theme.themes[theme].amarillo }"
        :class="this.$vuetify.breakpoint.xs ? 'display-1' : 'headline'"
      >
        BIENVENID@ A</p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        :class="this.$vuetify.breakpoint.xs ? 'title' : 'display-1'"
      >
        MEGAPROMOCIONALES <span
        :style="{ color: $vuetify.theme.themes[theme].amarillo }">LTDA</span></p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        class="body-1 mt-1 font-weight-medium">
        Somos una empresa dedicada a la venta de artículos
        <br> promocionales, comprometidos con nuestro equipo
        <br> de trabajo a tener la mejor calidad de servicio y productos.
      </p>
      <mp-button
        is-full
        @click="$router.push({ name: 'contacto' })"
      >
        Escríbenos
      </mp-button>
    </div>
    <div class="imgHero">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/hongo.png?alt=media&token=a77aaf62-9ca2-41de-907b-59b0b756bfde"
        width="300px"
        class="imagenHero mt-5"
      ></v-img>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'HeroPrincipal',
  components: {
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
  },

  data() {
    return {
    };
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
    animation: imgHero 10s linear 0s infinite normal none;
  }
  @keyframes imgHero {
    0%,
    100% {
      transform: translateY(0);
    }

    10%,
    30%,
    50%,
    70% {
      transform: translateY(-8px);
    }

    20%,
    40%,
    60% {
      transform: translateY(8px);
    }

    80% {
      transform: translateY(6.4px);
    }

    90% {
      transform: translateY(-6.4px);
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
