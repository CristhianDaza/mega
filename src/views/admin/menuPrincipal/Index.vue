<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      color="primary"
      large outlined
      to="/admin/menu-principal/agregar-menu">
      Agregar Menú
    </v-btn>
    <v-divider class="my-3"></v-divider>
    <v-simple-table
      :style="{background: $vuetify.theme.themes.dark.basebackground}"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Orden</th>
            <th>Link</th>
            <th class="text-right">Acción</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="menu in menus" :key="menu.uid" :class="`order-${menu.orden}`">
            <td>{{menu.nombre}}</td>
            <td>{{menu.orden}}</td>
            <td>{{menu.link}}</td>
            <td class="text-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                    @click="confirmarEliminarMenu(menu.id)"
                  >
                    <v-icon>{{mdiDelete}}</v-icon>
                  </v-btn>
                </template>
                <span>Eliminar</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Swal from 'sweetalert2';
import { mdiDelete } from '@mdi/js';

export default {
  name: 'productos-inicio',
  data() {
    return {
      mdiDelete,
    };
  },
  metaInfo: {
    title: 'Productos Inicio',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerMenus', 'eliminarMenu']),
    confirmarEliminarMenu(id) {
      Swal.fire({
        title: '¿Estas segur@?',
        text: '¡No se podrá revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, ¡eliminarlo!',
      }).then((result) => {
        if (result.value) {
          this.eliminarMenu(id);
          Swal.fire(
            '¡Eliminado!',
            'El menú ha sido eliminado.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['menus']),
  },
  mounted() {
    this.traerMenus();
  },
  created() {
    this.traerMenus();
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
