<template>
  <div
    :style="{color: $vuetify.theme.themes.dark.basetexto}"
    class="mt-5 pa-8 insta text-center">
    <v-container>
      <v-avatar size="80" tile>
        <v-icon dark>{{mdiInstagram}}</v-icon>
      </v-avatar>
      <h1>Instagram</h1>
      <p class="mb-0">Síguenos en nuestro Instagram como</p>
      <h3 class="pa-0">@megapromocional</h3>
      <v-btn outlined primary large class="mt-5">
        <a href="https://www.instagram.com/megapromocional/" target="_blank">
          Síguenos
          <v-icon class="ml-2">{{mdiOpenInNew}}</v-icon>
        </a>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable max-len */
import { mdiInstagram, mdiOpenInNew } from '@mdi/js';

export default {
  name: 'instagram',
  data() {
    return {
      mdiInstagram,
      mdiOpenInNew,
    };
  },
};
</script>

<style>
  .insta {
    background: rgba(64,93,230,1);
    background: -moz-linear-gradient(top, rgba(64,93,230,1) 0%, rgba(88,81,219,1) 10%, rgba(131,58,180,1) 20%, rgba(193,53,132,1) 30%, rgba(225,48,108,1) 40%, rgba(253,29,29,1) 50%, rgba(245,96,64,1) 60%, rgba(247,119,55,1) 70%, rgba(252,175,69,1) 80%, rgba(255,220,128,1) 90%, rgba(255,220,128,1) 91%, rgba(255,220,128,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(64,93,230,1)), color-stop(10%, rgba(88,81,219,1)), color-stop(20%, rgba(131,58,180,1)), color-stop(30%, rgba(193,53,132,1)), color-stop(40%, rgba(225,48,108,1)), color-stop(50%, rgba(253,29,29,1)), color-stop(60%, rgba(245,96,64,1)), color-stop(70%, rgba(247,119,55,1)), color-stop(80%, rgba(252,175,69,1)), color-stop(90%, rgba(255,220,128,1)), color-stop(91%, rgba(255,220,128,1)), color-stop(100%, rgba(255,220,128,1)));
    background: -webkit-linear-gradient(top, rgba(64,93,230,1) 0%, rgba(88,81,219,1) 10%, rgba(131,58,180,1) 20%, rgba(193,53,132,1) 30%, rgba(225,48,108,1) 40%, rgba(253,29,29,1) 50%, rgba(245,96,64,1) 60%, rgba(247,119,55,1) 70%, rgba(252,175,69,1) 80%, rgba(255,220,128,1) 90%, rgba(255,220,128,1) 91%, rgba(255,220,128,1) 100%);
    background: -o-linear-gradient(top, rgba(64,93,230,1) 0%, rgba(88,81,219,1) 10%, rgba(131,58,180,1) 20%, rgba(193,53,132,1) 30%, rgba(225,48,108,1) 40%, rgba(253,29,29,1) 50%, rgba(245,96,64,1) 60%, rgba(247,119,55,1) 70%, rgba(252,175,69,1) 80%, rgba(255,220,128,1) 90%, rgba(255,220,128,1) 91%, rgba(255,220,128,1) 100%);
    background: -ms-linear-gradient(top, rgba(64,93,230,1) 0%, rgba(88,81,219,1) 10%, rgba(131,58,180,1) 20%, rgba(193,53,132,1) 30%, rgba(225,48,108,1) 40%, rgba(253,29,29,1) 50%, rgba(245,96,64,1) 60%, rgba(247,119,55,1) 70%, rgba(252,175,69,1) 80%, rgba(255,220,128,1) 90%, rgba(255,220,128,1) 91%, rgba(255,220,128,1) 100%);
    background: linear-gradient(to bottom, rgba(64,93,230,1) 0%, rgba(88,81,219,1) 10%, rgba(131,58,180,1) 20%, rgba(193,53,132,1) 30%, rgba(225,48,108,1) 40%, rgba(253,29,29,1) 50%, rgba(245,96,64,1) 60%, rgba(247,119,55,1) 70%, rgba(252,175,69,1) 80%, rgba(255,220,128,1) 90%, rgba(255,220,128,1) 91%, rgba(255,220,128,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#405de6', endColorstr='#ffdc80', GradientType=0 );
  }
</style>
