<template>
  <v-text-field
    v-model="search"
    clearable
    label="Buscar"
    :prepend-inner-icon="mdiMagnify"
    hide-details="auto"
    id="buscador"
    filled
    :color="$vuetify.theme.dark ? 'white' : 'blue'"
    class="d-flex align-center ml-2"
    @input="searchProduct"
    autocomplete="off"
  ></v-text-field>
</template>

<script>
import { mdiMagnify } from '@mdi/js';

export default {
  name: 'SearchComponent',
  data() {
    return {
      mdiMagnify,
      search: '',
    };
  },
  methods: {
    searchProduct() {
      this.$emit('search', this.search);
    },
  },
};
</script>
