<template>
<!-- eslint-disable max-len -->
  <v-card
    class="tarjetaProductos"
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
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
          class="imagenProducto"
        >
        </v-img>
      </router-link>
    </v-card-text>
    <v-divider class="mx-8"></v-divider>
    <v-card-title
      class="text-center text-subtitle-2 titleProd"
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
    >
      {{ producto.descripcion_comercial }}
    </v-card-title>
    <v-card-subtitle
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
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
    <div class="d-flex justify-center text-center my-2">
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
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
      v-if="existeUsuario" class="precio">
      <template v-if="producto.etiquetas.length > 0">
        <template v-if="producto.etiquetas[0].id == 4 || producto.etiquetas[0].id == 10 || producto.etiquetas[0].id == 20">
          $ {{addCommas(Math.round(producto.materiales[0].precio * 1.35))}} + iva
        </template>

        <template v-else>
          <template v-if="producto.materiales[0].precio > producto.materiales[0].precio_descuento">
            <span
            :style="{ color: $vuetify.theme.themes[theme].textoError }"
            class="text-decoration-line-through mr-3 subtitle-1"
            >
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
          <span
          :style="{ color: $vuetify.theme.themes[theme].textoError }"
          class="text-decoration-line-through mr-3 subtitle-1"
          >
            $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
          </span>
          $ {{addCommas(Math.round(producto.materiales[0].precio_descuento))}} + iva
        </template>
        <template v-else>
          $ {{addCommas(Math.round(producto.materiales[0].precio))}} + iva
        </template>
      </template>
    </v-card-title>
    <v-card-subtitle class="pb-1 pt-0">
      <template v-if="totalInventario(producto.materiales) > 10">
        <span class="font-weight-bold">Inventario:</span> {{ addCommas(totalInventario(producto.materiales)) }} unidades
      </template>
      <template v-else>
        <span
          :style="{ color: $vuetify.theme.themes[theme].textoError }"
        >Agotado</span>
      </template>
    </v-card-subtitle>
    <v-divider class="mx-5"></v-divider>
    <v-card-actions>
    <v-btn
      :to="{path: `/producto/${producto.familia}`}"
      outlined
      block
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
    >
        Ver Producto
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import addCommas from '@/mixins/addCommas';
import hextToRgb from '@/mixins/hextToRgb';

export default {
  props: ['producto', 'colores'],
  mixins: [addCommas, hextToRgb],
  computed: {
    ...mapGetters(['existeUsuario']),
  },
  methods: {
    totalInventario(productos) {
      let total = 0;
      productos.forEach((producto) => {
        total += producto.inventario;
      });
      return total;
    },
  },
};
</script>

<style>
.tarjetaProductos {
  transition: all .6s;
}
.tarjetaProductos:hover {
  transform: translateY(-15px);
}
.titleProd {
  word-break: normal;
}
.imagenProducto {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
