<template>
  <v-card-title
    :style="{ color: $vuetify.theme.themes[theme].colorText }"
    class="pa-0"
  >
    <v-simple-table
      :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
      style="width: 100%;"
      class="mb-5"
      v-if="priceVariety.length > 1"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="text-left"
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              v-if="!isCard"
            >Precio</th>
            <th
              class="text-left"
              :style="{ color: $vuetify.theme.themes[theme].azul }"
              v-if="!isCard"
            >Variedad</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, index) in priceVariety"
            :key="index"
          >
            <td>
              <span v-html="priceWithCommas(value)"></span>
            </td>
            <td v-if="!isCard">
              <span v-html="changeText(value.variedad)"></span>
            </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <template v-else>
      <span :class="{'text-body-1': isCard}" v-html="priceWithCommas(priceVariety[0])"></span>
    </template>
  </v-card-title>
</template>

<script>
import addCommas from '@/mixins/addCommas';

export default {
  name: 'PrecioProducto',
  props: ['materials', 'price', 'isCard'],
  mixins: [addCommas],
  computed: {
    priceVariety() {
      return Object.values(
        this.materials.reduce((prev, next) => Object.assign(prev, { [next.variedad]: next }), {}),
      );
    },
  },
  methods: {
    absoluteValue(value) {
      return Math.abs(value);
    },
    roundValue(value) {
      return this.addCommas(Math.round(value));
    },
    priceWithDiscount(price) {
      if (this.absoluteValue(price?.descuento) > 0) {
        const discount = (price.precio * this.absoluteValue(price.descuento)) / 100;
        return `<span class="text-decoration-line-through colorError word-break">$ ${this.roundValue(price.precio)} + iva</span> <span class="word-break">$ ${this.roundValue(price.precio - discount)} + iva</span>`;
      }
      return `$ ${this.roundValue(price?.precio)} + iva`;
    },
    priceWithCommas(value) {
      return this.priceWithDiscount(value);
    },
    changeText(value) {
      if (value === 'Linea') {
        return '';
      }
      return value;
    },
  },
};
</script>
