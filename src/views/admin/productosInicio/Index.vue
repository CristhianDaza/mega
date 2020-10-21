<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      color="success"
      large outlined
      to="/admin/productos-inicio/agregar-productos">
      Agregar Productos
    </v-btn>
    <v-divider class="my-3"></v-divider>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Etiqueta</th>
            <th class="text-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.uid">
            <td>{{producto.titulo}}</td>
            <td>{{producto.etiqueta}}</td>
            <td class="text-right">Eliminar</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'productos-inicio',
  metaInfo: {
    title: 'Productos Inicio',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerProducto']),
  },
  computed: {
    ...mapState(['productos']),
  },
  mounted() {
    this.traerProducto();
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
