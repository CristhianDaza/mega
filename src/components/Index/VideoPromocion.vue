<template>
  <div
    :style="{background: $vuetify.theme.themes[theme].primary}"
  >
    <div
    :style="{ backgroundImage: `url(${this.$vuetify.theme.dark ? VideoPromDark : VideoProm })` }"
    class="fondoVideo"
    >
      <v-responsive
        v-for="video in videos"
        :key="video.id"
        :class="video.completo.value ? '' : 'container'"
      >
        <router-link :to="video.urlProducto">
          <div class="player-container">
            <vue-core-video-player
              loop
              :muted="true"
              :controls="false"
              preload="metadata"
              width="100%"
              height="100%"
              logo="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_logo.webp?alt=media&amp;token=2e13ac36-784c-463a-a094-fa665516fffe&quot"
              :src="video.linkVideo"
              type="video/mp4"
              class="videoPromocion"
              >
            </vue-core-video-player>
          </div>
        </router-link>
      </v-responsive>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VideoProm from '@/assets/videoProm.svg';
import VideoPromDark from '@/assets/videoProm-dark.svg';

export default {
  name: 'videoPromocion',
  data() {
    return {
      VideoProm,
      VideoPromDark,
    };
  },
  methods: {
    ...mapActions(['traerVideos']),
  },
  computed: {
    ...mapState(['videos']),
  },
  mounted() {
    this.traerVideos();
  },
};
</script>

<style>
.fondoVideo {
  background-size: 100%;
  background-position: center;
}
.vcp-container, .vcp-container video{
  background-color: transparent !important;
}
.vcp-layer.loading-layer {
  border-radius: 10px;
}
video {
  border-radius: 10px;
}
</style>
