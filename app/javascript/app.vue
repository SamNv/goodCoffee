<template>
  <v-app id="app">
    <Header/>
    <v-main class="mt-12">
      <router-view />
      <v-btn @click="showError()">Show Error</v-btn>
      <v-btn @click="show()">Show</v-btn>
    </v-main >
    <GlobalToast />
  </v-app>
</template>

<script>
import GlobalToast from "./packs/components/GlobalToast";
import i18n from "./packs/plugins/i18n";
import Header from "./packs/components/shared/Header"
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
    Header
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
}

p {
  margin-bottom : 0 !important;
}

.clickable{
  cursor: pointer;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar--hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar--hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
