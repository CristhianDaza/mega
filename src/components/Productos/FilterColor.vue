<template>
  <v-card
    :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
    class="mt-5"
    shaped
    elevation="3"
  >
    <v-list
      :style="{ background: $vuetify.theme.themes[theme].fondoTarjeta }"
      dense
    >
      <v-subheader
        :style="{ color: $vuetify.theme.themes[theme].colorText }"
      >Filtrar por color</v-subheader>
      <v-list-item-group>
        <v-card-subtitle class="d-flex flex-wrap pt-0">
          <div v-for="color in colorList" :key="color.id">
            <mp-color
              :color="color"
              pointer
              @filterColor="searchColor"
            />
          </div>
        </v-card-subtitle>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'FilterColor',
  components: {
    MpColor: () => import(/* webpackChunkName: "MpColor" */ '@/components/UI/Mp-Color.vue'),
  },
  props: {
    colorList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    searchColor(color) {
      this.$router.push({
        query: {
          ...this.$route.query,
          color,
          page: 1,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
