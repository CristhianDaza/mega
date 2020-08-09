<template>
<!-- eslint-disable max-len -->
  <v-main>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-19">
            <v-container class="fill-height" fluid>
              <v-row
                class="mt-5"
                align="center"
                justify="center">
                <Logo width="300"/>
              </v-row>
            </v-container>

            <v-form
              @submit.prevent="ingresarUsaurio({email, password})"
              v-model="valid"
              >
              <v-card-text>
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
                  autocomplete="on"
                  required
                ></v-text-field>
              </v-card-text>
              <p
                v-if="error == 'The password is invalid or the user does not have a password.'"
                class="ma-2 error--text">La contraseña no es válida o el usuario no tiene una contraseña.</p>
              <p
                v-else-if="error == 'Too many unsuccessful login attempts. Please try again later.'"
                class="ma-2 error--text">Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.</p>
              <p
                v-else-if="error == 'There is no user record corresponding to this identifier. The user may have been deleted.'"
                class="ma-2 error--text">Correo Electrónico no válido</p>
              <p
                v-else-if="error == 'The user account has been disabled by an administrator.'"
                class="ma-2 error--text">La cuenta de usuario ha sido deshabilitada por un administrador.</p>
              <p v-else-if="error" class="ma-2 error--text">Error del sistema, inténtelo de nuevo más tarde. </p>
              <v-divider class="mx-4"> </v-divider>
              <v-card-actions>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  type="submit"
                >
                  Iniciar Sesión
                </v-btn>

                <v-btn
                  text
                  to="/"
                  color="info"
                >
                  Volver al Inicio
                </v-btn>
              </v-card-actions>

            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Logo from '@/components/Global/Logo.vue';
import {
  mdiAt,
  mdiLock,
  mdiEye,
  mdiEyeOff,
} from '@mdi/js';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    mostrar: false,
    mdiAt,
    mdiLock,
    mdiEye,
    mdiEyeOff,
    valid: true,
    password: '',
    passwordRules: [
      (v) => !!v || 'La contraseña es requerida',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'El correo electrónico es requerido',
      (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
    ],
  }),
  metaInfo: {
    title: 'Inicio de Sesión',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  components: {
    Logo,
  },
  methods: {
    ...mapActions(['ingresarUsaurio']),
  },
  computed: {
    ...mapState(['error']),
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
