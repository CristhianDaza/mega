<template>
  <div>
    <button
      v-if="!loading"
      :class="[{
      'isFull' : isFull,
      'themeDark' : isMenu ? '' : $vuetify.theme.dark,
      'menuButtons' : isMenu,
      'buttonMega' : !isMenu,
      'active': isActive,
      'isOutline': isOutline
    }]"
      @click.prevent="setAction"
    >
      <slot></slot>
    </button>
    <div v-else class="loading spinner"></div>
  </div>
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
    loading: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isOutline: {
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

<style lang="scss">
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

  &.isOutline {
    background: none;
    color: $primary-color-blue;
    border: none;

    &:after {
      background: none;
    }
  }
}

.themeDark {
  background: $background-color-dark;
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

  &:hover span {
    color: $primary-color-blue !important;
  }
}

.loading {
  border-radius: 50px;
  width: 50px;
  left: calc(50vw - 25px);
}

.spinner {
  display: block;
  width: 34px;
  height: 34px;
  top: 8px;
  left: calc(50% - 17px);
  background: transparent;
  box-sizing: border-box;
  border-top: 4px solid $primary-color-blue;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-radius: 100%;
  animation: spin 0.6s ease-out infinite;
}
@keyframes spin {
  100% {transform: rotate(360deg)}
}
</style>
