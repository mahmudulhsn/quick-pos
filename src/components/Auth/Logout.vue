<template>
  <div><Loader v-if="loading" /></div>
</template>

<script>
import Loader from "../helper/Loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch("logout").then((res) => {
      this.loading = false;
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