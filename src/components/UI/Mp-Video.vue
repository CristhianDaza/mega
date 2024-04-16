<template>
  <div class="container_video" @click="setSelectedMenu(linkProduct)">
    <video
      width="100%"
      height="100%"
      :autoplay="autoPlay"
      :muted="muted"
      :loop="loop"
      :controls="controls"
      type="video/mp4"
      :src="linkVideo"
      :class="{ 'pointer': cursorPointer, 'videoBorder' : smallVideo }"
    />
    <img
      :src="logo"
      alt="Logo Video"
      class="logoVideo"
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MpVideo',
  props: {
    linkVideo: {
      type: String,
      require: true,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    cursorPointer: {
      type: Boolean,
      default: false,
    },
    smallVideo: {
      type: Boolean,
      default: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    linkProduct: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      logo: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_logo.webp?alt=media&amp;token=2e13ac36-784c-463a-a094-fa665516fffe&quot',
    };
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
  },
};
</script>

<style lang="scss" scoped>
.container_video {
  position: relative;
  z-index: 1;
}

.logoVideo {
  position: absolute;
  z-index: 2;
  width: 7rem;
  right: 0;
  top: 0;
  padding-top: 25px;
  padding-right: 25px;
  opacity: .4;
}

.videoBorder {
  border-radius: 15px;
  box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.41);
}
</style>
