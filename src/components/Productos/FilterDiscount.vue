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
      >DESCUENTO</v-subheader>
      <v-list-item-group>
        <v-checkbox
          @click="searchDiscount"
          v-model="discountValue"
          label="Con descuento"
          color="#1976d2"
          class="ml-5"
        ></v-checkbox>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { mdiCardsPlayingOutline } from '@mdi/js';

export default {
  name: 'FilterLabel',
  data() {
    return {
      mdiCardsPlayingOutline,
      discountValue: false,
    };
  },
  methods: {
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    ...mapActions('labels', ['setLabels', 'deleteLabel']),
    searchDiscount() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          discount: this.discountValue,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
  },
  mounted() {
    if (this.$route.query.discount) {
      this.discountValue = this.$route.query.discount === 'true';
    }
  },
};
</script>
