<template>
  <!-- eslint-disable max-len -->
  <div
    class="contenedor_color"
    :class="{ 'pointer' : pointer }"
  >
    <v-tooltip bottom dense>
      <template v-slot:activator="{on, attrs}">
        <div
          v-if="color.color_hex_2 !== null && color.color_hex_3 !== null"
          v-bind="attrs"
          v-on="on"
          :style="`background: linear-gradient(rgb(${hextToRgb(color.color_hex_1)[0]}, ${hextToRgb(color.color_hex_1)[1]}, ${hextToRgb(color.color_hex_1)[2]}) 0%, rgb(${hextToRgb(color.color_hex_2)[0]}, ${hextToRgb(color.color_hex_2)[1]}, ${hextToRgb(color.color_hex_2)[2]}) 48%, rgb(${hextToRgb(color.color_hex_2)[0]}, ${hextToRgb(color.color_hex_2)[1]}, ${hextToRgb(color.color_hex_2)[2]}) 62%, rgb(${hextToRgb(color.color_hex_3)[0]}, ${hextToRgb(color.color_hex_3)[1]}, ${hextToRgb(color.color_hex_3)[2]}) 66%, rgb(${hextToRgb(color.color_hex_3)[0]}, ${hextToRgb(color.color_hex_3)[1]}, ${hextToRgb(color.color_hex_3)[2]}) 100%)`"
        ></div>
        <div
          v-else-if="color.color_hex_2 !== null && color.color_hex_3 === null"
          v-bind="attrs"
          v-on="on"
          :style="`background: linear-gradient(rgb(${hextToRgb(color.color_hex_1)[0]}, ${hextToRgb(color.color_hex_1)[1]}, ${hextToRgb(color.color_hex_1)[2]}) 40%, rgb(${hextToRgb(color.color_hex_2)[0]}, ${hextToRgb(color.color_hex_2)[1]}, ${hextToRgb(color.color_hex_2)[2]}) 50%)`"
        >
        </div>
        <div
          v-else
          v-bind="attrs"
          v-on="on"
          :style="'background:' + color.color_hex_1"
        ></div>
      </template>
      <span>
        {{color.color_nombre}} ({{ color.inventario <= 10 ? 0 : color.inventario }})
        <span v-if="color.variedad !== null"> - {{color.variedad}}</span>
      </span>
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
  },
  data() {
    return {
      hextToRgb,
    };
  },
};
</script>

<style scoped>

</style>
