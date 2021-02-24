import {
  getAccessToken,
  hasTokenExpired,
  getRefreshToken
} from "@/utils/cookiesUtils";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "../store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MainScreenPage",
    // component: MainScreenPage
    component: () =>
      import(
        /* webpackChunkName: "mainScreenPage" */ "@/views/MainScreenPage.vue"
      )
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  },
  {
    path: "/artists",
    name: "ArtistsPage",
    component: () =>
      import(/* webpackChunkName: "artists" */ "@/views/ArtistsPage.vue")
  },
  {
    path: "/tracks",
    name: "TracksPage",
    component: () =>
      import(/* webpackChunkName: "tracks" */ "@/views/TracksPage.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (getAccessToken() && !hasTokenExpired()) {
    next();
  } else if (getRefreshToken()) {
    store.dispatch("dispathRefreshToken");
  } else if (to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
