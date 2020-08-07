<template>
  <v-card class="mx-10">
    <v-card-actions>
      <v-btn
        color="success"
        large outlined
        class="ma-5"
        to="/admin/usuarios/agregar-usuario">
        Agregar Usuario
      </v-btn>
    </v-card-actions>
    <v-divider class="mx-5"></v-divider>

    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th class="text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.uid">
              <th>{{usuario.nombre}}</th>
              <th>{{usuario.email}}</th>
              <th>{{usuario.rol}}</th>
              <th class="text-right">
                <v-btn
                  color="info"
                  outlined
                  @click.prevent="cambiarPass(usuario.email)"
                  class="mr-3"
                >
                    Cambiar Contraseña
                  </v-btn>
                <v-btn
                  color="error"
                  outlined
                  @click="confirmarEliminarUsuario(usuario.id)">
                    Eliminar
                  </v-btn>
              </th>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Swal from 'sweetalert2';
import { auth } from '@/firebase.js';

export default {
  name: 'usuarios',
  metaInfo: {
    title: 'Usuarios',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerUsuarios', 'eliminarUsuario']),
    cambiarPass(email) {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          Swal.fire(
            '¡Enviado!',
            'Mensaje de cambio de contraseña enviado correctamente.',
            'success',
          );
        })
        .catch(() => {
          Swal.fire(
            'Error!',
            'Hubo un error, intente nuevamente.',
            'error',
          );
        });
    },
    confirmarEliminarUsuario(id) {
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
          this.eliminarUsuario(id);
          Swal.fire(
            '¡Eliminada!',
            'El usuario ha sido eliminado. Ingresar a la base de datos para eliminar el inisio de sesión.',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapState(['usuarios']),
  },
  mounted() {
    this.traerUsuarios();
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
