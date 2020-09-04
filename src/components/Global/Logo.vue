<template>
  <div>
    <router-link to="/">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/opt_logo.webp?alt=media&token=2e13ac36-784c-463a-a094-fa665516fffe"
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
