import { hasTokenExpired, setAccessToken } from "@/utils/cookiesUtils";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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
    path: "/library",
    name: "LibraryPage",
    component: () =>
      import(/* webpackChunkName: "library" */ "@/views/LibraryPage.vue")
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
  if (setAccessToken() && !hasTokenExpired()) {
    next();
    return;
  } else {
    //TODO refresh token
  }
  if (to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
