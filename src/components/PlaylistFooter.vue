<template>
  <div class="grid grid-cols-3 text-white my-3 mx-5">
    <div>
      <div
        class="flex flex-row place-items-center space-x-5"
        v-if="currentTrack"
      >
        <img
          style="width:70px"
          :src="currentTrack.album.images[0].url"
          alt="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
        />
        <div class="flex flex-col text-left">
          <div>{{ currentTrack.name }}</div>
          <div>{{ currentTrack.artists[0].name }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div>
        <button @click="playOrPause" class="focus:outline-none">
          <svg
            v-if="!playTrack"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-9"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-9"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <div>
          <audio autoplay ref="audioPlayer">
            <source :src="currentTrack.preview_url" type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <div
        class="flex flex-row justify-center place-items-center space-x-2 text-sm"
      >
        <div>0:{{ secondsInSong >= 10 ? "" : "0" }}{{ secondsInSong }}</div>
        <div
          class="bg-gray-600 h-2 w-full rounded-xl flex flex-row place-items-center"
        >
          <div
            ref="progressBar"
            class="bg-gray-400 h-2 rounded-xl flex flex-row place-items-center"
          />
          <!-- <button
            ref="progressBarTrackerIcon"
            class="bg-gray-300 w-5 h-5 rounded-xl focus:outline-none"
            style="transform:translateX(-10%)"
          /> -->
        </div>
        <div>0:30</div>
      </div>
    </div>
    <!-- <div class="flex flex-row justify-end place-items-center space-x-2 ">
      <button @click="muteAudio" class="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clip-rule="evenodd"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      </button>
      <div>volume slider</div>
      <button @click="muteAudio">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clip-rule="evenodd"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      </button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PlaylistFooter",
  setup() {
    const store = useStore();
    const playTrack = ref(false);
    const audioPlayer = ref();
    const progressBar = ref();
    // const progressBarTrackerIcon = ref();
    const currentTrack = computed(() => store.getters.getCurrentTrack);
    const progressBarTracker = ref(0);
    const secondsInSong = ref(0);
    let playInterval = 0;
    let progressBarInterval = 0;

    const muteAudio = () => {
      audioPlayer.value.volume = 0;
    };

    const songTimer = () => {
      secondsInSong.value++;
      if (secondsInSong.value === 30) {
        clearInterval(playInterval);
        clearInterval(progressBarInterval);
        progressBarTracker.value = 0;
        secondsInSong.value = 0;
        playTrack.value = false;
      }
    };

    const progressBarMove = () => {
      progressBar.value.style.width = `${(progressBarTracker.value++ + 1) *
        0.333}%`;
      // progressBarTrackerIcon.value.style.transform = `translateX(${progressBar.value.style.width}%)`;
    };

    const playOrPause = () => {
      playTrack.value = !playTrack.value;
      if (playTrack.value) {
        audioPlayer.value.play();
      } else {
        audioPlayer.value.pause();
      }
    };

    watch(currentTrack, (newVal, oldVal) => {
      if (!oldVal) {
        playTrack.value = true;
        audioPlayer.value.src = newVal.preview_url;
        audioPlayer.value.play();
        playInterval = setInterval(() => {
          if (playTrack.value) {
            songTimer();
          }
        }, 1000);
        progressBarInterval = setInterval(() => {
          if (playTrack.value) {
            progressBarMove();
          }
        }, 100);
      } else {
        playTrack.value = true;
        clearInterval(playInterval);
        clearInterval(progressBarInterval);
        progressBar.value.style.width = "0";
        progressBarTracker.value = 0;
        secondsInSong.value = 0;
        audioPlayer.value.pause();
        audioPlayer.value.src = newVal.preview_url;
        audioPlayer.value.play();
        playInterval = setInterval(() => {
          if (playTrack.value) {
            songTimer();
          }
        }, 1000);
        progressBarInterval = setInterval(() => {
          if (playTrack.value) {
            progressBarMove();
          }
        }, 100);
      }
    });

    return {
      currentTrack,
      playTrack,
      audioPlayer,
      muteAudio,
      progressBarTracker,
      playOrPause,
      progressBar,
      // progressBarTrackerIcon,
      secondsInSong
    };
  }
});
</script>
