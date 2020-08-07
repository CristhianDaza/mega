<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" xl="6">
        <v-card class="elevation-12">
          <v-progress-linear
            color="light-blue"
            height="10"
            value="100"
          ></v-progress-linear>
          <v-card-title>Agregar Usuario</v-card-title>
          <v-form
            @submit.prevent="crearUsuario({email, password, nombre, rol, })"
          >
          <v-card-text>
            <v-text-field
              :prepend-icon="mdiAt"
              v-model="nombre"
              :rules="nombreRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-select
              :items="roles"
              :rules="rolesRules"
              label="Rol"
              :prepend-icon="mdiAccountSupervisor"
              v-model="rol"
              item-text="rol"
              item-value="valor"
              required
            ></v-select>

            <v-text-field
              :prepend-icon="mdiAt"
              v-model="email"
              :rules="emailRules"
              label="Correo Elctrónico"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :prepend-icon="mdiLock"
              :append-icon="mostrar ? mdiEye : mdiEyeOff"
              @click:append="mostrar = !mostrar"
              :type="mostrar ? 'text' : 'password'"
              :rules="passwordRules"
              label="Contraseña"
              required
            ></v-text-field>

            <v-text-field
              v-model="password2"
              :prepend-icon="mdiLock"
              :append-icon="mostrar ? mdiEye : mdiEyeOff"
              @click:append="mostrar = !mostrar"
              :type="mostrar ? 'text' : 'password'"
              :rules="passwordRules"
              label="Repetir Contraseña"
              required
            ></v-text-field>
            <p v-if="error" class="ma-2 error--text">Error, inténtelo de nuevo.</p>
          </v-card-text>
          <v-divider class="mx-4"> </v-divider>
          <v-card-actions>
            <v-btn :disabled="!desactivar" color="success" type="submit" outlined>
              Crear Usuario
            </v-btn>

            <v-btn text @click="$router.back()" outlined color="info" >
              Volver
            </v-btn>
          </v-card-actions>

        </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiAt,
  mdiLock,
  mdiEye,
  mdiEyeOff,
  mdiAccountSupervisor,
} from '@mdi/js';
import { mapActions, mapState } from 'vuex';

export default {
  middleware: 'autenticado',
  name: 'usuarios',
  layout: 'admin',
  data() {
    return {
      mostrar: false,
      mdiAt,
      mdiLock,
      mdiAccountSupervisor,
      mdiEye,
      mdiEyeOff,
      nombre: '',
      email: '',
      password: '',
      password2: '',
      rol: '',
      roles: [
        { rol: 'Administrador', valor: 'Administrador' },
        { rol: 'Asesor', valor: 'Asesor' },
        { rol: 'Cliente', valor: 'Cliente' },
      ],
      nombreRules: [
        (v) => !!v || 'El nombre es requerido',
      ],
      passwordRules: [
        (v) => !!v || 'La contraseña es requerida',
      ],
      rolesRules: [
        (v) => !!v || 'El rol es requerido',
      ],
      emailRules: [
        (v) => !!v || 'El correo electrónico es requerido',
        (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
      ],
    };
  },
  methods: {
    ...mapActions(['crearUsuario']),
  },
  computed: {
    ...mapState(['error']),
    desactivar() {
      return this.password === this.password2 && this.password !== '';
    },
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
