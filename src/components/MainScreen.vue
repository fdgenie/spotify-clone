<template>
  <MainScreenHome v-if="currentMainScreen === 'Home'" />
  <MainScreenTopTracks v-if="currentMainScreen === 'TopTracks'" />
  <MainScreenTopArtists v-if="currentMainScreen === 'TopArtists'" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import MainScreenHome from "@/components/MainScreenHome.vue";
import MainScreenTopTracks from "@/components/MainScreenTopTracks.vue";
import MainScreenTopArtists from "@/components/MainScreenTopArtists.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainScreen",
  components: { MainScreenHome, MainScreenTopTracks, MainScreenTopArtists },
  setup() {
    const store = useStore();

    const currentMainScreen = computed(() => {
      //TODO take the album image and track title from recently played
      return store.getters.getCurrentMainScreen;
    });

    return { currentMainScreen };
  }
});
</script>
