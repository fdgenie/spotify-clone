<template>
  <div
    class="h-screen text-white content-center flex flex-col justify-center"
    style="background-color:#121212"
  >
    <div>
      <button
        class="h-10 w-40 border-2 border-gray-500 hover:text-green-400"
        @click="login"
      >
        Login to Spotify
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const login = async () => {
      await store.dispatch("login");
    };
    return { login };
  }
});
</script>
