<template>
  <div class="">
    <!-- header starts -->
    <header
      class="w-full fixed top-0 left-0 mb-15 border-b border-b-gray-400 z-40"
    >
      <div class="grid grid-cols-5">
        <div class="logo">
          <RouterLink to="/">
            <img class="w-4/5 mx-auto" src="/src/images/site-logo.png" alt="" />
          </RouterLink>
        </div>
        <div class="col-span-4 bg-white">
          <div class="flex">
            <TopLeftNav />
            <TopRightNav />
          </div>
        </div>
      </div>
    </header>
    <!-- header end -->

    <main class="w-full">
      <div class="grid grid-cols-5">
        <LeftSideBar :user="user" />

        <div class="col-span-4">
          <div class="p-2 mt-16 mb-20">
            <RouterView />
          </div>
        </div>
      </div>
    </main>

    <!-- footer starts -->
    <footer class="w-full fixed bottom-0 left-0">
      <div class="grid grid-cols-5">
        <div class="bg-gray-600"></div>
        <div
          class="
            col-span-4
            bg-gray-700
            h-8
            text-sm text-white
            flex
            items-center
            justify-center
          "
        >
          <p>
            Copyright © 2022
            <RouterLink to="/" class="text-blue-500">Quick POS</RouterLink>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
    <!-- footer end -->
  </div>
</template>

<script>
import TopRightNav from "../components/nav/TopRightNav.vue";
import TopLeftNav from "../components/nav/TopLeftNav.vue";
import LeftSideBar from "../components/nav/LeftSideBar.vue";
import UserInfo from "../components/users/UserInfo.vue";
export default {
  components: { TopRightNav, TopLeftNav, LeftSideBar, UserInfo },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.$store
      .dispatch("getLoginUser")
      .then((res) => {
        this.user = res.data.user;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>