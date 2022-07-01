<template>
  <v-container fluid>
    <v-btn
      :style="{color: $vuetify.theme.themes[theme].amarillo}"
      large
      outlined
      to="/admin/agregar-trabajo">
      Agregar Trabajo
    </v-btn>
    <v-divider class="my-5"></v-divider>

    <v-row>
        <v-col cols="12">
          <v-card :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}">
            <v-card-title>
              Trabajos
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar Trabajo"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
              :headers="headers"
              :items="trabajosCalendario"
              :items-per-page="10"
              :search="search"
              class="elevation-1"
              :sort-by="['end']"
              :sort-desc="[true]"
            >
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-sheet height="64">
            <v-toolbar
              :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
              flat>
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
              :style="{background: $vuetify.theme.themes[theme].fondoTarjeta}"
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
                  <v-toolbar-title>{{ trabajoSeleccionado.name }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        color="white"
                        v-bind="attrs"
                        v-on="on"
                        @click="selectedOpen = false"
                      >
                        <v-icon>{{ mdiCloseCircleOutline }}</v-icon>
                      </v-btn>
                    </template>
                    <span>Cerrar</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-actions
                  :class="trabajoSeleccionado.terminado === false ? 'black--text' : 'siTerminado' "
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        :style="{color: $vuetify.theme.themes[theme].azul}"
                        v-bind="attrs"
                        v-on="on"
                        :to="{name: 'ver-trabajo', params: { id: trabajoSeleccionado.id } }"
                      >
                        <v-icon>{{ mdiEye }}</v-icon>
                      </v-btn>
                    </template>
                    <span>Ver Trabajo</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :to="{name: 'editar-trabajo', params: { id: trabajoSeleccionado.id } }"
                        icon
                        color="success"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>{{ mdiPencil }}</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar Trabajo</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        color="error"
                        v-bind="attrs"
                        v-on="on"
                        @click="confirmarEliminarTrabajo(trabajoSeleccionado)"
                      >
                        <v-icon>{{ mdiDelete }}</v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar Trabajo</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                  <div>
                    {{trabajoSeleccionado.terminado === false
                          ? 'Trabajo sin Terminar'
                          : 'Trabajo Terminado'}}
                  </div>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  mdiDelete,
  mdiCloseCircleOutline,
  mdiCheckCircleOutline,
  mdiPencil,
  mdiEye,
  mdiCancel,
} from '@mdi/js';
import Swal from 'sweetalert2';
import layoutAdmin from '@/mixins/layoutAdmin';

export default {
  name: 'AdminView',
  mixins: [layoutAdmin],
  data() {
    return {
      mdiDelete,
      mdiPencil,
      mdiEye,
      mdiCancel,
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
      headers: [
        { text: 'Ciente', sortable: false, value: 'name' },
        { text: 'Asesor', value: 'asesor.name' },
        { text: 'Detalles', sortable: false, value: 'details' },
        { text: 'Fecha Inicio', value: 'start' },
        { text: 'Fecha de Entrega', value: 'end' },
        { text: 'Estado', value: 'terminado' },
      ],
      search: '',
    };
  },
  metaInfo: {
    title: 'Admin',
    titleTemplate: '%s | Megapromocionales LTDA',
    meta: [
      { charset: 'utf8' },
      { name: 'robots', content: 'noindex' },
    ],
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
        title: '¿Estas segur@?',
        text: '¡No se podrá revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si. ¡Eliminar!',
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
  },
};
</script>

<style>
  .siTerminado {
    background: darkgreen;
  }
  .siTerminadoBoton {
    color: darkgreen !important;
  }
</style>
