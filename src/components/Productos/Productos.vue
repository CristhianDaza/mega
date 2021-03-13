<template>
<!-- eslint-disable max-len -->
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        outlined
        :class="`elevation-${hover ? 8 : 0}`"
        class="mx-auto pa-0 transition-swing tarjetaProducto"
        :style="{background: $vuetify.theme.themes[theme].basebackground}"
      >
        <v-card-text class="pa-0">
          <router-link
            :to="{path: `/producto/${producto.familia}`}"
          >
            <v-img
              :src="producto.imagen.imagen.file_md"
              width="100%"
              max-width="100%"
              :alt="producto.descripcion_comercial"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <Loader />
                </v-row>
              </template>
            </v-img>
          </router-link>
        </v-card-text>
        <v-divider class="mx-8"></v-divider>
        <v-card-title
          class="text-center text-subtitle-2"
          :style="{color: $vuetify.theme.themes[theme].basetext}"
        >
          {{ producto.descripcion_comercial }}
        </v-card-title>
        <v-card-subtitle
          :style="{color: $vuetify.theme.themes[theme].basetext}"
        >
          {{ producto.familia }}
        </v-card-subtitle>
        <v-card-subtitle class="d-flex flex-wrap pt-0">
          <template v-for="color in colores">
            <div class="contenedor_color" :key="color.codigo">
              <v-tooltip bottom dense>
                <template v-slot:activator="{on, attrs}">
                  <div
                    v-if="color.color_hex_2 !== null && color.color_hex_3 !== null"
                    v-bind="attrs"
                    v-on="on"
                    :style="`background: linear-gradient(rgb(${hextToRgb(color.color_hex_1)[0]}, ${hextToRgb(color.color_hex_1)[1]}, ${hextToRgb(color.color_hex_1)[2]}) 0%, rgb(${hextToRgb(color.color_hex_2)[0]}, ${hextToRgb(color.color_hex_2)[1]}, ${hextToRgb(color.color_hex_2)[2]}) 48%, rgb(${hextToRgb(color.color_hex_2)[0]}, ${hextToRgb(color.color_hex_2)[1]}, ${hextToRgb(color.color_hex_2)[2]}) 62%, rgb(${hextToRgb(color.color_hex_3)[0]}, ${hextToRgb(color.color_hex_3)[1]}, ${hextToRgb(color.color_hex_3)[2]}) 66%, rgb(${hextToRgb(color.color_hex_3)[0]}, ${hextToRgb(color.color_hex_3)[1]}, ${hextToRgb(color.color_hex_3)[2]}) 100%)`"
                    class="circuloProducto"
                  ></div>
                  <div
                    v-else-if="color.color_hex_2 !== null && color.color_hex_3 === null"
                    v-bind="attrs"
                    v-on="on"
                    :style="`background: linear-gradient(rgb(${hextToRgb(color.color_hex_1)[0]}, ${hextToRgb(color.color_hex_1)[1]}, ${hextToRgb(color.color_hex_1)[2]}) 40%, rgb(${hextToRgb(color.color_hex_2)[0]}, ${hextToRgb(color.color_hex_2)[1]}, ${hextToRgb(color.color_hex_2)[2]}) 50%)`"
                    class="circuloProducto"
                  >
                  </div>
                  <div
                    v-else
                    v-bind="attrs"
                    v-on="on"
                    :style="'background:' + color.color_hex_1"
                    class="circuloProducto"
                  ></div>
                </template>
                <span>
                  {{color.color_nombre}} ({{color.inventario}})
                  <span v-if="color.variedad !== null"> - {{color.variedad}}</span>
                </span>
              </v-tooltip>
            </div>
          </template>
        </v-card-subtitle>
        <div class="d-flex justify-center row text-center my-2">
          <template v-if="producto.etiquetas.length > 0">
            <div
              v-for="etiqueta in producto.etiquetas"
              :key="etiqueta.id"
            >
              <img
                width="80px"
                :src="etiqueta.imagen.file_sm"
                :alt="etiqueta.nombre"
                >
            </div>
          </template>
        </div>
        <v-card-title
          :style="{color: $vuetify.theme.themes[theme].basetext}"
          v-if="existeUsuario" class="precio">
          <!-- <template v-if="producto.materiales[0].precio > producto.materiales[0].precio_descuento">
            <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
              $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
            </span>
            <div class="subtitle-1">
              $ {{addCommas(Math.round(producto.materiales[0].precio_descuento))}} + iva
            </div>
          </template>
          <template v-else>
            $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
          </template> -->

          <template v-if="producto.etiquetas.length > 0">
            <template v-if="producto.etiquetas[0].id == 4 || producto.etiquetas[0].id == 10 || producto.etiquetas[0].id == 20">
              $ {{addCommas(Math.round(producto.materiales[0].precio * 1.35))}} + iva
            </template>

            <template v-else>
              <template v-if="producto.materiales[0].precio > producto.materiales[0].precio_descuento">
                <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
                  $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
                </span>
                $ {{addCommas(Math.round(producto.materiales[0].precio_descuento))}} + iva
              </template>
              <template v-else>
                $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
              </template>
            </template>
          </template>

          <template v-else>
            <template v-if="producto.materiales[0].precio > producto.materiales[0].precio_descuento">
              <span class="text-decoration-line-through mr-3 subtitle-1" style="color: gray">
                $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
              </span>
              $ {{addCommas(Math.round(producto.materiales[0].precio_descuento))}} + iva
            </template>
            <template v-else>
              $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
            </template>
          </template>
        </v-card-title>
        <v-divider class="mx-5"></v-divider>
        <v-card-actions>
        <v-btn
          :to="{path: `/producto/${producto.familia}`}"
          outlined block
          color="primary"
          text
        >
            Ver Producto
        </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Global/Loader.vue';

export default {
  props: ['producto', 'colores'],
  components: {
    Loader,
  },
  computed: {
    ...mapGetters(['existeUsuario']),
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
    hextToRgb(hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        // eslint-disable-next-line prefer-template
        (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    },
  },
};
</script>

<style>
.contenedor_color {
  position: relative;
  height: 18px;
  max-height: 18px;
  width: 18px;
  margin: 2px 4px;
  border-radius: 100%;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  border: .2px solid gray;
}
.contenedor_color div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.circuloProducto {
  cursor: auto;
}
.tarjetaProducto {
  transition: all .4s;
}
.tarjetaProducto:hover {
  transform: translateY(-15px);
}
</style>
