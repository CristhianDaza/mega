<template>
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
        <tr v-for="(existence, index) in availableInventory" :key="index">
          <td class="d-flex">
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
            {{existence.variedad}}
          </td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].textoError }"
            v-if="existence.inventario < 10"
          >Agotado</td>
          <td
            :style="{ color: $vuetify.theme.themes[theme].colorText }"
            v-else
          >{{addCommas(Math.round(existence.inventario))}}</td>
          <td>
            <v-tooltip right>
              <template v-slot:activator="{on, attrs}">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  icon
                  small
                  @click.stop="$emit('updateSuggested', existence.codigo)"
                  :style="{color: '#005C91'}"
                >
                  <v-icon>{{mdiMagnify}}</v-icon>
                </v-btn>
              </template>
              <span>Sugerencia en color {{existence.color_nombre}}</span>
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
};
</script>
