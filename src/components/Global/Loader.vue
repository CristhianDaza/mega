<template>
  <div class="loader">
    <div
      class="face"
      :class="{ 'dark' : this.$vuetify.theme.dark }"
    >
      <div class="circle"></div>
    </div>
    <div class="face">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.loader {
    width: 10em;
    height: 10em;
    font-size: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

  & .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate 3s linear infinite;

    &:nth-child(1) {
      width: 100%;
      height: 100%;
      color: $primary-color-blue;
      border-color: currentColor transparent transparent currentColor;
      border-width: 0.2em 0.2em 0em 0em;
      --deg: -45deg;
      animation-direction: normal;
    }

    &:nth-child(2) {
      width: 70%;
      height: 70%;
      color: $secondary-color-yellow;
      border-color: currentColor currentColor transparent transparent;
      border-width: 0.2em 0em 0em 0.2em;
      --deg: -135deg;
      animation-direction: reverse;
    }

    & .circle {
      position: absolute;
      width: 50%;
      height: 0.1em;
      top: 50%;
      left: 50%;
      background-color: transparent;
      transform: rotate(var(--deg));
      transform-origin: left;

      &::before {
        position: absolute;
        top: -0.5em;
        right: -0.5em;
        content: '';
        width: 1em;
        height: 1em;
        background-color: currentColor;
        border-radius: 50%;
        box-shadow: 0 0 2em,
        0 0 4em,
        0 0 6em,
        0 0 8em,
        0 0 10em,
        0 0 0 0.5em rgba(255, 255, 0, 0.1);
      }

    }
  }
}
@keyframes animate {
  to {
      transform: rotate(1turn);
  }
}
</style>
