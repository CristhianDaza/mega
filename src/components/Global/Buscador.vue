<template>
  <v-text-field
    v-model="busqueda"
    v-on:keyup.enter="buscarProducto(busqueda)"
    @click:prepend-inner="buscarProducto(busqueda)"
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
import router from '@/router';
import Swal from 'sweetalert2';
import {
  mdiMagnify,
} from '@mdi/js';

export default {
  name: 'Buscador',
  data() {
    return {
      mdiMagnify,
      busqueda: '',
    };
  },
  methods: {
    buscarProducto(busqueda) {
      const buscar = document.getElementById('buscador');
      if (busqueda.trim() === '') {
        Swal.fire(
          '¡Error!',
          'La busqueda no puede ir vacía.',
          'error',
        );
        return;
      }
      if (busqueda.trim().length < 3) {
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
      buscar.blur();
    },
  },
};
</script>
