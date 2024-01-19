<template>
  <button
    :class="[{
      'isFull' : isFull,
      'themeDark' : isMenu ? '' : $vuetify.theme.dark,
      'menuButtons' : isMenu,
      'buttonMega' : !isMenu,
    }]"
    @click.prevent="setAction"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MpButton',
  props: {
    isFull: {
      type: Boolean,
      default: false,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setAction() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.buttonMega {
  min-width: 130px;
  height: 40px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: $text-color-white;
  overflow: hidden;
  border: 2px solid $primary-color-blue;
  color: $primary-color-blue;

  &:hover {
    color: $text-color-white;

    &:after {
      height: 100%;
    }
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s ease;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background: $primary-color-blue;
  }
}

.themeDark {
  background: #111B27;
  border: 2px solid $secondary-color-yellow;
  color: $text-color-white;

  &:hover {
    color: $text-color-black
  }

  &:after {
    background: $secondary-color-yellow;
  }
}

.isFull {
  width: 100%;
}

.menuButtons {
  height: 60px;
  color: #fff;
  padding: 5px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
  margin-top: 2px;

  &:hover {
    color: $primary-color-blue;
  }

  &:active {
    transform: translateY(3px);
    color: $text-color-white;
  }

  &.active {
    border-bottom: 2px solid $primary-color-blue;
    color: $primary-color-blue;
  }
}
</style>
