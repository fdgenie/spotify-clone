<template>
  <!-- <div class="grid grid-cols-6 grid-rows-6 h-screen grid-flow-row-dense">
    <aside
      class="relative col-span-1 row-span-5 h-auto bg-black text-white text-left"
    >
      <SidebarMenu />
    </aside>
    <main class="md:col-span-5 md:row-span-5 col-span-6 row-span-6">
      test
    </main>
    <footer class="col-span-6 bg-gray-700">
      <PlaylistFooter />
    </footer>
  </div> -->
  <div class="h-screen grid grid-cols-12">
    <aside class="relative col-span-2 bg-black text-white text-left">
      <SidebarMenu />
    </aside>
    <main
      style="background-color: #121212"
      class="col-span-10 bg-gray-700 text-white"
    >
      <MainScreenHome />
    </main>
    <footer
      style="background-color: #282828"
      class="col-span-12 h-auto absolute inset-x-0 bottom-0"
    >
      <PlaylistFooter />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import PlaylistFooter from "@/components/PlaylistFooter.vue";
import MainScreenHome from "@/components/MainScreenHome.vue";

export default defineComponent({
  name: "MainScreenPage",
  components: {
    SidebarMenu,
    PlaylistFooter,
    MainScreenHome
  }
});
</script>
