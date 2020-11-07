<template>
  <v-card
    :style="{background: $vuetify.theme.themes[theme].background}"
  >
    <v-responsive
      v-for="video in videos"
      :key="video.id"
      :class="video.completo.value ? '' : 'container'"
    >
      <router-link :to="video.urlProducto">
        <video
          loop
          autoplay
          muted
          width="100%"
          preload="auto"
        >
          <source :src="video.linkVideo" type="video/mp4" />
        </video>
      </router-link>
    </v-responsive>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'videoComponent',
  methods: {
    ...mapActions(['traerVideos']),
  },
  computed: {
    ...mapState(['videos']),
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  mounted() {
    this.traerVideos();
  },
};
</script>
