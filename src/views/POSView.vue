<template>
  <div>
    <div class="flex w-full space-x-2">
      <!-- cart Card -->
      <CartCard />
      <!-- Cart Card -->

      <!-- products card -->
      <ProductCard />
      <!-- products card -->
    </div>
  </div>
</template>

<script>
import CartCard from "../components/pos/CartCard.vue";
import ProductCard from "../components/pos/ProductCard.vue";
export default {
  components: { CartCard, ProductCard },
};
</script>
<style lang="scss" scoped>
</style>