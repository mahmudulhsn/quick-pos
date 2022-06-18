import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      meta: {
        requiresAuth: true,
      },
      component: DashboardLayout,
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: () => import("../views/Dashboard.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/about",
          name: "About",
          component: () => import("../views/AboutView.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/customers",
          name: "Customers",
          component: () => import("../views/CustomersView.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/products",
          name: "Products",
          component: () => import("../views/ProductsView.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/pos",
          name: "POS",
          component: () => import("../views/POSView.vue"),
          meta: {
            requiresAuth: true,
          },
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
          name: "Login",
          component: () => import("../views/Login.vue"),
          meta: {
            guest: true,
          },
        },
        {
          path: "/logout",
          name: "Logout",
          component: () => import("../components/Auth/Logout.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/register",
          name: "Register",
          component: () => import("../views/Register.vue"),
          meta: {
            guest: true,
          },
        },
        // {
        //   path: "/password/reset",
        //   name: "PasswordReset",
        //   component: PasswordReset,
        //   meta: {
        //     requiresAuth: true,
        //   },
        // },
        // {
        //   path: "/password/email",
        //   name: "PasswordEmail",
        //   component: PasswordEmail,
        //   meta: {
        //     requiresAuth: true,
        //   },
        // },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    return {
      name: "Login",
    };
  }
  if (to.meta.guest && store.getters.isLoggedIn) {
    return {
      name: "Dashboard",
    };
  }
});

export default router;
