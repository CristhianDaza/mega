<template>
  <div
    :style="{backgroundColor: $vuetify.theme.themes[theme].secondary}"
    class="contenedorServicios"
  >
    <v-container class="pb-10">
      <v-row>
        <v-col cols="12" class="mb-5 mt-16 headline">
          <h1
            :style="{color: $vuetify.theme.themes[theme].colorText}"
          >NUESTROS SERVICIOS</h1>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="servicio in servicios"
          :key="servicio.id"
          class="mt-5"
        >
          <v-card
            class="pa-5 text-center servicio"
            :class="$vuetify.theme.dark ? 'servicioDark' : 'servicioLight'"
            :style="{background: $vuetify.theme.themes[theme].secondary}"
          >
            <v-avatar class="avatar" size="80" tile>
              <v-icon
                :style="{color: $vuetify.theme.themes[theme].colorText}"
              >
                {{ servicio.icono }}
              </v-icon>
            </v-avatar>
            <v-divider class="mx-10 my-2"></v-divider>
            <h2
              :style="{color: $vuetify.theme.themes[theme].colorText}"
            >
              {{ servicio.titulo }}
            </h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import servicios from '@/utils/servicios';

export default {
  name: 'servicios',
  data() {
    return {
      servicios,
    };
  },
};
</script>

<style>
.servicio {
  transition: all .5s cubic-bezier(0.215, 0.610, 0.355, 1);
  opacity: 1;
}

.servicioLight {
  border-radius: 50px !important;
  box-shadow:  7px 7px 14px #d6ac13,
              -7px -7px 14px #ffee1b !important;
}

.servicioDark {
  border-radius: 50px !important;
  box-shadow:  7px 7px 14px #04080a,
              -7px -7px 14px #060a0e !important;
}

.servicio:hover {
  transform: scale(1.1);
  z-index: 10;
}
</style>
