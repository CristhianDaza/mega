<template>
  <component :is="layout"></component>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AppMega',
  components: {
    adminLayout: () => import(/* webpackChunkName: "admin" */ '@/components/Layout/Admin.vue'),
    defaultLayout: () => import(/* webpackChunkName: "default" */ '@/components/Layout/Default.vue'),
  },
  computed: {
    ...mapState(['layout']),
  },
};
</script>
