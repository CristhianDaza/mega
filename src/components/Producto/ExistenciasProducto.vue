<template>
<!-- eslint-disable max-len -->
  <v-simple-table class="fondoCard">
    <template v-slot:default>
      <thead>
        <tr>
          <th  :style="{color: '#005C91'}">COLOR DEL<br> PRODUCTO</th>
          <th  :style="{color: '#005C91'}"></th>
          <th  :style="{color: '#005C91'}">UNIDADES<br>DISPONIBLES</th>
          <th :style="{color: '#005C91'}">PRODUCTOS<br>SUGERIDOS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(existencia, index) in inventarioDisponible" :key="index">
          <td class="d-flex">
            <div
              style="border: 1px solid grey"
              class="contenedor_color mt-3 mr-2"
            >
              <template>
                <div
                  v-if="existencia.color_hex_2 !== null && existencia.color_hex_3 !== null"
                  :style="`background: linear-gradient(rgb(${hextToRgb(existencia.color_hex_1)[0]}, ${hextToRgb(existencia.color_hex_1)[1]}, ${hextToRgb(existencia.color_hex_1)[2]}) 0%, rgb(${hextToRgb(existencia.color_hex_2)[0]}, ${hextToRgb(existencia.color_hex_2)[1]}, ${hextToRgb(existencia.color_hex_2)[2]}) 48%, rgb(${hextToRgb(existencia.color_hex_2)[0]}, ${hextToRgb(existencia.color_hex_2)[1]}, ${hextToRgb(existencia.color_hex_2)[2]}) 62%, rgb(${hextToRgb(existencia.color_hex_3)[0]}, ${hextToRgb(existencia.color_hex_3)[1]}, ${hextToRgb(existencia.color_hex_3)[2]}) 66%, rgb(${hextToRgb(existencia.color_hex_3)[0]}, ${hextToRgb(existencia.color_hex_3)[1]}, ${hextToRgb(existencia.color_hex_3)[2]}) 100%)`"
                ></div>
                <div
                  v-else-if="existencia.color_hex_2 !== null && existencia.color_hex_3 === null"
                  :style="`background: linear-gradient(rgb(${hextToRgb(existencia.color_hex_1)[0]}, ${hextToRgb(existencia.color_hex_1)[1]}, ${hextToRgb(existencia.color_hex_1)[2]}) 40%, rgb(${hextToRgb(existencia.color_hex_2)[0]}, ${hextToRgb(existencia.color_hex_2)[1]}, ${hextToRgb(existencia.color_hex_2)[2]}) 50%)`"
                >
                </div>
                <div
                  v-else
                  :style="'background:' + existencia.color_hex_1"
                ></div>
              </template>
            </div>
            <div class="mt-3 white--text">
              {{existencia.color_nombre}}
            </div>
          </td>
          <td class="white--text">
            {{existencia.variedad}}
          </td>
          <td class="error--text" v-if="existencia.inventario < 10">Agotado</td>
          <td v-else class="white--text">{{addCommas(Math.round(existencia.inventario))}}</td>
          <td>
            <v-tooltip right>
              <template v-slot:activator="{on, attrs}">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  icon
                  small
                  @click.stop="$emit('actualizarSugerencias', existencia.codigo)"
                  :style="{color: '#005C91'}"
                >
                  <v-icon>{{mdiMagnify}}</v-icon>
                </v-btn>
              </template>
              <span>Sugerencia en color {{existencia.color_nombre}}</span>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {
  mdiMagnify,
} from '@mdi/js';

export default {
  props: ['inventarioDisponible'],
  data() {
    return {
      mdiMagnify,
    };
  },
  methods: {
    hextToRgb(hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        // eslint-disable-next-line prefer-template
        (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    },
    addCommas(nStr) {
      // eslint-disable-next-line no-param-reassign
      nStr += '';
      const x = nStr.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? `.${x[1]}` : '';
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1.$2');
      }
      return x1 + x2;
    },
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
};
</script>

<style>
  .contenedor_color {
    position: relative;
    height: 20px;
    max-height: 20px;
    width: 20px;
    margin: 2px 4px;
    border-radius: 100%;
    user-select: none;
    overflow: hidden;
    cursor: auto;
  }
  .contenedor_color div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .theme--light.v-data-table, .theme--light.v-card {
    background-color: transparent !important;
  }
  .theme--light
  .v-data-table
  >.v-data-table__wrapper
  >table>tbody>tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
    background: rgba(255, 255, 255, .4) !important;
    color: black !important;
  }
</style>
