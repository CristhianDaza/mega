<template>
  <!-- <div class="fondoServicio contenedorServicios"> -->
  <div
    :style="{background: '#ffcd17'}"
    class="contenedorServicios"
  >
    <v-container class="pb-10">
      <v-row>
        <v-col cols="12" class="mb-5 mt-16 headline">
          <h1 :style="{color: '#005C91'}"
          >NUESTROS SERVICIOS</h1>
        </v-col>

        <v-hover v-slot:default="{ hover }">
          <v-col cols="6" md="4" lg="3">
            <v-card class="fondoCard pa-3">
              <v-avatar class="avatar" size="80" tile>
                <v-icon :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                  {{mdiWaterOutline}}
                </v-icon>
              </v-avatar>
              <h2 :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                Tampografía
              </h2>
              <v-divider class="my-3"></v-divider>
              <p :style="{color: '#005C91'}">
                <!-- eslint-disable-next-line max-len -->
                La tampografía es uno de los métodos más usados para la impresión y marca de productos. Básicamente, funciona mediante la transferencia de una imagen de marca desde una placa de impresión a través de y sobre un objeto determinado de una manera repetitiva.
              </p>
            </v-card>
          </v-col>
        </v-hover>

        <v-hover v-slot:default="{ hover }">
          <v-col cols="6" md="4" lg="3">
            <v-card class="fondoCard pa-3">
              <v-avatar class="avatar" size="80" tile>
                <v-icon :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                  {{mdiUmbrellaOutline}}
                </v-icon>
              </v-avatar>
              <h2 :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                Screen
              </h2>
              <v-divider class="my-3"></v-divider>
              <p :style="{color: '#005C91'}">
                <!-- eslint-disable-next-line max-len -->
                Es un procedimiento de impresión utilizado para hacer reproducciones de arte o anuncios, que consiste en filtrar los colores a través de una trama de seda, mientras que se recubren con una cola impermeabilizadora las partes que no deben filtrar.
              </p>
            </v-card>
          </v-col>
        </v-hover>

        <v-hover v-slot:default="{ hover }">
          <v-col cols="6" md="4" lg="3">
            <v-card class="fondoCard pa-3">
              <v-avatar class="avatar" size="80" tile>
                <v-icon :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                  {{mdiLaserPointer}}
                </v-icon>
              </v-avatar>
              <h2 :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                Láser
              </h2>
              <v-divider class="my-3"></v-divider>
              <p :style="{color: '#005C91'}">
                <!-- eslint-disable-next-line max-len -->
                El grabado láser es la remoción del material desde la superficie superior hasta una profundidad determinada. Es un método rápido, ya que el material se elimina con cada pulsación del láser. La profundidad de las marcas se controla variando el número de pasadas del láser sobre la superficie.
              </p>
            </v-card>
          </v-col>
        </v-hover>

        <v-hover v-slot:default="{ hover }">
          <v-col cols="6" md="4" lg="3">
            <v-card class="fondoCard pa-3">
              <v-avatar class="avatar" size="80" tile>
                <v-icon :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                  {{mdiCoffeeOutline}}
                </v-icon>
              </v-avatar>
              <h2 :style="{color: '#005C91'}" :class="{ 'change-color': hover }">
                Sublimación
              </h2>
              <v-divider class="my-3"></v-divider>
              <p :style="{color: '#005C91'}">
                <!-- eslint-disable-next-line max-len -->
                La sublimación es una novedosa técnica de impresión digital -y de nueva generación- con la que es posible personalizar diferentes tipos de prendas y objetos mediante la transferencia de una imagen impresa. Se puede hacer sobre prendas textiles o sobre superficies de madera, lienzo tratado, cartón o ceramicas.
              </p>
            </v-card>
          </v-col>
        </v-hover>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  mdiWaterOutline,
  mdiUmbrellaOutline,
  mdiCoffeeOutline,
  mdiLaserPointer,
} from '@mdi/js';

export default {
  name: 'servicios',
  data() {
    return {
      mdiWaterOutline,
      mdiUmbrellaOutline,
      mdiCoffeeOutline,
      mdiLaserPointer,
      transparent: 'rgba(255, 255, 255, 0)',
    };
  },
};
</script>

<style>
  .titleService {
    color: rgba(255, 255, 255, 0);
  }
  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
  .color-ico {
    color: #0077bd !important;
  }
  .change-color {
    color: white !important;
  }
  .fondoServicio {
    background: red;
    border: 1px solid white;
    border-radius: 10px;
  }
</style>
