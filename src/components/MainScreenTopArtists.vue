<template>
  <div class="ml-8 m-4 text-left font-semibold">
    <div class="text-3xl">
      Your Top Artists
    </div>
    <div
      class="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-5 justify-items-center"
      v-if="!loading"
    >
      <div
        v-for="topArtist in topArtists"
        :key="topArtist.id"
        class="text-left mr-5 mt-5 text-white w-100 flex"
      >
        <div class="box-border p-2">
          <div
            @click="openModal(topArtist)"
            class="box-border p-2 cursor-pointer"
          >
            <div class="mb-2 col-span-1">
              <img
                class="w-60 rounded-full h-60"
                :src="topArtist.images[0].url"
                alt=""
              />
            </div>
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
  <TopArtistsDialog
    v-if="isDialogOpen"
    :topArtist="topArtistPick"
    v-model:useStore="isDialogOpen"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TopArtistsDialog from "@/components/TopArtistsDialog.vue";

export default defineComponent({
  name: "MainScreenTopArtists",
  components: {
    TopArtistsDialog
  },
  setup() {
    const store = useStore();
    const isDialogOpen = ref(false);
    const topArtistPick = ref(false);

    store.dispatch("topArtists", { limit: 18 });

    const loading = computed(() => {
      return store.getters.getLoading;
    });

    const topArtists = computed(() => {
      return store.getters.getTopArtists;
    });
    return { topArtists, loading, isDialogOpen, topArtistPick };
  },
  methods: {
    openModal(artist: any) {
      this.topArtistPick = artist;
      this.isDialogOpen = true;
    }
  }
});
</script>
