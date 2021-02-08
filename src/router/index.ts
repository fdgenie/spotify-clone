import {
  getAccessToken,
  hasTokenExpired,
  refreshToken
} from "@/utils/cookiesUtils";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (getAccessToken() && !hasTokenExpired()) {
    next();
  } else {
    refreshToken();
  }
  if (to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
