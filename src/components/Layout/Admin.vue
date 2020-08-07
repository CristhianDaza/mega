<template>
  <v-app>
    <div v-if="existeUsuario">
      <MenuAdmin class="mb-5" />
    </div>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer v-if="existeUsuario" app>
      <span>
        &copy; {{ new Date().getFullYear() }} - Design by
        <strong>Cristhian Daza</strong> With 💙</span>
    </v-footer>
  </v-app>
</template>

<script>
import MenuAdmin from '@/components/Admin/MenuAdmin.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  computed: {
    ...mapGetters(['existeUsuario']),
  },
  components: {
    MenuAdmin,
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
