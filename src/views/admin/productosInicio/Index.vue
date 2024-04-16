<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      :style="{color: $vuetify.theme.themes[theme].amarillo}"
      large outlined
      to="/admin/productos-inicio/agregar-productos"
      :disabled="productHome.length === 1"
    >
      Agregar Producto
    </v-btn>
    <v-divider class="my-5"></v-divider>
    <v-simple-table
      v-if="productHome.length > 0"
      :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
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
          <tr v-for="product in productHome" :key="product.uid">
            <td>{{product.title}}</td>
            <td>{{product.label}}</td>
            <td class="text-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    :style="{color: $vuetify.theme.themes[theme].azul}"
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                    :to="`productos-inicio/editar-producto/${product.id}`"
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
                    @click="confirmDeleteProduct(product.id)"
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
    ...mapActions('homeProduct', ['getProductHome', 'deleteProductHome']),
    confirmDeleteProduct(id) {
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
          this.deleteProductHome(id);
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapGetters('homeProduct', ['productHome']),
  },
  mounted() {
    this.getProductHome();
  },
};
</script>
