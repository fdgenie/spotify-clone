<template>
  <div
    v-for="playList in playLists"
    :key="playList.id"
    class="flex flex-col text-left ml-5 mt-5 text-white"
  >
    <div class="mb-2 text-2xl">{{ playList.title }}</div>
    <div class="flex flex-row space-x-5">
      <div
        v-for="musicList in playList.musicLists"
        :key="musicList.id"
        class="flex flex-row"
        style="background-color:#131313"
      >
        <div class="flex flex-col">
          <div>{{ musicList.bandAlbum }}</div>
          <div>{{ musicList.bandName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainScreenHome",
  setup() {
    const playLists = [
      {
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
      },
      {
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
      }
    ];

    return { playLists };
  }
});
</script>
