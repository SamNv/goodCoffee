<template>
  <v-app id="app">
    <component :is="this.$route.name == 'AdminPage' ? 'AdminHeader': 'Header'"></component>
    <v-main class="mt-12">
      <router-view />
    </v-main>
    <transition name="slide-fade" appear>
      <GlobalToast :key="toastIndex" />
    </transition>
    <Audio v-if="this.$route.name == 'HomePage'" />
    <v-footer class="footer">
      <!-- TODO 音楽の操作を実施する -->
      <!-- <v-btn @click="toggleAudio()" class="primary">Play</v-btn> -->
      <!-- <audio id="audio-player" class="ma-auto d-none" autoplay loop controls>
        <source src="https://www.mboxdrive.com/cafe.mp3" type="audio/mpeg" />
      </audio> -->
      <div class="text-center font-weight-medium w-100 grey--text">
        PBL研修のプロジェクト - 2021/01
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import GlobalToast from "./packs/components/GlobalToast";
import i18n from "./packs/plugins/i18n";
import Header from "./packs/components/shared/Header";
import AdminHeader from "./packs/components/shared/AdminHeader";
import Audio from "./packs/components/home/Audio";

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
  computed: {
    toastIndex() {
      return this.$store.getters["toast/index"];
    },
    // isNotAdminPage(){
    //   return this.$route.name != 'AdminPage'
    // }
  },
  components: {
    GlobalToast,
    Header,
    AdminHeader,
    Audio,
  },
  methods: {
    toggleAudio: function() {
      var audio = document.getElementById("audio-player");
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  #audio-player {
    border-radius: 999px;
    border: 2px solid rgb(143, 107, 107);
    &:focus {
      outline: none;
    }
  }
  .w {
    &-100 {
      width: 100%;
    }
    &-50 {
      width: 50%;
    }
    &-25 {
      width: 25%;
    }
  }
  .h {
    &-100 {
      width: 100%;
    }
    &-50 {
      width: 50%;
    }
    &-25 {
      width: 25%;
    }
  }
}

p {
  margin-bottom: 0 !important;
}

.clickable {
  cursor: pointer;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar--hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar--hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter{
  transform: translateX(50px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
