<template>
  <v-snackbar v-model="toast" :color="color" :timeout="timeout" left>
    {{ message }}
    <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="hide"
        >
          {{ $t("common.close") }}
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    message() {
      return this.$store.getters["toast/message"];
    },
    color() {
      return this.$store.getters["toast/color"];
    },
    timeout() {
      return this.$store.getters["toast/timeout"];
    },
    toast: {
      set() {
        this.$store.dispatch("toast/hide");
      },
      get() {
        return this.message.length > 0;
      },
    },
  },
  methods: {
    hide() {
      this.$store.dispatch("toast/hide");
    },
  },
};
</script>

<style lang="scss" scoped></style>
