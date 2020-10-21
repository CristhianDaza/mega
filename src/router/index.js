import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '@/firebase';

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
    name: 'productoCodigo',
    exact: true,
    component: () => import('../views/ProductoCodigo.vue'),
  },
  {
    path: '/admin/login',
    name: 'Login',
    exact: true,
    component: () => import('../views/admin/Login.vue'),
  },
  {
    path: '/admin/',
    name: 'Admin',
    exact: true,
    component: () => import('../views/admin/Admin.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/ver/:id',
    name: 'ver-trabajo',
    exact: true,
    component: () => import('../views/admin/trabajos/VerTrabajo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/editar/:id',
    name: 'editar-trabajo',
    exact: true,
    component: () => import('../views/admin/trabajos/EditarTrabajo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/agregar-trabajo',
    name: 'Agregar Trabajo',
    exact: true,
    component: () => import('../views/admin/AgregarTrabajo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/usuarios',
    name: 'Usuarios',
    exact: true,
    component: () => import('../views/admin/usuarios/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/usuarios/agregar-usuario',
    name: 'Agregar Usuarios',
    exact: true,
    component: () => import('../views/admin/usuarios/AgregarUsuario.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/carrusel',
    name: 'Carousel',
    exact: true,
    component: () => import('../views/admin/carousel/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/carrusel/agregar-carousel',
    name: 'Agregar Carousel',
    exact: true,
    component: () => import('../views/admin/carousel/AgregarCarousel.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/catalogos',
    name: 'Catalogos Admin',
    exact: true,
    component: () => import('../views/admin/catalogos/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/catalogos/agregar-catalogo',
    name: 'Agregar Catalogo',
    exact: true,
    component: () => import('../views/admin/catalogos/AgregarCatalogo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/imagen-info',
    name: 'Imagen Informartiva',
    exact: true,
    component: () => import('../views/admin/imagenInfo/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/imagen-info/agregar-imagen-info',
    name: 'Agregar Imagen Informativa',
    exact: true,
    component: () => import('../views/admin/imagenInfo/AgregarImagenInfo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/videoPromocion',
    name: 'Video',
    exact: true,
    component: () => import('../views/admin/videoPromocion/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/videoPromocion/agregar-video',
    name: 'Agregar Video',
    exact: true,
    component: () => import('../views/admin/videoPromocion/AgregarVideo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/productos-inicio',
    name: 'Productos Inicio',
    exact: true,
    component: () => import('../views/admin/productosInicio/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/productos-inicio/agregar-productos',
    name: 'Agregar Productos Inicio',
    exact: true,
    component: () => import('../views/admin/productosInicio/agregarProductos.vue'),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
