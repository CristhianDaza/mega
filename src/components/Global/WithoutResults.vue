<template>
  <div class="template-error">
    <v-icon class="iconAlert">
      {{mdiAlert}}
    </v-icon>
    <h2
      class="text-center mt-2 ml-2"
    >
      {{ errorMessage }}
    </h2>
    <p
      class="text-center mt-5 mb-2 colorBlue font-weight-bold"
      @click="$router.push({ name: 'product' })"
      v-if="returnPage"
    >
      <span class="pointer">Volver</span>
    </p>
    <p
      class="text-center mt-5 mb-2 colorBlue font-weight-bold"
      @click="searchProducts"
      v-else
    >
      <span class="pointer">Cargar productos</span>
    </p>
  </div>
</template>

<script>
import { mdiAlert } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WithoutResults',
  props: {
    returnPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mdiAlert,
    };
  },
  methods: {
    ...mapActions('products', ['setProducts', 'clearProducts']),
    async searchProducts() {
      this.clearProducts();
      await this.setProducts();
    },
  },
  computed: {
    ...mapGetters('products', ['getMessageError']),
    errorMessage() {
      if (this.getMessageError === 'ERR_NETWORK') {
        return 'No se pudo conectar con el servidor, vuelve a intentarlo más tarde.';
      }
      if (this.getMessageError === 'ERR_REQUEST_TIMEOUT') {
        return 'La conexión con el servidor ha expirado, vuelve a intentarlo más tarde.';
      }
      if (this.getMessageError === 'ERR_RESPONSE_INVALID') {
        return 'La respuesta del servidor es inválida, vuelve a intentarlo más tarde.';
      }
      if (this.getMessageError === 'ERR_REQUEST_NOT_FOUND') {
        return 'No se encontraron productos.';
      }
      if (this.getMessageError === 'ERR_REQUEST_UNAUTHORIZED') {
        return 'No tienes permisos para ver los productos.';
      }
      return 'Ocurrió un error, vuelve a intentarlo más tarde.';
    },
  },
};
</script>

<style lang="scss" scoped>
.iconAlert {
  width: 100%;
}

span {
  transition: all .5s ease;
}

span.pointer:hover {
  color: #2B2B2B;
}

span.v-icon__svg {
  color: green;
}

.template-error {
  margin: 20px auto 60px;
}
</style>
