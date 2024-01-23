<template>
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
      >ETIQUETA</v-subheader>
      <v-list-item-group>
        <div v-for="label in labelList" :key="label.id">
          <v-list-item @click="searchLabel(label)">
            <v-list-item-title
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
            ><v-icon class="btn left">
              {{mdiLabelOutline}}
              </v-icon>
              {{ filterLabel(label.nombre) }}
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { mdiLabelOutline } from '@mdi/js';

export default {
  name: 'FilterLabel',
  data() {
    return {
      mdiLabelOutline,
    };
  },
  props: {
    labelList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    ...mapActions('categories', ['cleanSubCategories']),
    searchLabel(label) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          etiqueta: label.id,
          title: label.nombre,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
      this.cleanSubCategories();
    },
    filterLabel(label) {
      return label.replace(/_/g, ' ').replace(/\d+$/, '').trim();
    },
  },
};
</script>
