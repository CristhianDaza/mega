<template>
  <v-text-field
    v-model="busqueda"
    v-on:keyup.enter="buscarProducto(busqueda)"
    @click:prepend-inner="buscarProducto(busqueda)"
    clearable
    class="mt-1 mx-2"
    placeholder="Buscar"
    :prepend-inner-icon="mdiMagnify"
    outlined
    rounded
    filled
    dense
    dark
    hide-details="auto"
  ></v-text-field>
</template>

<script>
import router from '@/router';
import Swal from 'sweetalert2';
import {
  mdiMagnify,
} from '@mdi/js';

export default {
  data() {
    return {
      mdiMagnify,
      busqueda: '',
    };
  },
  methods: {
    buscarProducto(busqueda) {
      if (busqueda === '') {
        Swal.fire(
          '¡Error!',
          'La busqueda no puede ir vacía.',
          'error',
        );
        return;
      }
      if (busqueda.length < 3) {
        Swal.fire(
          '¡Error!',
          'La busqueda debe contener al menos 3 caracteres.',
          'error',
        );
        return;
      }
      router.push({
        path: '/buscar',
        query: {
          busqueda,
        },
      });
      this.busqueda = '';
    },
  },
};
</script>
