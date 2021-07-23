<template>
  <component :is="layout"></component>
</template>
<script>
import { mapState } from 'vuex';
import adminLayout from '@/components/Layout/Admin.vue';
import defaultLayout from './components/Layout/Default.vue';

export default {
  name: 'App',
  components: {
    adminLayout,
    defaultLayout,
  },
  computed: {
    ...mapState(['layout']),
  },
};
</script>
