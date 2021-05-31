<template>
  <component :is="layout"></component>
</template>
<script>
import { mapState } from 'vuex';
import adminLayout from '@/components/Layout/Admin.vue';
import defaultLayout from './components/Layout/Default.vue';

export default {
  components: {
    adminLayout,
    defaultLayout,
  },
  computed: {
    ...mapState(['layout']),
  },
};
</script>

<style>
body {
  font-family: 'Source Sans Pro', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Source Sans Pro', sans-serif;
}

body::-webkit-scrollbar {
  width: 9px;
}

 /* Estilos barra (thumb) de scroll */
body::-webkit-scrollbar-thumb {
  background: #0077bd;
  border-radius: 4px;
}

body::-webkit-scrollbar-thumb:active {
  background-color: rgb(15, 14, 164);
}

body::-webkit-scrollbar-thumb:hover {
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

 /* Estilos track de scroll */
body::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

body::-webkit-scrollbar-track:hover,
body::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}
  .tarjetaProductos.fondoCard.v-card.v-sheet.theme--light{
    background-color: rgba( 255, 255, 255, 0.25 ) !important;
  }
  .fondoCard.v-card.v-sheet.theme--light {
    background-color: rgba( 255, 255, 255, 0.25 ) !important;
  }
  .links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    list-style: none;
    margin: 0;
    padding: 18px 12px;
  }

  .links li {
    align-items: center;
    display: inline-flex;
    font-size: 14px;
  }
  .links__item {
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    transition: all .3s cubic-bezier(0.25, 0.8, 0.5, 1);
    color: white !important;
  }
  .links li:nth-child(2n){
    padding: 0 12px;
  }

  .links ul {
    padding: 0;
  }
</style>
