<template>
  <div class="mt-5 servicios">
    <v-container>
      <v-row>
        <v-col cols="12" class="white--text text-center mb-5 mt-0">
          <h1>Nuestros Servicios</h1>
        </v-col>
        <v-hover v-slot:default="{ hover }">
          <v-col class="text-center" cols="6" md="4" lg="3">
            <v-avatar class="avatar" size="80" tile>
              <v-icon class="color-ico" :class="{ 'change-color': hover }">
                {{mdiWaterOutline}}
              </v-icon>
            </v-avatar>
            <v-divider dark class="mx-16 my-3"></v-divider>
            <h2 class="titleService" :class="{ 'show-btns': hover }">
              Tampografía
            </h2>
          </v-col>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-col class="text-center" cols="6" md="4" lg="3">
            <v-avatar class="avatar" size="80" tile>
              <v-icon class="color-ico" :class="{ 'change-color': hover }">
                {{mdiUmbrellaOutline}}
              </v-icon>
            </v-avatar>
            <v-divider dark class="mx-16 my-3"></v-divider>
            <h2 class="titleService" :class="{ 'show-btns': hover }">
              Screen
            </h2>
          </v-col>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-col class="text-center" cols="6" md="4" lg="3">
            <v-avatar class="avatar" size="80" tile>
              <v-icon class="color-ico" :class="{ 'change-color': hover }">
                {{mdiLaserPointer}}
              </v-icon>
            </v-avatar>
            <v-divider dark class="mx-16 my-3"></v-divider>
            <h2 class="titleService" :class="{ 'show-btns': hover }">Láser</h2>
          </v-col>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-col class="text-center" cols="6" md="4" lg="3">
            <v-avatar class="avatar" size="80" tile>
              <v-icon class="color-ico" :class="{ 'change-color': hover }">
                {{mdiCoffeeOutline}}
              </v-icon>
            </v-avatar>
            <v-divider dark class="mx-16 my-3"></v-divider>
            <h2 class="titleService" :class="{ 'show-btns': hover }">
              Sublimación
            </h2>
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
  .servicios {
    background: #050b1f;
  }
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
</style>
