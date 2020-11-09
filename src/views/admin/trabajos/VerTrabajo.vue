<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" xl="6">
        <v-card
          :style="{background: $vuetify.theme.themes.dark.basebackground}"
        >
          <v-progress-linear
            :color="trabajoCalendario.color"
            height="10"
            value="100"
          ></v-progress-linear>
          <v-card-title>
            {{trabajoCalendario.name}}
          </v-card-title>
          <v-card-subtitle>
            {{trabajoCalendario.asesor.name}}
          </v-card-subtitle>
          <v-card-text>
            {{trabajoCalendario.details}}
          </v-card-text>
          <v-card-text>
            <p>Fecha de Inicio: {{ trabajoCalendario.start }}</p>
            <p>Fecha de entrega: {{ trabajoCalendario.end }}</p>
            <p
              class="subtitle-1 d-inline-block"
              :class="trabajoCalendario.terminado === false
                        ? 'noTerminardoBorder'
                        : 'siTerminardoBorder'"
            >
              {{trabajoCalendario.terminado === false
                        ? 'Trabajo sin Terminar'
                        : 'Trabajo Terminado'}}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" outlined @click="confimarTerminado(trabajoCalendario)">
              {{trabajoCalendario.terminado === false
                        ? 'Terminar Trabajo'
                        : 'Trabajo no Listo'}}
            </v-btn>

            <v-btn text @click="$router.back()" outlined color="error" >
              Volver
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Swal from 'sweetalert2';
import { db } from '@/firebase';
import router from '@/router';

export default {
  name: 'trabajo',
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(['traerTrabajoCalendario']),
    async confimarTerminado(trabajo) {
      if (trabajo.terminado) {
        await db.collection('trabajos').doc(trabajo.id).update({
          terminado: false,
        });
        Swal.fire(
          '¡Sin terminar!',
          'El trabajo aún no está terminado.',
          'error',
        );
        router.push({
          path: '/admin/',
        });
      } else {
        await db.collection('trabajos').doc(trabajo.id).update({
          terminado: true,
        });
        Swal.fire(
          '¡Terminado!',
          'El trabajo ha sido terminado.',
          'success',
        );
        router.push({
          path: '/admin/',
        });
      }
    },
  },
  computed: {
    ...mapState(['trabajoCalendario']),
  },
  mounted() {
    this.traerTrabajoCalendario(this.id);
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>

<style>
  .noTerminardoBorder {
    border-bottom: darkred 1px solid;
  }
  .siTerminardoBorder {
    border-bottom: darkgreen 1px solid;
  }
</style>
