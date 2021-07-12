<template>
  <div class="botonTema">
    <button
      class="switch"
      :class="$vuetify.theme.dark ? 'active' : ''"
      id="switch"
      @click="cambiarTema"
    >
      <span>
        <v-icon
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          {{ mdiWhiteBalanceSunny }}
        </v-icon>
      </span>
      <span>
        <v-icon
          :style="{ color: $vuetify.theme.themes[theme].amarillo }"
        >
          {{ mdiMoonWaningCrescent }}
        </v-icon>
      </span>
    </button>
  </div>
</template>

<script>
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';

export default {
  data() {
    return {
      mostrarTooltip: false,
      mdiWhiteBalanceSunny,
      mdiMoonWaningCrescent,
    };
  },
  methods: {
    cambiarTema() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      } else {
        this.$vuetify.theme.dark = true;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      }
    },
  },
};
</script>

<style>
.botonTema {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.switch {
  background: #111b27;
  border-radius: 1000px;
  border: none;
  position: relative;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  outline: none;
}

.switch::after {
  content: '';
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  background: #f1f1f1;
  top: 0;
  left: 0;
  right: unset;
  border-radius: 100px;
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch.active {
  background: #f2f5f8;
  color: #000;
  transition: all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch.active::after {
  right: 0;
  left: unset;
  transition: all 5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch span {
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: block;
  background: none;
  color: #fff;
}
</style>
