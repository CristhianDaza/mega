<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      :style="[
        {background: $vuetify.theme.themes[theme].fondoTarjeta},
        {color: $vuetify.theme.themes[theme].colorText}
      ]"
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

        <v-list-item link to="/admin/menu-principal">
          <v-list-item-action>
            <v-icon>{{ mdiMenu }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Menú Principal</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/productos-inicio">
          <v-list-item-action>
            <v-icon>{{ mdiCart }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Productos Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/carrusel">
          <v-list-item-action>
            <v-icon>{{ mdiFileImage }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Imágenes Carrusel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/admin/videoPromocion">
          <v-list-item-action>
            <v-icon>{{ mdiYoutube }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Video Principal</v-list-item-title>
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

        <v-list-item link to="/admin/usuarios">
          <v-list-item-action>
            <v-icon>{{ mdiAccountMultiple }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

<!--        <v-list-item link to="/admin/imagen-info">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>{{ mdiInformation }}</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Imágenes Boletín</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
    >
      <template v-if="this.$vuetify.breakpoint.xs">
        <v-app-bar-nav-icon class="white--text mx-2" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
      </template>
      <template v-else>

        <v-app-bar-nav-icon class="white--text mx-2" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title v-if="usuario !== null">Admin - {{usuario.email}}</v-toolbar-title>
      </template>

      <v-spacer></v-spacer>

      <template v-if="this.$vuetify.breakpoint.xs">
        <v-btn
          @click="toHome()"
          :style="{background: $vuetify.theme.themes[theme].azul}" class="mr-2" icon>
          <v-icon>{{mdiHome}}</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
         @click="toHome()"
         :style="{background: $vuetify.theme.themes[theme].azul}"
          class="mr-2">Volver</v-btn>
      </template>

      <template v-if="this.$vuetify.breakpoint.xs">
        <v-btn
        :style="{background: $vuetify.theme.themes[theme].textoError}"
         @click="cerrarSesion"
         icon
        >
          <v-icon>{{mdiLogout}}</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
        :style="{background: $vuetify.theme.themes[theme].textoError}"
        @click="cerrarSesion"
        >Cerrar Sesión</v-btn>
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
  mdiYoutube,
  mdiCart,
  mdiMenu,
} from '@mdi/js';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'MenuAdmin',
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
    mdiYoutube,
    mdiCart,
    mdiMenu,
  }),
  methods: {
    ...mapActions(['cerrarSesion', 'setPathToAdmin']),
    toHome() {
      if (this.pathToAdmin) {
        this.$router.push({ path: this.pathToAdmin });
        this.setPathToAdmin(null);
        return;
      }
      this.$router.push({ name: 'home' });
    },
  },
  computed: {
    ...mapState(['usuario', 'pathToAdmin']),
  },
};
</script>
