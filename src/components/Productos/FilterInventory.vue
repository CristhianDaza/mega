<template>
  <v-card
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
    shaped
    elevation="3"
  >
    <v-card-text class="pb-3 pt-0">
      <v-list
        dense
        :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
      >
        <v-subheader
          class="pa-0"
          :style="{ color: $vuetify.theme.themes[theme].colorText }"
        >INVENTARIO</v-subheader>
        <v-text-field
          label="Inventario Mayor a"
          outlined
          type="number"
          v-model="inventory"
          dense
          rounded
          maxlength="25"
          color="#005C91"
          class="pt-2"
          @keyup.enter="searchInventory(inventory)"
        >
        </v-text-field>
        <mp-button
          is-full
          @click="searchInventory(inventory)"
        >
          Filtrar
        </mp-button>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
  name: 'Mp-FilterInventory',
  data() {
    return {
      inventory: Number(this.$route.query.inventory) || null,
    };
  },
  components: {
    MpButton: () => import(/* webpackChunkName: "mpButton" */ '@/components/UI/Mp-Button.vue'),
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    searchInventory(inventory) {
      if (!inventory) {
        this.showError('El filtro no puede ir vacío.');
        return;
      }
      if (inventory <= 0) {
        this.showError('El filtro debe ser mayor a 0.');
        return;
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          inventory,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
    showError(info) {
      Swal.fire(
        '¡Error!',
        info,
        'error',
      );
    },
  },
};
</script>

<style scoped>

</style>
