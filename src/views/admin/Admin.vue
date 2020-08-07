<template>
  <div class="mx-auto">
    <v-card class="mx-10">
      <v-card-actions>
        <v-btn
          color="success"
          large
          outlined
          class="ma-5"
          to="/admin/agregar-trabajo">
          Agregar Trabajo
        </v-btn>
      </v-card-actions>
      <v-divider class="mx-5"></v-divider>

      <v-container>
        <v-row class="fill-height">
          <v-col cols="12">
            <v-sheet height="64">
              <v-toolbar flat color="blue-grey darken-4">

                <v-btn outlined class="mr-4" @click="setToday">
                  Hoy
                </v-btn>
                <v-btn fab text small @click="prev">
                  <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small @click="next">
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      outlined
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Día</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Semana</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Mes</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 Días</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                locale="es-co"
                :short-weekdays="false"
                :short-months="false"
                :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="trabajosCalendario"
                :event-color="getEventColor"
                :event-margin-bottom="3"
                :now="today"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
              ></v-calendar>

              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    :color="trabajoSeleccionado.color"
                    dark
                  >
                    <v-btn icon @click="confirmarEliminarTrabajo(trabajoSeleccionado)">
                      <v-icon>{{mdiDelete}}</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="trabajoSeleccionado.name"></v-toolbar-title>
                    <v-spacer></v-spacer>

                    <p class="my-0 mx-2 text-decoration-underline">{{
                        trabajoSeleccionado.terminado
                            ? 'Trabajo Listo'
                            : 'Trabajo no terminado'}}</p>

                    <v-tooltip v-model="mostrarTooltip" bottom>
                      <template v-slot:activator="{on, attrs}">
                        <v-btn
                          v-on="on"
                          v-bind="attrs"
                          icon
                          color="white"
                          @click.prevent="terminado(trabajoSeleccionado)"
                        >
                          <v-icon class="white--text">{{
                            trabajoSeleccionado.terminado
                                ? mdiCheckCircleOutline
                                : mdiCloseCircleOutline}}
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        trabajoSeleccionado.terminado
                            ? 'Trabajo no termiando'
                            : 'Trabajo termiando'}}
                      </span>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <span class="black--text" v-html="trabajoSeleccionado.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      outlined
                      color="primary"
                      @click="selectedOpen = false"
                    >
                      Cancelar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  mdiDelete,
  mdiCloseCircleOutline,
  mdiCheckCircleOutline,
} from '@mdi/js';
import Swal from 'sweetalert2';
import db from '@/main';

export default {
  middleware: 'autenticado',
  name: 'Admin',
  layout: 'admin',
  data() {
    return {
      mdiDelete,
      mdiCloseCircleOutline,
      mdiCheckCircleOutline,
      mostrarTooltip: false,
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: 'month',
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        '4day': '4 Días',
      },
      start: null,
      end: null,
      trabajoSeleccionado: {},
      selectedElement: null,
      selectedOpen: false,
      name: null,
      details: null,
      color: '#1976D2',
      currentlyEditing: null,
    };
  },
  computed: {
    ...mapState(['trabajosCalendario']),
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return '';
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? '' : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? '' : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      // eslint-disable-next-line default-case
      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`;
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return '';
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'GMT', month: 'long',
      });
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.traerTrabajosCalendario();
  },
  methods: {
    ...mapActions(['traerTrabajosCalendario', 'eliminarTrabajoCalendario']),
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.trabajoSeleccionado = event;
        this.selectedElement = nativeEvent.target;
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.selectedOpen = true, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10];
    },
    confirmarEliminarTrabajo(trabajo) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, ¡eliminarlo!',
      }).then((result) => {
        if (result.value) {
          this.eliminarTrabajoCalendario(trabajo.id);
          Swal.fire(
            '¡Eliminado!',
            'El trabajo ha sido eliminado.',
            'success',
          );
          this.selectedOpen = false;
        }
      });
    },
    async terminado(trabajo) {
      if (trabajo.terminado) {
        await db.collection('trabajos').doc(trabajo.id).update({
          terminado: false,
        });
        await this.traerTrabajosCalendario();
        Swal.fire(
          '¡Sin terminar!',
          'El trabajo aún no está terminado.',
          'error',
        );
        this.selectedOpen = false;
        this.traerTrabajosCalendario();
      } else {
        await db.collection('trabajos').doc(trabajo.id).update({
          terminado: true,
        });
        await this.traerTrabajosCalendario();
        Swal.fire(
          '¡Terminado!',
          'El trabajo ha sido terminado.',
          'success',
        );
        this.selectedOpen = false;
        this.traerTrabajosCalendario();
      }
    },
  },
  created() {
    this.$store.commit('setLayout', 'adminLayout');
  },
};
</script>
