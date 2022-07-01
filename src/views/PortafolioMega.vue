<template>
  <div>
    <Hero titulo="Portafolio"/>
    <v-container class="pt-0">
      <div class="links">
        <ul>
          <li>
            <router-link
              exact to="/"
              class="links__item"
              :style="{color: $vuetify.theme.themes[theme].colorText }"
            >INICIO</router-link>
          </li>
          <li class="links__divider">/</li>
          <li :style="{color: $vuetify.theme.themes[theme].secondary }">
            PORTAFOLIO MEGA
          </li>
        </ul>
      </div>
    </v-container>
    <div
      id="app"
      :class="{ 'has-mouse': hasMouse }"
      @touchstart="hasMouse = false"
    >
      <v-container>
        <Flipbook
          class="flipbook"
          :pages="pages"
          v-slot="flipbook"
        >
          <div class="action-bar mt-3 mb-3 pb-0">
            <v-icon
              class="btn left"
              :class="{ disabled: !flipbook.canFlipLeft }"
              @click="flipbook.flipLeft">
                {{mdiArrowLeftBoldCircle}}
              </v-icon>
            <v-icon
              class="btn plus"
              :class="{ disabled: !flipbook.canZoomIn }"
              @click="flipbook.zoomIn"
            >
              {{mdiMagnifyPlus}}
            </v-icon>
            <span class="page-num">
              Página {{ flipbook.page }} de {{ flipbook.numPages }}
            </span>
            <v-icon
                class="btn minus"
              :class="{ disabled: !flipbook.canZoomOut }"
              @click="flipbook.zoomOut"
            >
              {{mdiMagnifyMinus}}
            </v-icon>
            <v-icon
              class="btn right"
              :class="{ disabled: !flipbook.canFlipRight }"
              @click="flipbook.flipRight"
            >
              {{mdiArrowRightBoldCircle}}
            </v-icon>
          </div>
        </Flipbook>
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  mdiArrowLeftBoldCircle,
  mdiMagnifyPlus,
  mdiMagnifyMinus,
  mdiArrowRightBoldCircle,
} from '@mdi/js';
import layoutPrincipal from '@/mixins/layoutPrincipal';

