<template>
  <div>
    <v-card
      :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
      class="mt-5"
      shaped
      elevation="3"
    >
      <v-list
        :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
        dense
      >
        <v-subheader
          :style="{ color: $vuetify.theme.themes[theme].colorText }"
        >SUB CATEGORÍAS</v-subheader>
        <v-list-item-group>
          <div v-for="subCategory in subCategoryList" :key="subCategory.id">
            <v-list-item @click="searchSubCategory(subCategory)">
              <v-list-item-title
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              ><v-icon class="btn left">
                {{mdiViewModule}}
              </v-icon>
                {{ subCategory.nombre }}
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mdiViewModule } from '@mdi/js';

export default {
  name: 'FilterSubCategories',
  data() {
    return {
      mdiViewModule,
    };
  },
  props: {
    subCategoryList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    searchSubCategory(subCategory) {
      this.$router.push({
        path: this.$route.path,
        query: {
          subCategory: subCategory.jerarquia,
          title: subCategory.nombre,
          category: this.$route.query.category,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
  },
};
</script>
