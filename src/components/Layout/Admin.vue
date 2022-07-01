<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].primary}">
    <div v-if="existeUsuario">
      <MenuAdmin class="mb-3" />
    </div>
    <v-main>
      <router-view />
    </v-main>
    <v-footer
      :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
      app>
      <span class="text-right foot">
        &copy; {{ new Date().getFullYear() }} - Design by
        <strong>Cristhian Daza</strong> With 💙</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminLayout',
  computed: {
    ...mapGetters(['existeUsuario']),
  },
  components: {
    MenuAdmin: () => import(/* webpackChunkName: "menuAdmin" */ '@/components/Admin/MenuAdmin.vue'),
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style>
  .foot {
    width: 100%;
  }
</style>
