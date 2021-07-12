<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'container'">
    <v-btn
      color="primary"
      large outlined
      to="/admin/usuarios/agregar-usuario">
      Agregar Usuario
    </v-btn>
    <v-divider class="my-3"></v-divider>
    <v-simple-table
      :style="{background: $vuetify.theme.themes.dark.basebackground}"
    >
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import layoutAdmin from '@/mixins/layoutAdmin';
import Swal from 'sweetalert2';
import { auth } from '@/firebase';

export default {
  name: 'usuarios',
  mixins: [layoutAdmin],
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
            'El usuario ha sido eliminado. Ingresar a la base de datos para eliminar el inicio de sesión.',
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
};
</script>
