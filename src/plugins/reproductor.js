import Vue from 'vue';
import VueCoreVideoPlayer from 'vue-core-video-player';

const es = {
  dashboard: {
    btn: {
      play: 'Reproducir',
      pause: 'Pausa',
      fullscreen: 'Completa',
      exitFullscreen: 'Salir de pantalla completa',
      mute: 'Silenciar',
      unmute: 'Activar sonido',
      back: 'Atrás',
      pip: 'Reproductor en miniatura',
    },
    settings: {
      autoplay: 'Autoplay',
      loop: 'Bucle',
      speed: 'Velocidad',
      resolution: 'Resolución',
    },
  },
  layers: {
    error: {
      title: '(O_O)?  Error!',
      2404: 'Fuente de video no encontrada',
      2502: 'Error de red',
      2503: 'El video no se puede decodificar',
      2504: '¡No se puede reproducir el video!',
    },
    loading: {
      msg: 'Cargando...',
    },
  },
};

Vue.use(VueCoreVideoPlayer, {
  lang: es,
});
