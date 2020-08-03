<template>
  <div>
    <router-link to="/">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo.png?alt=media&token=08967fdf-f5b0-4782-8571-e3391abd3c5b"
        lazy-src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logo_opt.png?alt=media&token=b1b44e4c-cf39-4784-963f-82d49d981e93"
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
            <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: ['width'],
};
</script>
