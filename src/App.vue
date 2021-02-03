<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { getAccessToken, hasTokenExpired } from "./utils/cookiesUtils";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();

    if (getAccessToken() && !hasTokenExpired()) {
      store.dispatch("currentUser");
    }
    return {};
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
