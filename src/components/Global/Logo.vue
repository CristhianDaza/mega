<template>
  <div>
    <div @click="$router.push({ name: 'home' })">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685"
        alt="Logotipo Megapromocionales"
        class="logo text-left pointer"
        :class="{ 'mx-auto' : this.$vuetify.breakpoint.xs }"
        contain
        :width="width"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <Loader />
          </v-row>
        </template>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoComponent',
  props: ['width'],
  components: {
    Loader: () => import(/* webpackChunkName: "loader" */ '@/components/Global/Loader.vue'),
  },
};
</script>
