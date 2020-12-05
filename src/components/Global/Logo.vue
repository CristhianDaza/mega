<template>
  <div>
    <router-link to="/">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo_navidad.png?alt=media&token=06dafa51-7cce-4da3-a3d1-716ba922fb9f"
        alt="Logotipo Megapromocionales"
        class="logo text-left"
        :class="this.$vuetify.breakpoint.xs ? 'mx-auto' : ''"
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
    </router-link>
  </div>
</template>

<script>
import Loader from '@/components/Global/Loader.vue';

export default {
  name: 'Logo',
  props: ['width'],
  components: {
    Loader,
  },
};
</script>
