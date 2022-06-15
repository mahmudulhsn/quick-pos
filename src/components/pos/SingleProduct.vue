<template>
  <div class="bg-white rounded py-3 shadow-lg shadow-gray-500/50">
    <div class="product-details pb-5">
      <img class="w-full" :src="product.thumbnail_url" alt="" />
      <h1 class="title text-md font-bold">{{ product.name }}</h1>
      <h1>
        Price:<span class="font-bold"> {{ product.price }}</span>
      </h1>
      <h1>
        Stock:<span class="font-bold"> {{ product.quantity }}</span>
      </h1>
    </div>
    <button
      class="py-2 px-3 bg-blue-500 rounded font-bold text-white"
      @click="addToCart(product)"
    >
      Add to Cart
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    addToCart(product) {
      this.eventBus.emit("addToCart", product);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>