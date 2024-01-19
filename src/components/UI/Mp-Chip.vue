<template>
  <div v-if="getLabels.length > 0">
    <div
      v-for="label in getLabels"
      :key="label.id"
      class="d-inline-flex"
    >
      <v-chip
        class="mb-5 mr-2"
        closable
        close
        close-icon="mdi-close"
        @click:close="deleteChip(label)"
      >
        {{ label.name }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MpChip',
  data() {
    return {
      mdiCloseCircle,
    };
  },
  destroyed() {
    // this.clearLabel();
  },
  methods: {
    ...mapActions('labels', ['deleteLabel', 'clearLabel']),
    deleteChip(chip) {
      const currentQuery = { ...this.$route.query };
      delete currentQuery[chip.filter];

      this.$router.push({
        path: this.$route.path,
        query: currentQuery,
      });
      this.deleteLabel(chip.id);
    },
  },
  computed: {
    ...mapGetters('labels', ['getLabels']),
  },
};
</script>

<style scoped>

</style>
