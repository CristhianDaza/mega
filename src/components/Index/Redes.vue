<template>
  <div
    class="text-center">
    <v-container>
      <v-row class="my-3">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="red in redes"
          :key="red.id"
        >
          <a :href="red.http" target="_blank">
            <v-card
              class="pa-5"
              :style="red.style"
            >
              <v-avatar size="50" tile>
                <v-icon color="white">{{ red.icono }}</v-icon>
              </v-avatar>
              <h2 class="white--text h6">{{ red.nombre }}</h2>
              <h3 class="white--text pa-0 subtitle-1">{{ red.url }}</h3>
            </v-card>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import redes from '@/utils/redes';

export default {
  name: 'redes',
  data() {
    return {
      redes,
    };
  },
};
</script>
