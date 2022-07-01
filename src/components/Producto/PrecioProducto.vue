<template>
<!-- eslint-disable max-len -->
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
        v-if="precio.etiquetas.length > 0"
      >
        <template
          v-if="precio.etiquetas[0].id == 4 || precio.etiquetas[0].id == 10 || precio.etiquetas[0].id == 20"
        >
          <template
            v-if="valorVariedad.length > 1"
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
                  <tr v-for="(precio, index) in valorVariedad" :key="index">
                    <td :style="{ color: $vuetify.theme.themes[theme].colorText }">{{ precio.variedad }}</td>
                    <td :style="{ color: $vuetify.theme.themes[theme].colorText }">
                      $ {{addCommas(Math.round(precio.precio * 1.35))}} + iva
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
              $ {{addCommas(Math.round(valorVariedad[0].precio * 1.35))}} + iva
            </td>
          </template>
        </template>

          <template v-else>
            <template v-if="valorVariedad.length > 1">
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
                    <tr v-for="(precio, index) in valorVariedad" :key="index">
                      <td
                        :style="{ color: $vuetify.theme.themes[theme].colorText }"
                      >{{ precio.variedad }}</td>
                      <td>
                        <template v-if="precio.precio > precio.precio_descuento">
                          <span
                            :style="{ color: $vuetify.theme.themes[theme].textoError }"
                            class="text-decoration-line-through mr-3 subtitle-1"
                          >
                            $ {{addCommas(Math.round(precio.precio))}} + iva
                          </span>
                          <span
                            :style="{ color: $vuetify.theme.themes[theme].colorText }"
                          >
                            $ {{addCommas(Math.round(precio.precio_descuento))}} + iva
                          </span>
                        </template>
                        <div
                          :style="{ color: $vuetify.theme.themes[theme].colorText }"
                          v-else>
                          $ {{addCommas(Math.round(precio.precio))}} + iva
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>

            <template v-else>
              <template v-if="valorVariedad[0].precio > valorVariedad[0].precio_descuento">
                <span
                  class="text-decoration-line-through mr-3 subtitle-1"
                  :style="{ color: $vuetify.theme.themes[theme].textoError }"
                >
                  $ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva
                </span>
                <span :style="{ color: $vuetify.theme.themes[theme].colorText }">
                  $ {{addCommas(Math.round(valorVariedad[0].precio_descuento))}} + iva
                </span>
              </template>
              <div v-else :style="{ color: $vuetify.theme.themes[theme].colorText }">
                <td>$ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva</td>
              </div>
            </template>
          </template>
        </template>

        <template v-else>
          <template v-if="valorVariedad.length > 1">
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
                  <tr v-for="(precio, index) in valorVariedad" :key="index">
                    <td :style="{ color: $vuetify.theme.themes[theme].colorText }">{{ precio.variedad }}</td>
                    <td>
                      <template v-if="precio.precio > precio.precio_descuento">
                        <span
                          :style="{ color: $vuetify.theme.themes[theme].textoError }"
                          class="text-decoration-line-through mr-3 subtitle-1"
                        >
                          $ {{addCommas(Math.round(precio.precio))}} + iva
                        </span>
                        <span :style="{ color: $vuetify.theme.themes[theme].colorText }">
                          $ {{addCommas(Math.round(precio.precio_descuento))}} + iva
                        </span>
                      </template>
                      <div v-else :style="{ color: $vuetify.theme.themes[theme].colorText }">
                        $ {{addCommas(Math.round(precio.precio))}} + iva
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>

          <template v-else>
            <template v-if="valorVariedad[0].precio > valorVariedad[0].precio_descuento">
              <span
                :style="{ color: $vuetify.theme.themes[theme].textoError }"
                class="text-decoration-line-through mr-3 subtitle-1"
              >
                $ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva
              </span>
              <span :style="{ color: $vuetify.theme.themes[theme].colorText }">
                $ {{addCommas(Math.round(valorVariedad[0].precio_descuento))}} + iva
              </span>
            </template>
            <template v-else>
              <td :style="{ color: $vuetify.theme.themes[theme].colorText }">$ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva</td>
            </template>
          </template>
        </template>
      </v-card-title>

    <v-card-subtitle class="px-0 pt-5">
      <span
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        class="font-weight-black"
      >
        Última actualización del precio:</span> <span
          :style="{ color: $vuetify.theme.themes[theme].colorText }"
        >{{moment(precio.materiales[0].ultima_actualizacion_precio).locale('es-CO').format('LL')}}</span>
    </v-card-subtitle>
  </v-card-text>
</template>

<script>
import addCommas from '@/mixins/addCommas';

export default {
  name: 'PrecioProducto',
  props: ['materiales', 'precio'],
  mixins: [addCommas],
  computed: {
    valorVariedad() {
      return Object.values(
        // eslint-disable-next-line function-paren-newline
        this.materiales.reduce((prev, next) => Object.assign(prev, { [next.variedad]: next }), {}));
    },
  },
};
</script>
