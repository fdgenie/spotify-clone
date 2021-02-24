<template>
  <div class="flex flex-col">
    <div class="pt-5">
      <button
        class="focus:outline-none focus:underline focus:text-gray-300"
        @click="changeCurrentScreen('Home')"
      >
        Home
      </button>
      <div class="pt-2">
        <button
          class="focus:outline-none focus:underline focus:text-gray-300"
          @click="changeCurrentScreen('TopArtists')"
        >
          Top Artists
        </button>
      </div>
      <div class="pt-2 ">
        <button
          class="focus:outline-none focus:underline focus:text-gray-300"
          @click="changeCurrentScreen('TopTracks')"
        >
          Top Tracks
        </button>
      </div>
    </div>
    <hr class="border-gray-700 my-4" />
    <div>
      <div class="text-2xl underline text-gray-400">
        Playlists
      </div>
      <div class="pt-2" v-for="playlist in playlists" :key="playlist.id">
        {{ playlist.name }}
      </div>
    </div>
    <div class="absolute bottom-0 pb-4">
      <button
        class="focus:outline-none focus:underline focus:text-gray-300"
        @click="logout()"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { logout } from "@/utils/cookiesUtils";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SidebarMenu",
  setup() {
    const store = useStore();

    const playlists = computed(() => store.getters.getPlaylists);

    const changeCurrentScreen = (screen: string) => {
      store.commit("setCurrentMainScreen", screen);
    };

    return { playlists, changeCurrentScreen, logout };
  }
});
</script>
