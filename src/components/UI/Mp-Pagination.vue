<template>
  <v-container class="max-width">
    <v-pagination
      v-model="page"
      :length="perPage"
      @input="changePage(page)"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      navigationColor="#fff"
    >
    </v-pagination>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Mp-Pagination',
  props: {
    perPage: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      page: Number(this.$route.query.page) || 1,
    };
  },
  methods: {
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    changePage(page) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page,
        },
      });
      this.setSelectedMenu(this.$route.path);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

</style>
