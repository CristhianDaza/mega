import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    exact: true,
    component: () => import('../views/Inicio.vue'),
  },
  {
    path: '/catalogos',
    name: 'Catalogos',
    exact: true,
    component: () => import('../views/Catalogos.vue'),
  },
  {
    path: '/contacto',
    name: 'Contacto',
    exact: true,
    component: () => import('../views/Contacto.vue'),
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    exact: true,
    component: () => import('../views/Nosotros.vue'),
  },
  {
    path: '/buscar',
    name: 'Buscar',
    exact: true,
    component: () => import('../views/Buscar.vue'),
  },
  {
    path: '/producto/:codigo',
    name: 'productoCodugo',
    exact: true,
    component: () => import('../views/ProductoCodigo.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
