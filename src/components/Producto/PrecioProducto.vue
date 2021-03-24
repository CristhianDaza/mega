<template>
<!-- eslint-disable max-len -->
  <v-card-text class="py-0">
    <v-card-subtitle
      class="font-weight-black primary--text px-0 pb-0"
    >
      PRECIO:
    </v-card-subtitle>
    <v-card-title
      :style="{color: $vuetify.theme.themes[theme].basetexto}"
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
              :style="{background: $vuetify.theme.themes[theme].basebackground}"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Variedad
                    </th>
                    <th class="text-left">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(precio, index) in valorVariedad" :key="index">
                    <td>{{ precio.variedad }}</td>
                    <td>
                      $ {{addCommas(Math.round(precio.precio * 1.35))}} + iva
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>

          <template v-else>
            <td>$ {{addCommas(Math.round(valorVariedad[0].precio * 1.35))}} + iva</td>
          </template>
        </template>

          <template v-else>
            <template v-if="valorVariedad.length > 1">
              <v-simple-table
              :style="{background: $vuetify.theme.themes[theme].basebackground}"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Variedad
                      </th>
                      <th class="text-left">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(precio, index) in valorVariedad" :key="index">
                      <td>{{ precio.variedad }}</td>
                      <td>
                        <template v-if="precio.precio > precio.precio_descuento">
                          <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
                            $ {{addCommas(Math.round(precio.precio))}} + iva
                          </span>
                          $ {{addCommas(Math.round(precio.precio_descuento))}} + iva
                        </template>
                        <template v-else>
                          $ {{addCommas(Math.round(precio.precio))}} + iva
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>

            <template v-else>
              <template v-if="valorVariedad[0].precio > valorVariedad[0].precio_descuento">
                <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
                  $ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva
                </span>
                $ {{addCommas(Math.round(valorVariedad[0].precio_descuento))}} + iva
              </template>
              <template v-else>
                <td>$ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva</td>
              </template>
            </template>
          </template>
        </template>

        <template v-else>
          <template v-if="valorVariedad.length > 1">
            <v-simple-table
            :style="{background: $vuetify.theme.themes[theme].basebackground}"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Variedad
                    </th>
                    <th class="text-left">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(precio, index) in valorVariedad" :key="index">
                    <td>{{ precio.variedad }}</td>
                    <td>
                      <template v-if="precio.precio > precio.precio_descuento">
                        <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
                          $ {{addCommas(Math.round(precio.precio))}} + iva
                        </span>
                        $ {{addCommas(Math.round(precio.precio_descuento))}} + iva
                      </template>
                      <template v-else>
                        $ {{addCommas(Math.round(precio.precio))}} + iva
                      </template>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>

          <template v-else>
            <template v-if="valorVariedad[0].precio > valorVariedad[0].precio_descuento">
              <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
                $ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva
              </span>
              $ {{addCommas(Math.round(valorVariedad[0].precio_descuento))}} + iva
            </template>
            <template v-else>
              <td>$ {{addCommas(Math.round(valorVariedad[0].precio))}} + iva</td>
            </template>
          </template>
        </template>
      </v-card-title>

    <v-card-subtitle class="px-0 pt-5">
      <span class="font-weight-black primary--text">Última actualización del precio:</span> {{moment(precio.materiales[0].ultima_actualizacion_precio).locale('es-CO').format('LL')}}
    </v-card-subtitle>
  </v-card-text>
</template>

<script>
export default {
  props: ['materiales', 'precio'],
  computed: {
    valorVariedad() {
      return Object.values(
        // eslint-disable-next-line function-paren-newline
        this.materiales.reduce((prev, next) => Object.assign(prev, { [next.variedad]: next }), {}));
    },
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  methods: {
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
};
</script>
