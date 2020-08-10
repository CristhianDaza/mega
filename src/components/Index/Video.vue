<template>
  <v-row class="mx-0">
    <v-col class="pa-0" cols="12" v-for="video in videos" :key="video.id">
      <video loop autoplay muted tabindex="0" width="100%">
        <source :src="video.linkVideo" type="video/mp4" />
      </video>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'video',
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
