<template>
  <div class="font-sans h-screen grid grid-cols-12 ">
    <aside
      class="relative md:col-span-2 col-span-4 bg-black text-white text-left px-4"
    >
      <SidebarMenu />
    </aside>

    <main
      style="background-color: #121212"
      class="md:col-span-10 col-span-8 bg-gray-700 text-white overflow-y-auto"
    >
      <MainScreen />
    </main>

    <footer
      style="background-color: #282828"
      class="col-span-12 inset-x-0 bottom-0"
    >
      <PlaylistFooter />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import PlaylistFooter from "@/components/PlaylistFooter.vue";
import MainScreen from "@/components/MainScreen.vue";

export default defineComponent({
  name: "MainScreenPage",
  components: {
    SidebarMenu,
    PlaylistFooter,
    MainScreen
  },
  setup() {
    return {};
  }
});
</script>
