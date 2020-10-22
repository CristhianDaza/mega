<template>
<!-- eslint-disable max-len -->
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" xl="6">
        <v-card class="elevation-12">
          <v-progress-linear
            color="light-blue"
            height="10"
            value="100"
            :indeterminate="loading"
          ></v-progress-linear>
          <v-card-title>Agregar Trabajo al Calendario</v-card-title>
          <v-form
            @submit.prevent="crearTrabajo({ name, details, start, end, color, asesor })"
          >
          <v-card-text>
            <v-text-field
              :prepend-icon="mdiCalendar"
              v-model="name"
              :rules="nameRules"
              type="text"
              label="Nombre Cliente"
              required
            ></v-text-field>

            <v-text-field
              :prepend-icon="mdiCalendarText"
              v-model="details"
              :rules="detailRules"
              label="Detalle del Trabajo"
              type="text"
              required
            ></v-text-field>

            <v-dialog
              ref="dialogInicio"
              v-model="modalInicio"
              :return-value.sync="start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start"
                  label="Inicio del Trabajo"
                  :prepend-icon="mdiCalendarClock"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="start" scrollable locale="es-co" :weekdays="[1, 2, 3, 4, 5, 6, 0]" color="primary">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalInicio = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogInicio.save(start)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-dialog
              ref="dialogFin"
              v-model="modalFin"
              :return-value.sync="end"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="end"
                  label="Entrega del Trabajo"
                  :prepend-icon="mdiCalendarClock"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="end" scrollable locale="es-co" :weekdays="[1, 2, 3, 4, 5, 6, 0]" color="primary">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalFin = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogFin.save(end)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-dialog
              ref="dialogColor"
              v-model="modalColor"
              :return-value.sync="color"
              persistent
              width="310px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="color"
                  label="Agregar un Color"
                  :prepend-icon="mdiFormatColorFill"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-card>
                <v-color-picker v-model="color" class="ma-2" hide-inputs>
                </v-color-picker>
                <v-spacer></v-spacer>
                <v-btn outlined color="primary" @click="modalColor = false">Cancelar</v-btn>
                <v-btn outlined color="primary" @click="$refs.dialogColor.save(color)">OK</v-btn>
              </v-card>
            </v-dialog>

            <v-select
              :items="listaUsuarios"
              item-text="name"
              item-value="value"
              :rules="asesorRules"
              label="Asesor"
              :prepend-icon="mdiAccountSupervisor"
              v-model="asesor"
              required
              return-object
            ></v-select>

            <p v-if="error" class="ma-2 error--text">Error, inténtelo de nuevo.</p>
          </v-card-text>
          <v-divider class="mx-4"> </v-divider>
          <v-card-actions>
            <v-btn color="success" type="submit" outlined :loading="loading">
              Crear Trabajo
            </v-btn>

            <v-btn text @click="$router.back()" outlined color="info" >
              Volver
            </v-btn>
          </v-card-actions>

        </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiCalendar,
  mdiCalendarText,
  mdiCalendarClock,
  mdiFormatColorFill,
  mdiAccountSupervisor,
} from '@mdi/js';
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import router from '@/router';
import { db } from '@/firebase';

export default {
  name: 'agregar-trabajo',
  data() {
    return {
      start: new Date().toISOString().substr(0, 10),
      modalInicio: false,
      end: new Date().toISOString().substr(0, 10),
      modalFin: false,
      modalColor: false,
      loading: false,
      mdiCalendar,
      mdiCalendarText,
      mdiCalendarClock,
      mdiFormatColorFill,
      mdiAccountSupervisor,
      name: '',
      details: '',
      color: '',
      asesor: { name: '', value: '' },
      nameRules: [
        (v) => !!v || 'El nombre del cliente es requerido',
      ],
      detailRules: [
        (v) => !!v || 'El detalle del trabajo es requerido',
      ],
      startRules: [
        (v) => !!v || 'El inicio del trabajo es requerido',
      ],
      endRules: [
        (v) => !!v || 'La entrega del trabajo es requerido',
      ],
      colorRules: [
        (v) => !!v || 'El color es requerido',
      ],
      asesorRules: [
        (v) => !!v || 'El rol es requerido',
      ],
      listaUsuarios: [],
    };
  },
  metaInfo: {
    title: 'Agregar Trabajo al Calendario',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  methods: {
    ...mapActions(['traerUsuarios']),
    async crearTrabajo(trabajo) {
      this.loading = true;
      const {
        name,
        details,
        start,
        end,
        color,
        asesor,
      } = trabajo;
      await db.collection('trabajos').add({
        name,
        details,
        start,
        end,
        color,
        asesor,
        terminado: false,
      })
        .then(() => {
          Swal.fire(
            '¡Creado!',
            'El trabajo ha sido creado.',
            'success',
          );
          router.push({
            path: '/admin/',
          });
        })
        .catch(() => {
          Swal.fire(
            '¡Error!',
            'Hubo un error, por favor intente de nuevo.',
            'error',
          );
        });
      this.loading = false;
    },
  },
  computed: {
    ...mapState(['error', 'usuarios']),
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
    this.usuarios.forEach((usuario) => {
      this.listaUsuarios.push({ name: usuario.nombre, value: usuario.nombre });
    });
  },
  mounted() {
    this.traerUsuarios();
    this.usuarios.forEach((usuario) => {
      this.listaUsuarios.push({ name: usuario.nombre, value: usuario.nombre });
    });
  },
};
</script>
