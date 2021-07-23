<template>
  <v-responsive :aspect-ratio="16/9">
    <div class="player-container">
      <vue-core-video-player
        :autoplay="false"
        loop
        preload="metadata"
        :title="`${video.familia} ${video.descripcion_comercial}`"
        logo="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_logo.webp?alt=media&amp;token=2e13ac36-784c-463a-a094-fa665516fffe&quot"
        :src="video.videos[0].video"
        :cover="video.imagenes[0].imagen.file_md"
        >
      </vue-core-video-player>
    </div>
  </v-responsive>
</template>

<script>
export default {
  name: 'VideoProducto',
  props: ['video'],
};
</script>
