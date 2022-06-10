<template>
  <div>Logout</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logout").then(() => {
      this.$router.push({
        name: "Login",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>