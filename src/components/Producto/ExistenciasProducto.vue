<template>
  <v-simple-table
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          >COLOR DEL PRODUCTO</th>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          ></th>
          <th
          :style="{ color: $vuetify.theme.themes[theme].azul }"
          >UNIDADES DISPONIBLES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(existence) in availableInventory" :key="existence.codigo">
          <td class="d-flex">
            <img
              v-if="existence.imagenes.length > 0"
              class="mr-5 rounded"
              :src="existence.imagenes[0]"
              :alt="existence.color_nombre"
            />
            <div
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mt-3"
            >
              {{existence.color_nombre}}
            </div>
          </td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
          >
            <span v-html="changeText(existence.variedad)"></span>
          </td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].textoError }"
            v-if="existence.inventario_almacen[0].cantidad < 10"
          >0</td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            v-else
          >{{addCommas(Math.round(existence.inventario_almacen[0].cantidad))}}</td>
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
import hextToRgb from '@/helpers/hextToRgb';

export default {
  name: 'ExistenciasProductos',
  props: ['availableInventory'],
  mixins: [addCommas],
  data() {
    return {
      mdiMagnify,
      hextToRgb,
    };
  },
  methods: {
    changeText(value) {
      if (value === 'Linea') {
        return '';
      }
      return value;
    },
  },
};
</script>
