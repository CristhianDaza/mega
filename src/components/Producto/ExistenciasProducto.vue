<template>
<!-- eslint-disable max-len -->
  <v-simple-table
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          >COLOR DEL<br> PRODUCTO</th>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          ></th>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          >UNIDADES<br>DISPONIBLES</th>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          >PRODUCTOS<br>SUGERIDOS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(existencia, index) in inventarioDisponible" :key="index">
          <td class="d-flex">
            <div
              style="border: 1px solid grey"
              class="contenedor_color circuloProducto mt-3 mr-2"
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
            <div
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mt-3"
            >
              {{existencia.color_nombre}}
            </div>
          </td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
          >
            {{existencia.variedad}}
          </td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].textoError }"
            v-if="existencia.inventario < 10"
          >Agotado</td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            v-else
          >{{addCommas(Math.round(existencia.inventario))}}</td>
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
import addCommas from '@/mixins/addCommas';
import hextToRgb from '@/mixins/hextToRgb';

export default {
  name: 'ExistenciasProductos',
  props: ['inventarioDisponible'],
  mixins: [addCommas, hextToRgb],
  data() {
    return {
      mdiMagnify,
    };
  },
};
</script>
