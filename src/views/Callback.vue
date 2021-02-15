<template>
  <div
    class="h-screen text-white content-center flex flex-col justify-center"
    style="background-color:#121212"
  >
    <div>
      <button class="h-10 w-40 border-2 border-gray-500 hover:text-green-400">
        <a href="http://localhost:9000/.netlify/functions/api">
          ALMSOST to Spotify</a
        >
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    window.localStorage.setItem("mytime", "dsds");
    localStorage.setItem("mytime", "dsds");
    const route = useRoute();

    console.log(route.query);
    // const login = async () => {
    //   await store.dispatch("login").then(() => {
    //     console.log("tete");
    //   });
    // };
    // return { login };
  }
});
</script>
