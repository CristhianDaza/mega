<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      :style="{color: $vuetify.theme.themes[theme].amarillo}"
      large outlined
      to="/admin/menu-principal/agregar-menu">
      Agregar Menú
    </v-btn>
    <v-divider class="my-5"></v-divider>
    <v-simple-table
      :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
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
          <tr v-for="menu in mainMenu" :key="menu.id" :class="`order-${menu.order}`">
            <td>{{ menu.name}}</td>
            <td>{{ menu.order }}</td>
            <td>{{ menu.link }}</td>
            <td class="text-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    :style="{color: $vuetify.theme.themes[theme].azul}"
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                    :to="`menu-principal/editar-menu/${menu.id}`"
                  >
                    <v-icon>{{mdiPencil}}</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    :style="{color: $vuetify.theme.themes[theme].textoError}"
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                    @click="confirmDeleteMenu(menu.id)"
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
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';
import { mdiDelete, mdiPencil } from '@mdi/js';
import layoutAdmin from '@/mixins/layoutAdmin';

export default {
  name: 'mainMenu',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiDelete,
      mdiPencil,
    };
  },
  metaInfo: {
    title: 'Menú Principal',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions('menu', ['getMainMenu', 'deleteMainMenu']),

    confirmDeleteMenu(id) {
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
          this.deleteMainMenu(id);
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
    ...mapGetters('menu', ['mainMenu']),
  },
  mounted() {
    this.getMainMenu();
  },
};
</script>
