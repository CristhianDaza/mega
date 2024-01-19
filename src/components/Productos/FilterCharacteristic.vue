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
      >CARACTERÍSTICA</v-subheader>
      <v-list-item-group>
        <div v-for="characteristic in characteristics" :key="characteristic.id">
          <v-list-item @click="searchCharacteristics(characteristic)">
            <v-list-item-title
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
            ><v-icon class="btn left">
              {{mdiCardsPlayingOutline}}
            </v-icon>
              {{ characteristic.nombre }}
            </v-list-item-title>
          </v-list-item>
        </div>
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
    };
  },
  props: {
    characteristics: {
      type: Array,
      require: true,
    },
  },
  methods: {
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    searchCharacteristics(characteristic) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          characteristics: characteristic.id,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
  },
};
</script>
