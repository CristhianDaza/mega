import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '@/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: () => import(/* webpackChunkName: "inicio" */ '../views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    exact: true,
    component: () => import(/* webpackChunkName: "categorias" */ '../views/Categories.vue'),
  },
  {
    path: '/catalogs',
    name: 'Catalogs',
    exact: true,
    component: () => import(/* webpackChunkName: "catalogos" */ '../views/Catalogs.vue'),
  },
  {
    path: '/productos',
    name: 'product',
    exact: true,
    component: () => import(/* webpackChunkName: "producto" */ '../views/Productos.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    exact: true,
    component: () => import(/* webpackChunkName: "contacto" */ '../views/Contact.vue'),
  },
  {
    path: '/about-us',
    name: 'about',
    exact: true,
    component: () => import(/* webpackChunkName: "nosotros" */ '../views/AboutUs.vue'),
  },
  {
    path: '/search',
    name: 'search',
    exact: true,
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
  },
  {
    path: '/producto/:code',
    name: 'productoCodigo',
    exact: true,
    component: () => import(/* webpackChunkName: "productoCodigo" */ '../views/ProductoCodigo.vue'),
  },
  {
    path: '/portafolio',
    name: 'portafolioMega',
    exact: true,
    component: () => import(/* webpackChunkName: "portafolioMega" */ '../views/PortafolioMega.vue'),
  },
  {
    path: '/admin/login',
    name: 'Login',
    exact: true,
    component: () => import(/* webpackChunkName: "login" */ '../views/admin/Login.vue'),
  },
  {
    path: '/admin/',
    name: 'admin',
    exact: true,
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/ver/:id',
    name: 'ver-trabajo',
    exact: true,
    component: () => import(/* webpackChunkName: "verTrabajo" */ '../views/admin/trabajos/VerTrabajo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/editar/:id',
    name: 'editar-trabajo',
    exact: true,
    component: () => import(/* webpackChunkName: "editarTrabajo" */ '../views/admin/trabajos/EditarTrabajo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/agregar-trabajo',
    name: 'Agregar Trabajo',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarTrabajo" */ '../views/admin/AgregarTrabajo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/usuarios',
    name: 'Usuarios',
    exact: true,
    component: () => import(/* webpackChunkName: "usuarios" */ '../views/admin/usuarios/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/usuarios/agregar-usuario',
    name: 'Agregar Usuarios',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarUsuario" */ '../views/admin/usuarios/AgregarUsuario.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/carrusel',
    name: 'Carousel',
    exact: true,
    component: () => import(/* webpackChunkName: "carousel" */ '../views/admin/carousel/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/carrusel/agregar-carousel',
    name: 'Agregar Carousel',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarCarousel" */ '../views/admin/carousel/AgregarCarousel.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/catalogos',
    name: 'Catalogos Admin',
    exact: true,
    component: () => import(/* webpackChunkName: "catalogosAdmin" */ '../views/admin/catalogos/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/catalogos/agregar-catalogo',
    name: 'Agregar Catalogo',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarCatalogo" */ '../views/admin/catalogos/AgregarCatalogo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/videoPromocion',
    name: 'Video',
    exact: true,
    component: () => import(/* webpackChunkName: "videoPromocion" */ '../views/admin/videoPromocion/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/videoPromocion/agregar-video',
    name: 'Agregar Video',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarVideo" */ '../views/admin/videoPromocion/AgregarVideo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/productos-inicio',
    name: 'Productos Inicio',
    exact: true,
    component: () => import(/* webpackChunkName: "productoInicio" */ '../views/admin/productosInicio/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/productos-inicio/agregar-productos',
    name: 'Agregar Productos Inicio',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarProductos" */ '../views/admin/productosInicio/agregarProductos.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/productos-inicio/editar-producto/:id',
    name: 'Editar Productos Inicio',
    exact: true,
    component: () => import(/* webpackChunkName: "editarProducto" */ '../views/admin/productosInicio/editarProducto.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/menu-principal',
    name: 'Menu Principal',
    exact: true,
    component: () => import(/* webpackChunkName: "menuPrincipal" */ '../views/admin/menuPrincipal/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/menu-principal/agregar-menu',
    name: 'Agregar Menu Principal',
    exact: true,
    component: () => import(/* webpackChunkName: "agregarMenu" */ '../views/admin/menuPrincipal/agregarMenu.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/menu-principal/editar-menu/:id',
    name: 'Editar Menu Principal',
    exact: true,
    component: () => import(/* webpackChunkName: "editarMenu" */ '../views/admin/menuPrincipal/editarMenu.vue'),
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
