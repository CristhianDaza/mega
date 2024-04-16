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
      >COLOR</v-subheader>
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
import { mapActions } from 'vuex';

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
    ...mapActions('menu', ['getMainMenu', 'setSelectedMenu']),
    searchColor(color) {
      this.$router.push({
        query: {
          ...this.$route.query,
          color: color.id,
          page: 1,
        },
      });
      this.setSelectedMenu(this.$route.fullPath);
    },
  },
};
</script>
