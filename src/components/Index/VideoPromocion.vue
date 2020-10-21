<template>
  <v-card>
    <v-responsive
      v-for="video in videos"
      :key="video.id"
      height="100%"
      width="100%"
    >
      <router-link :to="video.urlProducto">
        <video
          loop
          autoplay
          muted
          width="100%"
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
  },
  mounted() {
    this.traerVideos();
  },
};
</script>
