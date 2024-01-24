<template>
  <v-card-text class="py-0">
    <v-card-subtitle
      class="font-weight-black px-0 pb-0"
      :style="{ color: $vuetify.theme.themes[theme].azul }"
    >
      PRECIO:
    </v-card-subtitle>
    <v-card-title
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
      class="pa-0">
      <template
        v-if="price.etiquetas.length > 0"
      >
        <template
          v-if="price.etiquetas[0].id === 4 ||
          price.etiquetas[0].id === 10 ||
          price.etiquetas[0].id === 20 ||
          price.etiquetas[0].id === 36"
        >
          <template
            v-if="priceVariety.length > 1"
          >
            <v-simple-table
              :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th
                      class="text-left"
                      :style="{ color: $vuetify.theme.themes[theme].azul }"
                    >
                      Variedad
                    </th>
                    <th
                      class="text-left"
                      :style="{ color: $vuetify.theme.themes[theme].azul }"
                    >
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(price, index) in priceVariety" :key="index">
                    <td
                      :style="{ color: $vuetify.theme.themes[theme].colorText }"
                    >
                      {{ price.variedad }}
                    </td>
                    <td :style="{ color: $vuetify.theme.themes[theme].colorText }">
                      $ {{addCommas(Math.round(price.precio * 1.35))}} + iva
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>

          <template v-else>
            <td
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
            >
              $ {{addCommas(Math.round(priceVariety[0].precio * 1.35))}} + iva
            </td>
          </template>
        </template>

          <template v-else>
            <template v-if="priceVariety.length > 1">
              <v-simple-table
                :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th
                        class="text-left"
                        :style="{ color: $vuetify.theme.themes[theme].azul }"
                      >
                        Variedad
                      </th>
                      <th
                        class="text-left"
                        :style="{ color: $vuetify.theme.themes[theme].azul }"
                      >
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(price, index) in priceVariety" :key="index">
                      <td
                        :style="{ color: $vuetify.theme.themes[theme].colorText }"
                      >{{ price.variedad }}</td>
                      <td>
                        <template v-if="price.precio > price.precio_descuento">
                          <span
                            :style="{ color: $vuetify.theme.themes[theme].textoError }"
                            class="text-decoration-line-through mr-3 subtitle-1"
                          >
                            $ {{addCommas(Math.round(price.precio))}} + iva
                          </span>
                          <span
                            :style="{ color: $vuetify.theme.themes[theme].colorText }"
                          >
                            $ {{addCommas(Math.round(price.precio_descuento))}} + iva
                          </span>
                        </template>
                        <div
                          :style="{ color: $vuetify.theme.themes[theme].colorText }"
                          v-else>
                          $ {{addCommas(Math.round(price.precio))}} + iva
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>

            <template v-else>
              <template v-if="priceVariety[0].precio > priceVariety[0].precio_descuento">
                <span
                  class="text-decoration-line-through mr-3 subtitle-1"
                  :style="{ color: $vuetify.theme.themes[theme].textoError }"
                >
                  $ {{addCommas(Math.round(priceVariety[0].precio))}} + iva
                </span>
                <span :style="{ color: $vuetify.theme.themes[theme].colorText }">
                  $ {{addCommas(Math.round(priceVariety[0].precio_descuento))}} + iva
                </span>
              </template>
              <div v-else :style="{ color: $vuetify.theme.themes[theme].colorText }">
                <span>$ {{addCommas(Math.round(priceVariety[0].precio))}} + iva</span>
              </div>
            </template>
          </template>
        </template>

        <template v-else>
          <template v-if="priceVariety.length > 1">
            <v-simple-table
            :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th
                      class="text-left"
                      :style="{ color: $vuetify.theme.themes[theme].azul }"
                    >
                      Variedad
                    </th>
                    <th
                      class="text-left"
                      :style="{ color: $vuetify.theme.themes[theme].azul }"
                    >
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(price, index) in priceVariety" :key="index">
                    <td
                      :style="{ color: $vuetify.theme.themes[theme].colorText }"
                    >
                      {{ price.variedad }}
                    </td>
                    <td>
                      <template v-if="price.precio > price.precio_descuento">
                        <span
                          :style="{ color: $vuetify.theme.themes[theme].textoError }"
                          class="text-decoration-line-through mr-3 subtitle-1"
                        >
                          $ {{addCommas(Math.round(price.precio))}} + iva
                        </span>
                        <span :style="{ color: $vuetify.theme.themes[theme].colorText }">
                          $ {{addCommas(Math.round(price.precio_descuento))}} + iva
                        </span>
                      </template>
                      <div v-else :style="{ color: $vuetify.theme.themes[theme].colorText }">
                        $ {{addCommas(Math.round(price.precio))}} + iva
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>

          <template v-else>
            <template v-if="priceVariety[0].precio > priceVariety[0].precio_descuento">
              <span
                :style="{ color: $vuetify.theme.themes[theme].textoError }"
                class="text-decoration-line-through mr-3 subtitle-1"
              >
                $ {{addCommas(Math.round(priceVariety[0].precio))}} + iva
              </span>
              <span :style="{ color: $vuetify.theme.themes[theme].colorText }">
                $ {{addCommas(Math.round(priceVariety[0].precio_descuento))}} + iva
              </span>
            </template>
            <template v-else>
              <td
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              >
                $ {{addCommas(Math.round(priceVariety[0].precio))}} + iva
              </td>
            </template>
          </template>
        </template>
      </v-card-title>

    <v-card-subtitle class="px-0 pt-5">
      <span
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        class="font-weight-black"
      >
       Actualizado: </span> <span
          :style="{ color: $vuetify.theme.themes[theme].colorText }"
      >
        {{moment(price.materiales[0].ultima_actualizacion_precio).locale('es-CO').format('LL')}}
      </span>
    </v-card-subtitle>
  </v-card-text>
</template>

<script>
import addCommas from '@/mixins/addCommas';

export default {
  name: 'PrecioProducto',
  props: ['materiales', 'price'],
  mixins: [addCommas],
  computed: {
    priceVariety() {
      return Object.values(
        this.materiales.reduce((prev, next) => Object.assign(prev, { [next.variedad]: next }), {}),
      );
    },
  },
};
</script>
