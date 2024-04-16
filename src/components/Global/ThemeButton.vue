<template>
  <div class="themeButton">
    <button
      class="switch"
      :class="{ 'active' : $vuetify.theme.dark }"
      id="switch"
      @click="changeTheme"
    >
      <span>
        <v-icon :style="{ color: $vuetify.theme.themes[theme].secondary }">
          {{ mdiWhiteBalanceSunny }}
        </v-icon>
      </span>
      <span>
        <v-icon :style="{ color: $vuetify.theme.themes[theme].secondary }">
          {{ mdiMoonWaningCrescent }}
        </v-icon>
      </span>
    </button>
  </div>
</template>

<script>
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';
import Toast from '@/helpers/alertToast';

export default {
  name: 'ThemeButton',
  data() {
    return {
      mdiWhiteBalanceSunny,
      mdiMoonWaningCrescent,
    };
  },
  methods: {
    changeTheme() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        localStorage.setItem('darkTheme', 'false');
        this.showAlert(false);
        return;
      }
      this.$vuetify.theme.dark = true;
      localStorage.setItem('darkTheme', 'true');
      this.showAlert(true);
    },
    showAlert(status) {
      Toast.fire({
        icon: 'info',
        title: `Modo oscuro: ${status ? 'Activado' : 'Desactivado'}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.themeButton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch {
  background: #111b27;
  border-radius: 1000px;
  border: none;
  position: relative;
  cursor: pointer;
  display: flex;
  outline: none;
  transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    position: absolute;
    background: #f1f1f1;
    top: 0;
    right: 30px;
    border-radius: 100px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
    transition: all .2s linear;
  }

  &.active {
    background: #f2f5f8;
    color: #000;
    &:after {
      right: 0;
      left: unset;
    }
  }

  & span {
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    background: none;
    color: #fff;
    transition: all .2s linear;
  }
}
</style>
