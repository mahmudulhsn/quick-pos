import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      // name: "home",
      component: DashboardLayout,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
          // meta: { middleware: auth },
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/products",
          name: "products",
          component: () => import("../views/ProductsView.vue"),
        },
      ],
    },
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Login.vue"),
          // meta: { middleware: guest },
        },
        {
          path: "/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Register.vue"),
          // meta: { middleware: guest },
        },
        // {
        //   path: "/password/reset",
        //   name: "PasswordReset",
        //   component: PasswordReset,
        //   meta: { middleware: guest },
        // },
        // {
        //   path: "/password/email",
        //   name: "PasswordEmail",
        //   component: PasswordEmail,
        //   meta: { middleware: guest },
        // },
      ],
    },
  ],
});

export default router;