export default {
  name: 'PortafolioView',
  mixins: [layoutPrincipal],
  data() {
    return {
      mdiArrowLeftBoldCircle,
      mdiMagnifyPlus,
      mdiMagnifyMinus,
      mdiArrowRightBoldCircle,
      pages: [],
      pagesHiRes: [],
      hasMouse: true,
      pageNum: null,
      items: [
        {
          titulo: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          titulo: 'catalogos',
          disabled: false,
          href: '/catalogos',
        },
        {
          titulo: 'portafolio mega',
          disabled: true,
          href: '/portafolio',
        },
      ],
    };
  },
  components: {
    Flipbook: () => import(/* webpackChunkName: "flipbook" */ 'flipbook-vue'),
    Hero: () => import(/* webpackChunkName: "hero" */ '@/components/Global/Hero.vue'),
  },
  metaInfo: {
    title: 'Portafolio 📖',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'description', content: 'Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.' },
      { name: 'robots', content: 'Index' },
      { name: 'og:title', content: 'Portafolio Megapromocionales LTDA' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://megapromocionales.com.co/portafolio' },
      { name: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b' },
      { name: 'og:description', content: 'Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.' },
      { name: 'og:site_name', content: 'Megapromocionales LTDA' },
    ],
  },
  mounted() {
    window.addEventListener('keydown', (ev) => {
      let flipbook = null;
      flipbook = this.$refs.flipbook;
      if (!flipbook) return;
      if (ev.keyCode === 37 && flipbook.canFlipLeft) flipbook.flipLeft();
      if (ev.keyCode === 39 && flipbook.canFlipRight) flipbook.flipRight();
    });
    // Simulate asynchronous pages initialization
    setTimeout((() => {
      this.pages = [
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp1_1.jpg?alt=media&token=4309a4bb-a917-4c31-bbd9-2cc422d9e000',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp1_2.jpg?alt=media&token=dcb92a7f-13d3-4c5c-bc03-79ee6c921375',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp2_1.jpg?alt=media&token=95b9393b-104e-4b44-a3d4-f9dd79216812',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp2_2.jpg?alt=media&token=d5323e77-794e-4f30-a8dc-f666678d0f73',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp3_1.jpg?alt=media&token=126d44fc-80d2-4774-a642-e866be587682',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp3_2.jpg?alt=media&token=a32176a6-230d-49ad-ab57-0245dafd7d5d',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp4_1.jpg?alt=media&token=80143b9a-39a2-4ced-ae61-f7e8fca3ae70',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp4_2.jpg?alt=media&token=4422f775-e90c-4ae4-a606-63ebfda62566',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp5_1.jpg?alt=media&token=179c9978-06ab-4a5e-8b89-b38a88725425',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp5_2.jpg?alt=media&token=85ee4abb-e533-4a27-9522-292ee9d5ed29',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp6_1.jpg?alt=media&token=fe5eabd6-d738-4a61-b0eb-0a45ab8bd225',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp6_2.jpg?alt=media&token=d1966688-edae-4536-9c62-42cc29dd4f42',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp7_1.jpg?alt=media&token=77db2847-065b-470f-8c0d-25297f35ba29',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp7_2.jpg?alt=media&token=fd7a1182-72f1-4c28-821a-3d1256fb2083',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp8_1.jpg?alt=media&token=d64d3704-899b-42e8-9313-8189b4b5b6ab',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp8_2.jpg?alt=media&token=36778682-9f4a-469f-a9ec-d823e78570a6',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp9_1.jpg?alt=media&token=cc5a4aec-1964-4729-9ab1-451fd0f03528',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp9_2.jpg?alt=media&token=ddea74b8-0880-4c0d-ad07-a63cf747e367',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp10_1.jpg?alt=media&token=1554a040-632f-4649-bad2-5fc6328ed0c4',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp10_2.jpg?alt=media&token=3077f195-ffbf-4418-ae76-ef4f2cbc4188',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp11_1.jpg?alt=media&token=e821e306-f1e6-4105-9a0c-09e549d7f837',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp11_2.jpg?alt=media&token=94cf2223-34b9-45fd-a700-e33248990132',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp12_1.jpg?alt=media&token=9a3008ff-a057-41e4-a609-cfa999781859',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp12_2.jpg?alt=media&token=d0553a0d-0bfd-4635-bc1a-96a8c2374eab',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp13_1.jpg?alt=media&token=81713bbb-daed-451e-b95e-55c3472d6878',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp13_2.jpg?alt=media&token=f1acf92a-e793-47c4-b2c3-ceb4b91bab0e',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp14_1.jpg?alt=media&token=fddea7f5-d4cb-4f2d-8fb6-748bc94195be',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp14_2.jpg?alt=media&token=b2c05cc1-ae3a-40ab-a060-b59597c80bcd',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp15_1.jpg?alt=media&token=38d24ab1-0bca-43ad-956f-378f4a5774ac',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp15_2.jpg?alt=media&token=50be7d32-6422-4eb4-8fc8-995aba691813',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp16_1.jpg?alt=media&token=de705b4a-14c1-4863-96ae-088f948fb49c',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp16_2.jpg?alt=media&token=5224736f-50da-46ca-b922-9e4686644f34',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp17_1.jpg?alt=media&token=f06be029-d1f1-4cba-a6a6-a5afc503189f',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp17_2.jpg?alt=media&token=15272f19-ffdf-4446-a60c-e5fceb75a0a2',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp18_1.jpg?alt=media&token=809c5f70-4126-481e-99df-9e6e49643523',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp18_2.jpg?alt=media&token=a4244fdd-4ed2-46b1-9c3d-50d77923d744',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp19_1.jpg?alt=media&token=d7d42643-28f5-4983-9c1d-c5b22876593d',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp19_2.jpg?alt=media&token=70981008-6045-402f-97c6-a14fa8933401',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp20_1.jpg?alt=media&token=7e0762c0-0c4c-4ee7-8950-0a3c90e2f945',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp20_2.jpg?alt=media&token=b13e95cf-7759-4208-9c4d-c5a7ef6e5b1f',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp21_1.jpg?alt=media&token=130b7041-918b-4429-a98e-e8835f2f6b4a',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp21_2.jpg?alt=media&token=99ad3869-fb9f-4ac3-97a7-e58f6b09e5e1',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp22_1.jpg?alt=media&token=de2df558-36dc-4e16-9c54-ad76657acbe9',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp22_2.jpg?alt=media&token=f304157d-06ac-4429-b6dd-e4d0c3cff4ad',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp23_1.jpg?alt=media&token=66d6edfb-a318-48d0-b2c5-25b7bb444392',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2Fp23_2.jpg?alt=media&token=52d7a7b0-1534-4289-b80f-6de004581168',
      ];
    }), 1);
  },
};
</script>

<style scoped>
#app {
  height: 100vh;
}
.flipbook {
  width: 100%;
  height: 70vh;
}

.click-to-flip {
  width: 0 !important;
  height: 0 !important;
}

.action-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-bar .btn {
  font-size: 35px;
  color: #999;
}

.action-bar .btn svg {
  bottom: 0;
}

.action-bar .btn:not(:first-child) {
  margin-left: 10px;
}

.has-mouse .action-bar .btn:hover {
  color: #ccc;
  filter: drop-shadow(1px 1px 5px #000);
  cursor: pointer;
}

.action-bar .btn:active {
  filter: none !important;
}

.action-bar .btn.disabled {
  color: #666;
  pointer-events: none;
}

.action-bar .page-num {
  font-size: 1rem;
  margin: 0 10px;
}

</style>
