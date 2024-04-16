<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:item="{ item }">
      <router-link :to="{ path: item.toLink }">
        <v-breadcrumbs-item
          @click="setSelectedMenu(item.toLink)"
          :disabled="item.disabled"
          :class="{ 'pointer colorBlue' : !item.disabled }"
        >
          {{ item.title.toUpperCase() }}
        </v-breadcrumbs-item>
      </router-link>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Mp-breadcrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
  },
};
</script>
