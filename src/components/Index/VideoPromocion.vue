<template>
  <v-row>
    <v-col class="pa-0" cols="12" v-for="video in videos" :key="video.id">
      <video
        loop
        autoplay
        muted height="100%" max-height="100%" width="100%" max-width="100%">
        <source :src="video.linkVideo" type="video/mp4" />
      </video>
    </v-col>
  </v-row>
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
