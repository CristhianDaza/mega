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
        >CATEGORÍAS</v-subheader>
        <v-list-item-group>
          <div v-for="category in categoryList" :key="category.id">
            <v-list-item @click="searchCategory(category)">
              <v-list-item-title
                :style="{ color: $vuetify.theme.themes[theme].colorText }"
              ><v-icon class="btn left">
                {{mdiViewList}}
                </v-icon>
                {{ category.nombre }}
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
import { mdiViewList } from '@mdi/js';

export default {
  name: 'FilterCategories',
  data() {
    return {
      mdiViewList,
    };
  },
  props: {
    categoryList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    ...mapActions('categories', ['getSubCategories']),
    searchCategory(category) {
      this.$router.push({
        path: this.$route.path,
        query: {
          category: category.jerarquia,
          title: category.nombre,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
      this.getSubCategories(category.jerarquia);
    },
  },
};
</script>
