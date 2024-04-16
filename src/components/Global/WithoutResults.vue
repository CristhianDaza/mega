<template>
  <div>
    <v-icon class="iconAlert">
      {{mdiAlert}}
    </v-icon>
    <h2
      class="text-center mt-2 ml-2"
    >
      Sin resultados
    </h2>
    <p
      class="text-center mt-5 mb-2 colorBlue font-weight-bold"
      @click="searchProducts('products')"
    >
      <span class="pointer">Ver productos</span>
    </p>
    <p
      class="text-center mt-0 colorBlue  font-weight-bold"
      @click="searchProducts('categories')"
    >
      <span class="pointer">Ver categorias</span>
    </p>
  </div>
</template>

<script>
import { mdiAlert } from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  name: 'WithoutResults',
  data() {
    return {
      mdiAlert,
    };
  },
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    searchProducts(goTo) {
      this.$router.push({ path: goTo === 'categories' ? '/categories' : '/productos' });
      this.setSelectedMenu(this.$route.fullPath);
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
</style>
