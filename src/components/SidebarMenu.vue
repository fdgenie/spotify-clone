<template>
  <div class="pt-8">
    <div>
      <button class="outline-none" @click="changeCurrentScreen('Home')">
        Home
      </button>
    </div>
    <div class="pt-4">
      <button @click="changeCurrentScreen('TopArtists')">Top Artists</button>
    </div>
    <div class="pt-4">
      <button @click="changeCurrentScreen('TopTracks')">Top Tracks</button>
    </div>
  </div>
  <hr class="border-gray-700 mt-4" />
  <div class="pt-8 text-2xl underline text-gray-400">
    Playlists
  </div>
  <div class="pt-2" v-for="playlist in playlists" :key="playlist.id">
    {{ playlist.name }}
  </div>
</template>

<script lang="ts">
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

    return { playlists, changeCurrentScreen };
  }
});
</script>
