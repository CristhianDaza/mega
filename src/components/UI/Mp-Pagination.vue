<template>
  <v-container class="max-width">
    <v-pagination
      circle
      v-model="page"
      :length="perPage"
      @input="changePage(page)"
    >
    </v-pagination>
  </v-container>
</template>

<script>
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
    changePage(page) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

</style>
