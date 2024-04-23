<template>
  <div>
    <v-card-title class="font-weight-bold pt-0">
      <h1
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        class="titulo titleProd"
      >
        {{ description.familia }} - {{ description.descripcion_comercial }}
      </h1>
    </v-card-title>
    <v-divider class="mx-8"></v-divider>
    <v-card-text class="pb-0">
      <p
      :style="{ color: $vuetify.theme.themes[theme].colorText }"
      class="ma-0"
      >
        {{ productDescription }}
      </p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        class="ma-0"
        v-if="description.material !== null"
      >
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          MATERIAL:
        </span> {{ description.material }}
      </p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        class="ma-0"
      >
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          MEDIDAS:
        </span>
          {{ description.medidas_largo }}cm x
          {{ description.medidas_ancho }}cm x
          {{ description.medidas_alto }}cm
      </p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        class="ma-0"
        v-if="description.area_impresion !== null"
      >
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          ÁREA DE IMPRESIÓN APROXIMADA:
        </span> {{ approximateArea }}
      </p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        class="ma-0"
        v-if="description.tecnica_marca_descripcion !== null">
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          MARCA:
        </span> {{ productBrand }}
      </p>
      <p
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
        class="ma-0"
      >
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          CATEGORIAS:
        </span>
        <span
          class="linkCategories"
          v-if="description.subcategoria_1"
        >
          {{description.subcategoria_1.nombre}}
        </span>
        <span
          class="linkCategories"
          v-if="description.subcategoria_2"
        > | {{ description.subcategoria_2.nombre }}
        </span>
        <span
          class="linkCategories"
          v-if="description.subcategoria_3"
        > | {{ description.subcategoria_3.nombre }}
        </span>
      </p>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DescriptionProduct',
  props: ['description'],
  computed: {
    productDescription() {
      return this.replaceSeller(this.description.descripcion_larga);
    },
    productBrand() {
      return this.replaceSeller(this.description.tecnica_marca_descripcion);
    },
    approximateArea() {
      return this.replaceSeller(this.description.area_impresion);
    },
  },
  methods: {
    ...mapActions('categories', ['getCategories', 'getSubCategories']),
    ...mapActions('menu', ['setSelectedMenu']),
    replaceSeller(text) {
      if (!text) return '';
      return text.includes('asesora') ? text.replaceAll('asesora', 'asesor') : text;
    },
  },
};
</script>

<style>
.titulo {
  font-size: 30px;
  word-break: normal;
}

</style>
