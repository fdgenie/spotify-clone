<template>
  <div class="overflow-y-auto z-30 inset-0 fixed">
    <div
      class="bg-black bg-opacity-75 min-h-screen flex flex-col justify-center align-middle place-items-center"
    >
      <div class="box-border w-1/2 bg-black p-3">
        <div class="grid grid-rows-2 gap-2">
          <div class="grid grid-cols-2 gap-1">
            <div class="flex flex-col ml-4 place-items-start gap-2">
              <img class="w-52 h-52" :src="artistInfo.info.images[0].url" />
              <div class="text-2xl font-semibold">
                {{ artistInfo.info.name }}
              </div>
              <div class="text-left">
                {{ artistInfo.info.genres.join(", ") }}
              </div>
              <div>
                <span class="font-semibold">
                  Followers:
                </span>
                <span>
                  {{ artistInfo.info.followers.total }}
                </span>
              </div>
            </div>
            <div>
              <div class="flex flex-row">
                <div class="flex-auto mb-3 text-2xl font-semibold">
                  Top Tracks
                </div>
                <button
                  class="hover:text-gray-400 focus:outline-none"
                  @click="$emit('update:useStore', false)"
                >
                  <svg
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
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <div class="text-left">
                <div
                  v-for="topTrack in artistInfo.topTracks"
                  :key="topTrack.id"
                >
                  <span class="text-md font-medium">
                    {{ topTrack.name }}
                  </span>
                  - {{ topTrack.album.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mb-4 font-semibold text-2xl">
              Related Artists
            </div>
            <div class="grid grid-cols-3 lg:grid-cols-6 gap-3">
              <div
                v-for="relatedArist in artistInfo.relatedArtists"
                :key="relatedArist.id"
                class="flex flex-row "
              >
                <div class="flex flex-col gap-2">
                  <div>
                    <img
                      class="w-40 rounded-full h-40 m-auto"
                      :src="relatedArist.images[0].url"
                      alt=""
                    />
                  </div>
                  <div>
                    {{ relatedArist.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TopArtistsDialog",
  props: {
    topArtist: {
      type: Object,
      required: true
    },
    isDialogOpen: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    store.commit("setArtistInfo", props.topArtist);
    store.dispatch("artistTopTracks", { artistId: props.topArtist.id });
    store.dispatch("artistRelatedArists", { artistId: props.topArtist.id });

    const loading = computed(() => {
      return store.getters.getLoading;
    });

    const artistInfo = computed(() => {
      return store.getters.getArtistInfo;
    });

    return { artistInfo, loading };
  }
});
</script>
