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
        v-if="description.medidas !== null"
      >
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          MEDIDAS:
        </span> {{ description.medidas }}
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
        v-if="description.empaque !== null">
        <span
          class="font-weight-black"
          :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          EMPAQUE:
        </span> {{ description.empaque }}
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
          class="linkCategories pointer"
          @click="goToCategories('category', description.subcategoria_1.categoria)"
        >
          {{description.subcategoria_1.categoria.nombre}}
        </span> |
        <span
          class="linkCategories pointer"
          @click="goToCategories('subCategory', description.subcategoria_1)"
        >
          {{ description.subcategoria_1.nombre }}
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
    goToCategories(select, item) {
      if (select === 'category') {
        this.$router.push({
          path: '/productos',
          query: {
            category: item.jerarquia,
            title: item.nombre,
          },
        });
        this.getSubCategories(item.jerarquia);
      } else {
        this.$router.push({
          path: '/productos',
          query: {
            category: item.categoria.jerarquia,
            subCategory: item.jerarquia,
            title: item.nombre,
          },
        });
        this.getSubCategories(item.categoria.jerarquia);
      }
      this.setSelectedMenu(this.$route.path);
    },
    replaceSeller(text) {
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

.linkCategories {
  color: #0077bd;
  transition: color .3s;
}

.linkCategories:hover {
  color: #007fca !important;
}
</style>
