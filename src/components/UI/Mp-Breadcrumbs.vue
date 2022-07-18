<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        @click="$router.push({ path: item.toLink })"
        :disabled="item.disabled"
        divider=">"
        :class="{ 'pointer colorBlue' : !item.disabled }"
      >
        {{ item.title.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Mp-breadcrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
};
</script>
