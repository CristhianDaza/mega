<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class=" mb-5">
      <v-col cols="12" sm="6" class="px-10">
        <h1
          :style="{color: $vuetify.theme.themes[theme].colorText }"
          :class="this.$vuetify.breakpoint.xs ? 'title' : 'headline'">
          MANTENTE EN CONTACTO CON NOSOTROS
        </h1>
        <p :style="{ color: $vuetify.theme.themes[theme].colorText }">
          Visitanos en nuestro almacén, también nos puedes escribir por WhatsApp,
          correo electrónico o envíanos un mensaje por medio del formulario de contacto. 🤝🏼
        </p>
        <v-container>

          <v-row>
            <v-col cols="2">
              <v-avatar>
                <v-icon
                :style="{ color: $vuetify.theme.themes[theme].amarillo }">{{mdiMapMarker}}</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''">
                Centro Nacional de Artes Gráficas
              </p>
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''"><a href="https://www.google.com/maps/place/Megapromocionales/@4.609466,-74.0949077,17z/data=!3m1!4b1!4m5!3m4!1s0x8e3f998d474cd877:0x65ee5ebb4dd5eb1d!8m2!3d4.609466!4d-74.092719" target="_blankn">Carrera 28 # 10 - 60</a></p>
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''">Local 137</p>
            </v-col>
          </v-row>

          <v-divider class="my-5"></v-divider>

          <v-row>
            <v-col cols="2">
              <v-avatar>
                <v-icon
                :style="{ color: $vuetify.theme.themes[theme].amarillo }">{{mdiCellphone}}</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''"><a href="https://api.whatsapp.com/send?phone=573159275144&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=" target="_blank">315 927 41 44</a></p>
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''"><a href="https://api.whatsapp.com/send?phone=573159274144&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=" target="_blank">315 927 51 44</a></p>
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''"><a href="https://api.whatsapp.com/send?phone=573205855531&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=" target="_blank">320 585 55 31</a></p>
            </v-col>
          </v-row>

          <v-divider class="my-5"></v-divider>

          <v-row>
            <v-col cols="2">
              <v-avatar>
                <v-icon
                :style="{ color: $vuetify.theme.themes[theme].amarillo }">{{mdiEmail}}</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0 emails" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''">
                <a href="mailto:megapromocional@gmail.com" target="_blank">
                  megapromocional@gmail.com
                </a>
              </p>
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0 emails" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''">
                <a href="mailto:ventas@megapromocionales.com.co" target="_blank">
                  ventas@megapromocionales.com.co
                </a>
              </p>
              <p
              :style="{ color: $vuetify.theme.themes[theme].colorText }"
              class="mb-0 emails" :class="this.$vuetify.breakpoint.xs ? 'body-2' : ''">
                <a href="mailto:contacto@megapromocionales.com.co" target="_blank">
                  contacto@megapromocionales.com.co
                </a>
              </p>
            </v-col>
          </v-row>

        </v-container>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
        >
          <v-card-title>
            <h1
              :class="this.$vuetify.breakpoint.xs ? 'title' : 'headline'  "
              class="mx-auto"
              :style="{ color: $vuetify.theme.themes[theme].azul }"
            >
              FORMULARIO DE CONTACTO
            </h1>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <v-form ref="form" v-model="valid" @submit.prevent="enviarEmail">
            <v-card-text class="px-12">
              <v-text-field
                :prepend-icon="mdiAccount"
                type="text"
                label="Nombre"
                required
                :counter="20"
                :rules="nombreRules"
                v-model="nombre"
                name="nombre"></v-text-field>
              <v-text-field
                :prepend-icon="mdiEmailNewsletter"
                type="text"
                label="Asunto"
                required
                :counter="30"
                :rules="asuntoRules"
                v-model="asunto"
                name="asunto"></v-text-field>
              <v-text-field
                :prepend-icon="mdiCellphoneAndroid"
                type="number"
                label="Teléfono"
                required
                :counter="12"
                :rules="telefonoRules"
                v-model="telefono"
                name="telefono"></v-text-field>
              <v-text-field
                :prepend-icon="mdiEmail"
                type="email"
                label="Correo electrónico"
                required
                :rules="correoRules"
                v-model="correo"
                name="correo"></v-text-field>
              <v-textarea
                :prepend-icon="mdiForum"
                type="text"
                label="Mensaje"
                required
                :counter="255"
                :rules="mensajeRules"
                v-model="mensaje"
                name="mensaje"
                hint="Deja tu mensaje, responderemos lo mas pronto posible."></v-textarea>
              <v-btn
                type="submit"
                class="mt-5"
                color="white"
                outlined
                block
                :loading="loading"
                :disabled="!valid"
              >
                Enviar Mensaje
              </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiAccount,
  mdiForum,
  mdiEmail,
  mdiEmailNewsletter,
  mdiCellphoneAndroid,
  mdiMapMarker,
  mdiCellphone,
} from '@mdi/js';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default {
  name: 'FormularioContacto',
  data() {
    return {
      mdiAccount,
      mdiForum,
      mdiEmail,
      mdiEmailNewsletter,
      mdiCellphoneAndroid,
      mdiMapMarker,
      mdiCellphone,
      loading: false,
      valid: true,
      nombre: '',
      asunto: '',
      telefono: '',
      correo: '',
      mensaje: '',
      nombreRules: [
        (v) => !!v || 'El nombre es obligatorio',
        (v) => v.length <= 20 || 'El nombre debe tener menos de 20 caracteres.',
      ],
      asuntoRules: [
        (v) => !!v || 'El asunto es obligatorio',
        (v) => v.length <= 30 || 'El asunto debe tener menos de 30 caracteres.',
      ],
      correoRules: [
        (v) => !!v || 'El correo es obligatorio',
        (v) => /.+@.+/.test(v) || 'Debe ser un correo valido',
      ],
      mensajeRules: [
        (v) => !!v || 'El mensaje es obligatorio',
        (v) => v.length <= 255 || 'El mensaje debe tener menos de 255 caracteres.',
      ],
      telefonoRules: [
        (v) => !!v || 'El teléfono es obligatorio',
        (v) => v.length <= 12 || 'El asunto debe tener menos de 12 caracteres.',
      ],
    };
  },
  methods: {
    async enviarEmail(e) {
      this.loading = true;
      try {
        await emailjs.sendForm('gmail', 'mensaje', e.target, 'user_QZ3P3PxF6RJOhN3BLfZdg')
          .then(() => {
            Swal.fire(
              '¡Enviado!',
              'El mensaje ha sido enviado correctamente.',
              'success',
            );
          }, () => {
            Swal.fire(
              '¡Error!',
              'Hubo un error, intente de nuevo',
              'error',
            );
          });
      } catch (error) {
        Swal.fire(
          '¡Error!',
          'Hubo un error, intente de nuevo',
          'error',
        );
      } finally {
        this.loading = false;
        this.nombre = '';
        this.asunto = '';
        this.telefono = '';
        this.correo = '';
        this.mensaje = '';
      }
    },
  },
};
</script>

<style scoped>
  a {
    color: inherit !important;
  }
  .emails {
    word-break: break-all;
  }
</style>
