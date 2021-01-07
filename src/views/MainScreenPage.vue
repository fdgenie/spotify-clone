<template>
  <div class="flex flex-row overflow-hidden">
    <aside class="relative h-auto w-1/6 bg-black text-white text-left">
      <SidebarMenu />
    </aside>
    <div class="w-5/6 h-5/6">
      test
    </div>
    <div class="absolute inset-x-0 bottom-0 h-auto bg-gray-700">
      <PlaylistFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import PlaylistFooter from "@/components/PlaylistFooter.vue";

export default defineComponent({
  name: "MainScreenPage",
  components: {
    SidebarMenu,
    PlaylistFooter
  }
});
</script>
