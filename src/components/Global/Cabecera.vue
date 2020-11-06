<template>
  <div>
    <v-container>
      <v-layout>
          <div class="absolute">
            <v-tooltip v-model="mostrarTooltip" bottom>
              <template v-slot:activator="{on, attrs}">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  icon
                  @click="cambiarTema"
                >
                  <v-icon >{{
                    $vuetify.theme.dark
                        ? mdiWhiteBalanceSunny
                        : mdiMoonWaningCrescent}}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{
                $vuetify.theme.dark
                    ? 'Activar modo Claro'
                    : 'Activar modo Oscuro'}}
              </span>
            </v-tooltip>
          </div>
        <v-row class="d-flex">
          <v-col cols="12" sm="6" :class="this.$vuetify.breakpoint.xs ? 'order-2' : ''">
            <Logo width="200"/>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" :class="this.$vuetify.breakpoint.xs ? 'pt-0' : ''">
            <div
              class="text-right"
              :class="this.$vuetify.breakpoint.xs
              ? 'text-center order-1'
              : ''"
            >
              <p
                :class="this.$vuetify.breakpoint.xs
                ? 'ma-0 body-1'
                : 'subtitle-1'"
                class="font-weight-medium">Megapromocionales LTDA</p>
              <p
                :class="this.$vuetify.breakpoint.xs
                ? 'ma-0 body-1'
                : 'subtitle-1'"
                class="font-weight-medium">Carrera 28 # 10 - 60 Local 137</p>
              <p
                :class="this.$vuetify.breakpoint.xs
                ? 'ma-0 body-1'
                : 'subtitle-1'"
                class="font-weight-medium">megapromocional@gmail.com</p>
              <p
                :class="this.$vuetify.breakpoint.xs
                ? 'ma-0 body-1'
                : 'subtitle-1'"
                class="font-weight-medium">
                <v-icon class="pb-1 ">{{ mdiWhatsapp }}</v-icon> 315 927 5144 |
                <v-icon class="pb-1 ml-2">{{ mdiWhatsapp }}</v-icon> 315 927 4144 |
                <v-icon class="pb-1 ml-2">{{ mdiWhatsapp }}</v-icon> 320 585 5531
              </p>
            </div>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      class="mt-5"
      shaped
      top
      text
      :color="
        $vuetify.theme.dark
            ? 'primary'
            : 'grey darken-4'
      "
    >
      {{ textSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Logo from '@/components/Global/Logo.vue';
import { mdiWhatsapp, mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';

export default {
  name: 'Cabecera',
  data() {
    return {
      mdiWhatsapp,
      mdiMoonWaningCrescent,
      mdiWhiteBalanceSunny,
      snackbar: false,
      textSnackbar: '',
      mostrarTooltip: false,
    };
  },
  methods: {
    cambiarTema() {
      if (this.$vuetify.theme.dark) {
        this.textSnackbar = 'Modo Claro Activado';
        this.snackbar = true;
        this.$vuetify.theme.dark = false;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      } else {
        this.textSnackbar = 'Modo Oscuro Activado';
        this.snackbar = true;
        this.$vuetify.theme.dark = true;
        localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
      }
    },
  },
  components: {
    Logo,
  },
};
</script>
