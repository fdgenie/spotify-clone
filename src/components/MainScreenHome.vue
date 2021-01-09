<template>
  <div
    v-for="shortCut in shortCuts"
    :key="shortCut.id"
    class="flex flex-row text-left ml-5 mt-5"
  >
    <div class="mb-2 text-2xl">{{ shortCut.title }}</div>
    <div
      v-for="musicList in shortCut.musicLists"
      :key="musicList.id"
      class="flex flex-row"
      style="background-color:#131313"
    >
      <div>{{ musicList.bandAlbum }}</div>
      <div>{{ musicList.bandName }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainScreenHome",
  setup() {
    const shortCuts = {
      id: 1,
      title: "Shortcuts",
      musicLists: [
        {
          id: 1,
          bandName: "Year Of No Light",
          bandAlbum: "Nord"
        },
        {
          id: 2,
          bandName: "God is an astronaut",
          bandAlbum: "Burial"
        },
        {
          id: 3,
          bandName: "Gleemer",
          bandAlbum: "Anymore"
        }
      ]
    };

    const listenRecently = {
      id: 2,
      title: "Listen Recently",
      musicLists: [
        {
          id: 1,
          bandName: "Hidden Mothers",
          bandAlbum: "Hidden Mothers EP"
        },
        {
          id: 2,
          bandName: "Holy Fawn",
          bandAlbum: "The Black Moon"
        },
        {
          id: 3,
          bandName: "Holy Fawn",
          bandAlbum: "Death Spells"
        }
      ]
    };
    return { shortCuts, listenRecently };
  }
});
</script>
