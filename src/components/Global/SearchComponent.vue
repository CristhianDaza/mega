<template>
  <v-text-field
    v-model="search"
    v-on:keyup.enter="searchItem(search)"
    @click:prepend-inner="searchItem(search)"
    clearable
    label="Buscar"
    :prepend-inner-icon="mdiMagnify"
    outlined
    dense
    hide-details="auto"
    id="buscador"
    color="amarillo"
    dark
    class="d-flex align-center ml-2"
  ></v-text-field>
</template>

<script>
import Swal from 'sweetalert2';
import { mdiMagnify } from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  name: 'SearchComponent',
  data() {
    return {
      mdiMagnify,
      search: '',
    };
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    searchItem(searchItem) {
      const search = document.getElementById('buscador');
      if (searchItem.trim() === '') {
        this.alertError('isEmpty');
        return;
      }
      if (searchItem.trim().length < 3) {
        this.alertError('lessCharacters');
        return;
      }
      this.$router.push({
        name: 'search',
        query: {
          searchItem,
        },
      });
      this.search = '';
      search.blur();
      this.setSelectedMenu(this.$route.fullPath);
    },
    alertError(info) {
      const isEmpty = 'La busqueda no puede ir vacía.';
      const lessCharacters = 'La busqueda debe contener al menos 3 caracteres.';
      Swal.fire(
        '¡Error!',
        info === 'isEmpty' ? isEmpty : lessCharacters,
        'error',
      );
    },
  },
};
</script>
