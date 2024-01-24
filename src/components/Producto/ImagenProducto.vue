<template>
  <div>
    <img
      v-if="imagenPrincipalMediana === ''"
      class="fotoTarjeta border-black elevation-5"
      @click.stop="dialog = true"
      :src="producto.imagenes[0].imagen.file_md"
      :alt="producto.descripcion_comercial"
    />
    <img
      v-else
      class="fotoTarjeta border-black elevation-5"
      @click.stop="dialog = true"
      :src="imagenPrincipalMediana"
      :alt="producto.descripcion_comercial"
    />
      <p
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        class="mt-5 font-weight-bold text-body-2"
      >
        El color de los artículos pueden variar según la calibración y resolución de la pantalla.
      </p>
    <v-card-actions v-if="producto.etiquetas.length > 0">
      <v-row>
        <template>
          <div
            v-for="label in producto.etiquetas"
            :key="label.id"
            @click="filterLabel(label)"
          >
            <img
              width="100px"
              class="pointer"
              :src="label.imagen.file_sm"
              :alt="label.nombre"
            >
          </div>
        </template>
      </v-row>
    </v-card-actions>
    <div v-if="producto.caracteristicas.length > 0" class="mt-8">
      <h2
        class="h6"
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        >
          Características:
        </h2>
      <v-row class="ml-1">
        <div v-for="caracteristica in producto.caracteristicas" :key="caracteristica.id">
          <v-tooltip top>
            <template v-slot:activator="{on, attrs}">
              <img
                class="imagenCaracteristica"
                :src="caracteristica.imagen"
                v-on="on"
                v-bind="attrs"
                :alt="caracteristica.nombre"
                @click.stop="mostrarTextoInfo(caracteristica.descripcion)">
            </template>
            <span>{{caracteristica.nombre}}</span>
          </v-tooltip>
        </div>
      </v-row>
    </div>
    <v-card
      :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
      v-if="this.textoInfo !== ''" class="mt-5 elevation-10">
      <v-card-text class="pb-0">
        <p
          :style="{ color: $vuetify.theme.themes[theme].colorText }"
        >{{textoInfo}}</p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn
        :style="{ color: $vuetify.theme.themes[theme].azul }"
        block outlined small @click="cerrarTextoInfo">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="700"
      :overlay-color="this.$vuetify.theme.dark ? 'blue-grey darken-4' : 'grey darken-4'"
      overlay-opacity="0.9"
    >
      <v-btn dark icon class="float-right mr-5" color="white" @click.stop="dialog = false">
        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
      </v-btn>
      <v-img
        v-if="imagenPrincipalGrande === ''" :src="producto.imagenes[0].imagen.file"
        max-width="100%"
        width="100%"
        cover
        :alt="producto.descripcion_comercial"
      />
      <v-img
        v-else
        :src="imagenPrincipalGrande"
        max-width="100%"
        width="100%"
        cover
        :alt="producto.descripcion_comercial"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiCloseCircleOutline } from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  name: 'ImagenProducto',
  data() {
    return {
      textoInfo: '',
      dialog: false,
      mdiCloseCircleOutline,
    };
  },
  props: ['producto', 'imagenPrincipalMediana', 'imagenPrincipalGrande', 'inventarioDisponible'],
  methods: {
    ...mapActions('menu', ['setSelectedMenu']),
    mostrarTextoInfo(texto) {
      this.textoInfo = texto;
    },
    cerrarTextoInfo() {
      this.textoInfo = '';
    },
    filterLabel(label) {
      this.$router.push({
        path: '/productos',
        query: {
          page: 1,
          label: label.id,
          title: label.nombre,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
  },
};
</script>

<style>

  .fotoTarjeta {
    width: 100%;
    max-width: 100%;
    cursor: zoom-in;
  }

  .imagenCaracteristica {
   width: 80px;
   cursor: pointer;
   margin-top: 15px;
  }

  .border-black {
    border: 2px solid rgb(197, 197, 197);
    border-radius: 10px;
  }
</style>
