<template>
<!-- eslint-disable max-len -->
  <div>
    <v-card-title class="font-weight-black pt-0">
      <h1
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="titulo titleProd">
          {{ descripcion.familia }} {{ descripcion.descripcion_comercial }}
      </h1>
    </v-card-title>
    <v-divider class="mx-8"></v-divider>
    <v-card-text class="pb-0">
      <p
      :style="{color: $vuetify.theme.themes[theme].basetexto}"
      class="ma-0"
      >
        {{ descripcion.descripcion_larga }}
      </p>
      <p
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="ma-0"
        v-if="descripcion.material !== null"
      >
        <strong class="font-weight-black"
        :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
        >MATERIAL: </strong>{{ descripcion.material }}
      </p>
      <p
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="ma-0"
        v-if="descripcion.medidas !== null"
      >
        <strong class="font-weight-black"
        :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
        >MEDIDAS: </strong>{{ descripcion.medidas }}
      </p>
      <p
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="ma-0"
        v-if="descripcion.area_impresion !== null">
        <strong class="font-weight-black"
        :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
        >ÁREA DE IMPRESIÓN APROXIMADA: </strong>{{ descripcion.area_impresion }}
      </p>
      <p
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="ma-0"
        v-if="descripcion.tecnica_marca_descripcion !== null">
        <strong class="font-weight-black"
        :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
        >MARCA: </strong>{{ descripcion.tecnica_marca_descripcion }}
      </p>
      <p
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="ma-0"
        v-if="descripcion.empaque !== null">
        <strong class="font-weight-black"
        :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
        >EMPAQUE: </strong>{{ descripcion.empaque }}
      </p>
      <p
        :style="{color: $vuetify.theme.themes[theme].basetexto}"
        class="ma-0">
        <strong class="font-weight-black"
        :style="{color: $vuetify.theme.themes[theme].colorPrimary}"
        >CATEGORIAS: </strong>
        <router-link
          class="linksCategorias"
          :to="`/productos?categoria=${descripcion.subcategoria_1.categoria.jerarquia}&titulo=${descripcion.subcategoria_1.categoria.nombre}`"
        >
          {{descripcion.subcategoria_1.categoria.nombre}}
        </router-link> |
        <router-link
          class="linksCategorias"
          :to="`/productos?subCategoria=${descripcion.subcategoria_1.jerarquia}&titulo=${descripcion.subcategoria_1.nombre}`"
        >
          {{ descripcion.subcategoria_1.nombre }}
        </router-link>
      </p>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ['descripcion'],
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
};
</script>

<style>
  .titulo {
    font-size: 20px;
  }

  .linksCategorias {
    color: inherit !important;
    transition: color .3s;
  }

  .linksCategorias:hover {
    color: #0077bd !important;
  }

</style>
