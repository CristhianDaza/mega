<template>
  <div>
    <v-container>
      <v-layout>
        <v-row class="d-flex">
          <v-col cols="12" sm="6" :class="{ 'order-2' : $vuetify.breakpoint.xs }">
            <Logo width="200"/>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" :class="{ 'pt-0' : $vuetify.breakpoint.xs }">
            <div
              class="text-right"
              :class="{ 'text-center order-1' : $vuetify.breakpoint.xs }"
            >
              <p
                v-for="{ id, nameIcon, name } in contacts"
                :key="id"
                :style="{color: $vuetify.theme.themes[theme].colorText }"
                :class="$vuetify.breakpoint.xs
                ? 'ma-0 body-1'
                : 'subtitle-1'"
                class="font-weight-medium">
                <v-icon
                  v-if="nameIcon"
                  class="pb-1 ml-2"
                  :style="{color: $vuetify.theme.themes[theme].colorText }">
                  {{ nameIcon }}
                </v-icon> {{ name }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { contacts } from '@/helpers/contact';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      contacts,
    };
  },
  components: {
    Logo: () => import(/* webpackChunkName: "logo" */ '@/components/Global/Logo.vue'),
  },
};
</script>
