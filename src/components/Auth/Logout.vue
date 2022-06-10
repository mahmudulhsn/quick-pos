<template>
  <div>Logout</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logout").then((res) => {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: res.message,
      });
      this.$router.push({
        name: "Login",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>