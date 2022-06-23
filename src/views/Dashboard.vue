<template>
  <div class="grid grid-cols-4 gap-4 text-center">
    <div class="bg-green-700 h-32 rounded text-white">
      <h1 class="text-lg font-bold mt-5">Total Customer</h1>
      <h1 class="text-3xl font-bold mt-2">
        {{ analyticsData.totalCustomers }}
      </h1>
    </div>

    <div class="bg-teal-800 h-32 rounded text-white">
      <h1 class="text-lg font-bold mt-5">Total Order</h1>
      <h1 class="text-3xl font-bold mt-2">{{ analyticsData.totalOrder }}</h1>
    </div>

    <div class="bg-lime-800 h-32 rounded text-white">
      <h1 class="text-lg font-bold mt-5">Total Sell</h1>
      <h1 class="text-3xl font-bold mt-2">
        {{ analyticsData.totalSell }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      analyticsData: {},
    };
  },
  mounted() {
    this.getAnalytics();
  },

  methods: {
    getAnalytics() {
      this.$store
        .dispatch("getAnalytics")
        .then((response) => {
          this.analyticsData = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>