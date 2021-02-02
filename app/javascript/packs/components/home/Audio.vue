<template>
  <div class="audioPlayer">
    <div class="audioPlayerUI" :class="{ isDisabled: isPlaylistActive }">
      <div class="albumDetails">
        <p class="title">
          {{ musicPlaylist[currentSong].title }}
        </p>
        <p class="artist">
          {{ musicPlaylist[currentSong].artist }}
        </p>
      </div>

      <div class="playerButtons">
        <a
          class="button"
          :class="{ isDisabled: currentSong == 0 }"
          v-on:click="prevSong()"
          title="Previous Song"
        >
          <v-icon large> mdi-skip-previous-outline </v-icon>
        </a>
        <a class="button play" v-on:click="playAudio()" title="Play/Pause Song">
          <v-icon large :key="1">
            {{
              currentlyStopped
                ? "mdi-stop-circle-outline"
                : currentlyPlaying
                ? "mdi-pause-circle-outline"
                : "mdi-play-circle-outline"
            }}
          </v-icon>
        </a>
        <a
          class="button"
          :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
          v-on:click="nextSong()"
          title="Next Song"
        >
          <v-icon large> mdi-skip-next-outline </v-icon>
        </a>
      </div>

      <div class="current-time-container text-center">
        <span class="currentTime">{{ currentTime | fancyTimeFormat }}</span>
        <span class="totalTime"> {{ trackDuration | fancyTimeFormat }}</span>
      </div>

      <v-progress-linear
        color="grey darken-2"
        rounded
        :value="currentProgressBar"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    audio: "",
    imgLoaded: false,
    currentlyPlaying: false,
    currentlyStopped: false,
    currentTime: 0,
    checkingCurrentPositionInTrack: "",
    trackDuration: 0,
    currentProgressBar: 0,
    isPlaylistActive: false,
    currentSong: 0,
    musicPlaylist: [
      {
        title: "Meadowlark",
        artist: "Daniel Simion",
        url: "https://www.mboxdrive.com/cafe.mp3",
      },
      {
        title: "Hyena Laughing",
        artist: "Daniel Simion",
        url: "https://www.mboxdrive.com/cafe1.mp3",
      },
    ],
    audioFile: "",
  }),
  mounted: function() {
    this.changeSong();
    this.audio.loop = false;
  },
  filters: {
    fancyTimeFormat: function(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    },
  },
  methods: {
    nextSong: function() {
      if (this.currentSong < this.musicPlaylist.length - 1)
        this.changeSong(this.currentSong + 1);
    },
    prevSong: function() {
      if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
    },
    changeSong: function(index) {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;
      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }
      this.audioFile = this.musicPlaylist[this.currentSong].url;
      this.audio = new Audio(this.audioFile);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function() {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying) {
        this.playAudio();
      }
    },
    isCurrentSong: function(index) {
      if (this.currentSong == index) {
        return true;
      }
      return false;
    },
    getCurrentSong: function(currentSong) {
      return this.musicPlaylist[currentSong].url;
    },
    playAudio: function() {
      if (
        this.currentlyStopped == true &&
        this.currentSong + 1 == this.musicPlaylist.length
      ) {
        this.currentSong = 0;
        this.changeSong();
      }
      if (!this.currentlyPlaying) {
        this.getCurrentTimeEverySecond(true);
        this.currentlyPlaying = true;
        this.audio.play();
      } else {
        this.stopAudio();
      }
      this.currentlyStopped = false;
    },
    stopAudio: function() {
      this.audio.pause();
      this.currentlyPlaying = false;
      this.pausedMusic();
    },
    handleEnded: function() {
      if (this.currentSong + 1 == this.musicPlaylist.length) {
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
      } else {
        this.currentlyPlaying = false;
        this.currentSong++;
        this.changeSong();
        this.playAudio();
      }
    },
    getCurrentTimeEverySecond: function(startStop) {
      var localThis = this;
      this.checkingCurrentPositionInTrack = setTimeout(
        function() {
          localThis.currentTime = localThis.audio.currentTime;
          localThis.currentProgressBar =
            (localThis.audio.currentTime / localThis.trackDuration) * 100;
          localThis.getCurrentTimeEverySecond(true);
        }.bind(this),
        1000
      );
    },
    pausedMusic: function() {
      clearTimeout(this.checkingCurrentPositionInTrack);
    },
  },
  watch: {
    currentTime: function() {
      this.currentTime = Math.round(this.currentTime);
    },
  },
  beforeDestroy: function() {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("loadedmetadata", this.handleEnded);
    clearTimeout(this.checkingCurrentPositionInTrack);
  },
};
</script>
<style lang="scss" scoped>
$primary_color: rgba(0, 0, 0, 0.75);
$player_width: 20rem;
$player_padding: 1.5rem;
$player_border_radius: 0.5rem;

$button_size: 2rem;

$anim_duration: 0.5s;

.animated {
  animation-duration: $anim_duration;
}
.audioPlayer {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: $player_padding;
  margin: 0 auto;
  border-radius: $player_border_radius;
  user-select: none;
  background-color: antiquewhite;
  .nav-icon {
    width: 15px;
    height: 12px;

    position: absolute;
    top: ($player_padding)- ($player_padding/4);
    left: $player_padding;

    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    cursor: pointer;

    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: $primary_color;
      border-radius: 6px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.5s ease-in-out;
    }
    span:nth-child(1) {
      top: 0px;
    }

    span:nth-child(2) {
      top: 5px;
    }

    span:nth-child(3) {
      top: 10px;
    }

    &.isActive span:nth-child(1) {
      top: 5px;
      transform: rotate(135deg);
    }

    &.isActive span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }

    &.isActive span:nth-child(3) {
      top: 5px;
      transform: rotate(-135deg);
    }
  }
  .audioPlayerUI {
    margin-top: $player_padding;
    will-change: transform, filter;
    transition: $anim_duration;
    &.isDisabled {
      transform: scale(0.75) translateX(100%);
      filter: blur(5px) grayscale(100%);
    }
    .albumDetails {
      text-align: center;
      p {
        margin: 0px;
        &.title {
          font-size: 1rem;
          color: rgba(0, 0, 0, 1);
        }
        &.artist {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          font-weight: none;
          color: $primary_color;
          transition-delay: 100ms;
        }
      }
    }
    .albumImage {
      width: ($player_width)- ($player_padding * 2);
      height: ($player_width)- ($player_padding * 2);
      overflow: hidden;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        z-index: 10;
        object-fit: cover;
        object-position: 50% 50%;
        border-radius: $player_border_radius;
      }
    }
    .playerButtons {
      position: relative;
      margin: 0 auto;
      text-align: center;

      .button {
        font-size: $button_size;
        display: inline-block;
        vertical-align: middle;
        padding: 0.5rem;
        margin: 0 0.25rem;
        color: rgba(0, 0, 0, 0.75);
        border-radius: 50%;

        outline: 0;
        text-decoration: none;
        cursor: pointer;
        transition: $anim_duration;

        &.play {
          font-size: 2 * $button_size;
          margin: 0 1.5rem;
        }
        &:active {
          opacity: 0.75;
          transform: scale(0.75);
        }
        &.isDisabled {
          color: rgba(0, 0, 0, 0.2);
          cursor: initial;
        }
        &.isDisabled:active {
          transform: none;
        }
      }
    }
    .current-time-container {
      width: 100%;
      height: 1rem;

      display: flex;
      justify-content: space-between;

      .currentTime,
      .totalTime {
        font-size: 0.5rem;
        font-family: monospace;
        color: $primary_color;
      }
    }
  }
}
</style>
