import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/Inicio.vue'),
  },
  {
    path: '/catalogos',
    name: 'Catalogos',
    component: () => import('../views/Catalogos.vue'),
  },
  {
    path: '/producto/:codigo',
    name: 'productoCodugo',
    component: () => import('../views/ProductoCodigo.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
