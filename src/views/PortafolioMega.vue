<template>
  <div
    id="app"
    :class="{ 'has-mouse': hasMouse }"
    class="mt-2"
    @touchstart="hasMouse = false"
  >
    <Flipbook
      class="flipbook container"
      :pages="pages"
      v-slot="flipbook"
      ref="flipbook"
    >
      <div class="action-bar">
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
  </div>
</template>

<script>
import Flipbook from 'flipbook-vue';
import {
  mdiArrowLeftBoldCircle,
  mdiMagnifyPlus,
  mdiMagnifyMinus,
  mdiArrowRightBoldCircle,
} from '@mdi/js';

export default {
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
    };
  },
  components: {
    Flipbook,
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
        null,
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%201.png?alt=media&token=d0fdde10-9aaa-4171-92c5-a26f3e87ad9f',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%203.png?alt=media&token=9d8b2006-0e79-4244-9d9a-4e3f7f9206c5',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%204.png?alt=media&token=4baa5b71-ce4a-43fc-b2b6-b7eb9888463f',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%205.png?alt=media&token=e198fbc8-eb0e-43dc-b2b8-5a3a26d18a8b',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%206.png?alt=media&token=d96512c8-f938-4d06-aabd-392fb3a26597',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%207.png?alt=media&token=64a5e196-fc18-40ba-8213-dc3896daa782',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%208.png?alt=media&token=7837fdbc-e30e-4cd7-ac02-036098907905',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%209.png?alt=media&token=db5c376c-a7ca-413b-80c7-6aa63140f783',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2010.png?alt=media&token=1e579c4f-da4b-4ad9-9d57-ed329590b96d',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2011.png?alt=media&token=ee33267b-968c-4ee3-8404-26b19f82300a',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2012.png?alt=media&token=57b7796b-33e0-42b7-a905-0d0afd6ac1dc',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2013.png?alt=media&token=66eabc52-1d6a-488b-ad0a-00f5af7f840b',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2014.png?alt=media&token=d128f478-0dae-4db6-a86c-a97ee11a94bd',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2015.png?alt=media&token=65fbbc06-ada9-4e36-aebf-1db2087eefba',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2016.png?alt=media&token=53875d74-fdd2-484c-b084-c972c2584a91',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2017.png?alt=media&token=ad43d752-1cb0-4721-b370-6b966b9a141b',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2018.png?alt=media&token=449ad627-9e69-4cbb-b0a9-e2907800a8ab',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2019.png?alt=media&token=7cd51a56-cd83-465e-8668-dfdd3d0c45c5',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2020.png?alt=media&token=a88f31c7-eba7-403b-a28b-97ad7136c135',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2021.png?alt=media&token=b7379fb0-0c16-442b-82b5-b7524fef5bbd',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2022.png?alt=media&token=642aa614-002d-4f60-8746-6425337b6889',
        'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/portafolio%2FPagina%2023.png?alt=media&token=336a227a-57b4-491b-9b90-41cb866e87b8',
      ];
    }), 1);
  },
};
</script>

<style scoped>
#app {
  height: 80vh;
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
