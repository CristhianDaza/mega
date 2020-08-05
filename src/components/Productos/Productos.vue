<template>
  <v-card outlined class="mx-auto">
    <v-card-text class="pa-0 div-img">
      <router-link
        :to="{path: `/producto/${producto.familia}`}"
      >
        <v-img
          :src="producto.imagen.imagen.file_md"
          width="100%"
          :alt="producto.descripcion_comercial"
          class="imagenProducto"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div class="text">Ver Producto</div>
      </router-link>
    </v-card-text>
    <v-card-title
      class="text-center text-subtitle-2"
    >
      {{ producto.descripcion_comercial }}
    </v-card-title>
    <v-card-subtitle>
      {{ producto.familia }}
    </v-card-subtitle>
    <v-card-subtitle class="d-flex pt-0">
      <template v-for="color in colores">
        <div class="contenedor_color" :key="color.codigo">
          <v-tooltip bottom dense>
            <template v-slot:activator="{on, attrs}">
              <div
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
    <v-card-text class="text-center">
      <img v-if="producto.materiales[0].estado == '2'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/nuevo.png?alt=media&token=7dbffaa3-1580-435a-9739-86c155c5194b" alt="Novedad" class="text-center" width="80">
      <img v-if="producto.materiales[0].estado == '3'" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/saldo.png?alt=media&token=b1d4cf45-0dcc-4285-87e9-c32f63c808d8" alt="Saldo" class="text-center" width="80">
      <div v-if="producto.etiquetas.length > 0">
        <img v-if="producto.etiquetas[0].id == 4" src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/Neto.png?alt=media&token=f718bea7-0e92-480d-82e4-56a2d3a2dcbe" alt="Neto" class="text-center" width="80">
      </div>
    </v-card-text>
    <v-card-title v-if="existeUsuario" class="precio">
      ${{ Math.round(producto.materiales[0].precio) }} + iva
    </v-card-title>
    <v-divider class="mx-5"></v-divider>
    <v-card-actions>
    <v-btn
      :to="{path: `/producto/${producto.familia}`}"
      outlined block
      color="primary"
      text
    >
        Ver inventario
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['producto', 'colores'],
  computed: {
    ...mapGetters(['existeUsuario']),
  },
};
</script>

<style>
.div-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.div-img .imagenProducto {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transform: scale(1);
  -ms-transform: scale(1);
  -moz-transform: scale(1);
  -webkit-transform: scale(1);
  -o-transform: scale(1);
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
}
.div-img .text {
  font-family: "Open Sans";
  padding-top: 5px;
  display: block;
  text-align: center;
  width: 100%;
  transform: translate(0px);
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
  opacity: 0;
  transition: transfom opacity 1.5s;
}
.div-img:hover .imagenProducto {
  transform: scale(0.8);
  -ms-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -webkit-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
.div-img:hover .text {
  transform: translate(0px, -20px);
  opacity: 1;
}

.contenedor_color {
  position: relative;
  height: 15px;
  max-height: 15px;
  width: 15px;
  margin: 2px 4px;
  border-radius: 100%;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid gray;
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
</style>
