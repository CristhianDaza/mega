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
    path: '/categorias',
    name: 'Categorias',
    exact: true,
    component: () => import('../views/Categorias.vue'),
  },
  {
    path: '/catalogos',
    name: 'Catalogos',
    exact: true,
    component: () => import('../views/Catalogos.vue'),
  },
  {
    path: '/productos',
    name: 'Productos',
    exact: true,
    component: () => import('../views/Productos.vue'),
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
    component: () => import('../views/Productos.vue'),
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
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
