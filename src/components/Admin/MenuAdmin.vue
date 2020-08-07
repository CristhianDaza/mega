<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
    >
      <v-list dense>
        <v-list-item exact link to="/admin">
          <v-list-item-action>
            <v-icon>{{ mdiViewDashboard }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/usuarios">
          <v-list-item-action>
            <v-icon>{{ mdiAccountMultiple }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/carousel">
          <v-list-item-action>
            <v-icon>{{ mdiFileImage }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Imágenes Carousel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/catalogos">
          <v-list-item-action>
            <v-icon>{{ mdiBookOpenPageVariant }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Catálogos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/info">
          <v-list-item-action>
            <v-icon>{{ mdiInformation }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Imágenes Información</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <template v-if="this.$vuetify.breakpoint.xs">
        <v-app-bar-nav-icon class="white--text mx-2" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
      </template>
      <template v-else>

        <v-app-bar-nav-icon class="white--text mx-2" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
      </template>

      <v-spacer></v-spacer>

      <template v-if="this.$vuetify.breakpoint.xs">
        <v-btn  to="/" color="blue-grey darken-2" class="mr-2" icon>
          <v-icon>{{mdiHome}}</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn  to="/" color="blue-grey darken-2" class="mr-2">Ir a la página principal</v-btn>
      </template>

      <template v-if="this.$vuetify.breakpoint.xs">
        <v-btn  @click="cerrarSesion" color="error" icon>
          <v-icon>{{mdiLogout}}</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn @click="cerrarSesion" color="error">Cerrar Sesión</v-btn>
      </template>

    </v-app-bar>
  </div>
</template>

<script>
import {
  mdiViewDashboard,
  mdiFileImage,
  mdiBookOpenPageVariant,
  mdiAccountMultiple,
  mdiFormatListBulletedSquare,
  mdiInformation,
  mdiHome,
  mdiLogout,
} from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    drawer: true,
    mdiViewDashboard,
    mdiFileImage,
    mdiLogout,
    mdiHome,
    mdiBookOpenPageVariant,
    mdiAccountMultiple,
    mdiFormatListBulletedSquare,
    mdiInformation,
    usuarioActivo: '',
  }),
  methods: {
    ...mapActions(['cerrarSesion']),
  },
};
</script>
