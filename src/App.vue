<template>
  <RouterView />
</template>

<script>
import TopRightNav from "./components/nav/TopRightNav.vue";
import TopLeftNav from "./components/nav/TopLeftNav.vue";
import LeftSideBar from "./components/nav/LeftSideBar.vue";
import UserInfo from "./components/users/UserInfo.vue";
export default {
  components: { TopRightNav, TopLeftNav, LeftSideBar, UserInfo },
};
</script>

<style>
</style>