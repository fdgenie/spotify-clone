<template>
  <div class="ml-8 m-4 text-left font-semibold">
    <div class="text-3xl">
      Your Top Artists
    </div>
    <div
      class="grid grid-cols-3 lg:grid-cols-6 justify-items-center"
      v-if="!loading"
    >
      <div
        v-for="topArtist in topArtists"
        :key="topArtist.id"
        class="text-left mr-5 mt-5 text-white w-100"
      >
        <div
          @click="openModal(topArtist)"
          class="box-border p-2 cursor-pointer"
        >
          <div class="mb-2 col-span-1">
            <img
              class="w-40 rounded-full h-40 m-auto"
              :src="topArtist.images[0].url"
              alt=""
            />
          </div>
          <div>
            <div class="text-center">{{ topArtist.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="animate-spin h-7 w-7 mt-2" viewBox="0 0 24 24">
      <img src="@/assets/loading_spinner.png" alt="" />
    </div>
  </div>
  <div class="ml-8 m-4 text-left font-semibold">
    <div class="text-3xl">
      Your Top Tracks
    </div>
    <div
      class="grid grid-cols-3 lg:grid-cols-6 gap-3 justify-items-center"
      v-if="!loading"
    >
      <div
        v-for="topTrack in topTracks"
        :key="topTrack.id"
        class="text-left mr-5 mt-5 text-white flex"
      >
        <div
          @click="playSong(topTrack)"
          class="cursor-pointer box-border p-2 bg-cards-background hover:bg-cards-background-hover"
        >
          <div class="mb-2">
            <img :src="topTrack.album.images[0].url" alt="" />
          </div>
          <div>
            <div>{{ topTrack.album.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="animate-spin h-7 w-7 mt-2" viewBox="0 0 24 24">
      <img src="@/assets/loading_spinner.png" alt="" />
    </div>
  </div>
  <div class="ml-8 m-4 text-left font-semibold">
    <div class="text-3xl">
      Recent Played
    </div>
    <div
      class="grid grid-cols-3 lg:grid-cols-6 gap-3 justify-items-center"
      v-if="!loading"
    >
      <div
        v-for="recentlyPlayed in recentlyPlayed"
        :key="recentlyPlayed.track.id"
        class="text-left mr-5 mt-5 text-white flex"
      >
        <div
          @click="playSong(recentlyPlayed.track)"
          class="cursor-pointer box-border p-2 bg-cards-background hover:bg-cards-background-hover"
        >
          <div class="mb-2 ">
            <img :src="recentlyPlayed.track.album.images[0].url" alt="" />
          </div>
          <div>
            <div>{{ recentlyPlayed.track.name }}</div>
            <div>{{ recentlyPlayed.track.album.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="animate-spin h-7 w-7 mt-2" viewBox="0 0 24 24">
      <img src="@/assets/loading_spinner.png" alt="" />
    </div>
  </div>
  <TopArtistsDialog
    v-if="isDialogOpen"
    :topArtist="topArtistPick"
    v-model:useStore="isDialogOpen"
  />
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import TopArtistsDialog from "@/components/TopArtistsDialog.vue";

export default defineComponent({
  name: "MainScreenHome",
  components: {
    TopArtistsDialog
  },
  setup() {
    const store = useStore();
    const isDialogOpen = ref(false);
    const topArtistPick = ref(false);

    store.dispatch("recentlyPlayed");
    store.dispatch("topArtists", { limit: 6 });
    store.dispatch("topTracks", { limit: 6 });

    const recentlyPlayed = computed(() => {
      return store.getters.getRecentlyPlayed;
    });

    const topArtists = computed(() => {
      return store.getters.getTopArtists;
    });

    const topTracks = computed(() => {
      return store.getters.getTopTracks;
    });

    const loading = computed(() => {
      return store.getters.getLoading;
    });

    const playSong = (track: unknown) => {
      store.commit("setCurrentTrack", track);
    };

    return {
      recentlyPlayed,
      topArtists,
      topTracks,
      playSong,
      loading,
      isDialogOpen,
      topArtistPick
    };
  },
  methods: {
    openModal(artist: any) {
      this.topArtistPick = artist;
      this.isDialogOpen = true;
    }
  }
});
</script>
