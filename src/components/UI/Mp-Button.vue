<template>
  <button
    :class="[{
      'isFull' : isFull,
      'themeDark' : $vuetify.theme.dark,
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
  min-width: 90px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  overflow: hidden;
  border-radius: 5px;
  border: none;
  background-color: #05090C;
  font-size: 15px;
  border-bottom: 1px solid #05090C;
  border-left: 1px solid #05090C;
  margin-top: 2px;

  &:hover {
    border-bottom: 1px solid $primary-color-blue;
    border-left: 1px solid $primary-color-blue;
    color: $primary-color-blue;
  }

  &:active {
    transform: translateY(3px);
    color: $text-color-white;
  }
}
</style>
