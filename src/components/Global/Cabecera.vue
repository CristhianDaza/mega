<template>
  <div>
    <v-container>
      <v-layout>
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
  </div>
</template>

<script>
import Logo from '@/components/Global/Logo.vue';
import { mdiWhatsapp } from '@mdi/js';

export default {
  name: 'Cabecera',
  data() {
    return {
      mdiWhatsapp,
    };
  },
  components: {
    Logo,
  },
};
</script>
