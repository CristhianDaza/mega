<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      color="primary"
      large outlined
      to="/admin/productos-inicio/agregar-productos">
      Agregar Productos
    </v-btn>
    <v-divider class="my-3"></v-divider>
    <v-simple-table
      :style="{background: $vuetify.theme.themes.dark.basebackground}"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Etiqueta</th>
            <th class="text-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in titulos" :key="producto.uid">
            <td>{{producto.titulo}}</td>
            <td>{{producto.etiqueta}}</td>
            <td class="text-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                    :to="`productos-inicio/editar-producto/${producto.id}`"
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
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                    @click="confirmarEliminarProduto(producto.id)"
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
import layoutAdmin from '@/mixins/layoutAdmin';
import Swal from 'sweetalert2';
import { mdiDelete, mdiPencil } from '@mdi/js';

export default {
  name: 'productos-inicio',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiDelete,
      mdiPencil,
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
    ...mapActions(['traerProducto', 'eliminarProducto']),
    confirmarEliminarProduto(id) {
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
          this.eliminarProducto(id);
          Swal.fire(
            '¡Eliminada!',
            'El producto ha sido eliminado.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['titulos']),
  },
  mounted() {
    this.traerProducto();
  },
};
</script>
