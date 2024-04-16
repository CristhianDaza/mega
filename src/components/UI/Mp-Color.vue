<template>
  <!-- eslint-disable max-len -->
  <div
    class="contenedor_color"
    :class="{ 'pointer' : pointer }"
    @click="searchColor(color)"
  >
    <v-tooltip bottom dense>
      <template v-slot:activator="{on, attrs}">
        <div
          v-if="color.hex_2 !== null && color.hex_3 !== null"
          v-bind="attrs"
          v-on="on"
          :style="`background: linear-gradient(rgb(${hextToRgb(color.hex_1)[0]}, ${hextToRgb(color.hex_1)[1]}, ${hextToRgb(color.hex_1)[2]}) 0%, rgb(${hextToRgb(color.hex_2)[0]}, ${hextToRgb(color.hex_2)[1]}, ${hextToRgb(color.hex_2)[2]}) 48%, rgb(${hextToRgb(color.hex_2)[0]}, ${hextToRgb(color.hex_2)[1]}, ${hextToRgb(color.hex_2)[2]}) 62%, rgb(${hextToRgb(color.hex_3)[0]}, ${hextToRgb(color.hex_3)[1]}, ${hextToRgb(color.hex_3)[2]}) 66%, rgb(${hextToRgb(color.hex_3)[0]}, ${hextToRgb(color.hex_3)[1]}, ${hextToRgb(color.hex_3)[2]}) 100%)`"
        ></div>
        <div
          v-else-if="color.hex_2 !== null && color.hex_3 === null"
          v-bind="attrs"
          v-on="on"
          :style="`background: linear-gradient(rgb(${hextToRgb(color.hex_1)[0]}, ${hextToRgb(color.hex_1)[1]}, ${hextToRgb(color.hex_1)[2]}) 40%, rgb(${hextToRgb(color.hex_2)[0]}, ${hextToRgb(color.hex_2)[1]}, ${hextToRgb(color.hex_2)[2]}) 50%)`"
        >
        </div>
        <div
          v-else
          v-bind="attrs"
          v-on="on"
          :style="'background:' + color.hex_1"
        ></div>
      </template>
      <span v-if="showInventory">
        {{color.color_nombre}} ({{color.inventario}})
        <span v-if="color.variedad !== null"> - {{color.variedad}}</span>
      </span>
      <span v-else>{{ color.nombre }} </span>
    </v-tooltip>
  </div>
</template>

<script>
import hextToRgb from '@/helpers/hextToRgb';

export default {
  name: 'Mp-Color',
  props: {
    color: {
      type: Object,
      require: true,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
    showInventory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hextToRgb,
    };
  },
  methods: {
    searchColor(color) {
      this.$emit('filterColor', color);
    },
  },
};
</script>

<style scoped>

</style>
