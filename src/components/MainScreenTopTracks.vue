<template>
  <div class="ml-8 m-4 text-left font-semibold">
    <div class="text-3xl">
      Your Top Tracks
    </div>
    <div
      class="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-5 justify-items-center"
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
          <div class="mb-2 col-span-1">
            <img class="w-60 h-60" :src="topTrack.album.images[0].url" alt="" />
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
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MainScreenTopTracks",
  setup() {
    const store = useStore();

    store.dispatch("topTracks", { limit: 18 });

    const topTracks = computed(() => {
      return store.getters.getTopTracks;
    });

    const loading = computed(() => {
      return store.getters.getLoading;
    });

    const playSong = (track: unknown) => {
      store.commit("setCurrentTrack", track);
    };
    return { topTracks, playSong, loading };
  }
});
</script>
