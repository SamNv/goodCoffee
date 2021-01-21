<template>
  <v-app>
    <v-content class="mt-md-6">
      <router-view />
      <v-btn @click="showError()">Show Error</v-btn>
      <v-btn @click="show()">Show</v-btn>
    </v-content>
    <GlobalToast />
  </v-app>
</template>

<script>
import GlobalToast from "@/components/GlobalToast";
import i18n from "@/plugins/i18n";

export default {
  name: "App",
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
  components: {
    GlobalToast,
  },
  methods: {
    show() {
      this.$store.dispatch("toast/show", {
        message: i18n.t("common.saved"),
      });
    },
    showError(){
      this.$store.dispatch("toast/showError", {
        message: i18n.t("common.saved"),
      });
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
