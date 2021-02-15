import {
  getAccessToken,
  hasTokenExpired,
  refreshToken,
  getRefreshToken
} from "@/utils/cookiesUtils";
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  useRoute
} from "vue-router";

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
    path: "/callback",
    name: "Callback",
    component: () =>
      import(/* webpackChunkName: "callback" */ "@/views/Callback.vue")
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
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(getAccessToken());
  if (getAccessToken() && !hasTokenExpired()) {
    next();
  } else if (getRefreshToken()) {
    refreshToken();
  } else if (to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
