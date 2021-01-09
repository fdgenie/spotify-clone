<template>
  <!-- <aside class="relative h-full w-72 bg-black text-white text-left"> -->
  <div class="border-r flex-grow px-4">
    <div class="pt-6">
      LOGO
    </div>
    <div class="pt-8">
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <div class="pt-4">
        <router-link to="/">Search</router-link>
      </div>
      <div class="pt-4">
        <router-link to="/">Library</router-link>
      </div>
    </div>
    <div class="pt-8">
      Playlist
      <div>
        Create Playlist
      </div>
      <div>
        Songs that you like
      </div>
    </div>
    <hr class="border-gray-700 mt-4" />
    <div class="pt-2" v-for="playlist in playlists" :key="playlist.id">
      {{ playlist.title }}
    </div>
  </div>
  <!-- </aside> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarMenu",
  setup() {
    const playlists = [
      {
        id: 1,
        title: "playlist1"
      },
      {
        id: 2,
        title: "playlist2"
      },
      {
        id: 3,
        title: "playlist4"
      },
      {
        id: 4,
        title: "playlist4"
      },
      {
        id: 5,
        title: "playlist5"
      },
      {
        id: 6,
        title: "playlist6"
      }
    ];

    return { playlists };
  }
});
</script>
