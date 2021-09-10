<template>
  <component :is="layout"></component>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    adminLayout: () => import(/* webpackChunkName: "Admin" */ '@/components/Layout/Admin.vue'),
    defaultLayout: () => import(/* webpackChunkName: "Default" */ '@/components/Layout/Default.vue'),
  },
  computed: {
    ...mapState(['layout']),
  },
};
</script>
