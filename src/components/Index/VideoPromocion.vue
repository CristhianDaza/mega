<template>
  <div
    v-if="videos"
    :style="{ backgroundImage: `url(${this.$vuetify.theme.dark ? VideoPromDark : VideoProm })` }"
    class="containerPromotionVideo"
  >
    <v-responsive
      v-for="video in videos"
      :key="video.id"
      :class="{ 'container' : !video.completo }"
      :aspect-ratio="16/9"
    >
      <router-link :to="{ path: video.urlProducto }">
        <mp-video
          :link-video="video.linkVideo"
          loop
          muted
          auto-play
          cursor-pointer
          :small-video="!video.completo"
          :link-product="video.urlProducto"
        />
      </router-link>
    </v-responsive>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VideoProm from '@/assets/img/videoProm.svg';
import VideoPromDark from '@/assets/img/videoProm-dark.svg';
import MpVideo from '@/components/UI/Mp-Video.vue';

export default {
  name: 'PromotionVideo',
  data() {
    return {
      VideoProm,
      VideoPromDark,
    };
  },
  methods: {
    ...mapActions(['traerVideos']),
    ...mapActions('menu', ['setSelectedMenu']),
  },
  computed: {
    ...mapState(['videos']),
  },
  mounted() {
    this.traerVideos();
  },
  components: {
    MpVideo,
  },
};
</script>

<style scoped>
.containerPromotionVideo {
  background-size: 100%;
  background-position: center;
}
</style>
