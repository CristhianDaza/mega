<template>
  <div
    :style="{color: 'white'}"
    class="insta text-center">
    <div class="pa-5">
      <v-container>
        <v-row>
          <v-col>
            <v-avatar size="80" tile>
              <v-icon color="white">{{mdiInstagram}}</v-icon>
            </v-avatar>
            <h1>Instagram</h1>
            <h3 class="pa-0">@megapromocional</h3>
            <v-btn outlined large :style="{color: 'white'}" class="mt-5">
              <a href="https://www.instagram.com/megapromocional/" :style="{color: 'white'}" target="_blank">
                Síguenos
                <v-icon class="ml-2">{{mdiOpenInNew}}</v-icon>
              </a>
            </v-btn>
          </v-col>
          <v-col>
            <v-avatar size="80" tile>
              <v-icon color="white">{{mdiFacebook}}</v-icon>
            </v-avatar>
            <h1>Facebook</h1>
            <h3 class="pa-0">Mega Promocionales</h3>
            <v-btn outlined large :style="{color: 'white'}" class="mt-5">
              <a href="https://www.facebook.com/Mega-Promocionales-242144370051788/" :style="{color: 'white'}" target="_blank">
                Síguenos
                <v-icon class="ml-2">{{mdiOpenInNew}}</v-icon>
              </a>
            </v-btn>
          </v-col>
          <v-col>
            <v-avatar size="80" tile>
              <v-icon color="white">{{mdiGmail}}</v-icon>
            </v-avatar>
            <h1>Gmail</h1>
            <h3 class="pa-0">megapromocional@gmail.com</h3>
            <v-btn outlined large :style="{color: 'white'}" class="mt-5">
              <a href="https://www.instagram.com/megapromocional/" :style="{color: 'white'}" target="_blank">
                Síguenos
                <v-icon class="ml-2">{{mdiOpenInNew}}</v-icon>
              </a>
            </v-btn>
          </v-col>
          <v-col>
            <v-avatar size="80" tile>
              <v-icon color="white">{{mdiWhatsapp}}</v-icon>
            </v-avatar>
            <h1>WhatsApp</h1>
            <h3 class="pa-0">315 927 5144 | 315 927 4144 </h3>
            <v-btn outlined large :style="{color: 'white'}" class="mt-5">
              <a href="https://www.instagram.com/megapromocional/" :style="{color: 'white'}" target="_blank">
                Síguenos
                <v-icon class="ml-2">{{mdiOpenInNew}}</v-icon>
              </a>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-len */
import {
  mdiInstagram,
  mdiOpenInNew,
  mdiFacebook,
  mdiGmail,
  mdiWhatsapp,
} from '@mdi/js';

export default {
  name: 'instagram',
  data() {
    return {
      mdiInstagram,
      mdiOpenInNew,
      mdiFacebook,
      mdiGmail,
      mdiWhatsapp,
    };
  },
};
</script>

<style>
  /* .insta {
    background-image: radial-gradient(circle, #005f96, #0063ae, #0065c4, #0066da, #1b65ed);
  } */
</style>
