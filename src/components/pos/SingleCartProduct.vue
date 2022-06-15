<template>
  <div class="single-cart shadow-md bg-slate-100 rounded py-3 my-3 relative">
    <span
      class="
        absolute
        top-0
        right-0
        px-2
        bg-red-600
        rounded
        text-white
        cursor-pointer
      "
      @click="removeFromCart(product)"
      ><i class="fa-solid fa-xmark"></i
    ></span>
    <h5 class="text-center py-1 text-lg text-bold my-1">{{ product.name }}</h5>
    <div class="md:flex space-x-2 mx-2">
      <div class="md:w-2/5 flex space-x-2 sm:w-full">
        <div
          class="py-1 px-3 bg-gray-300 rounded cursor-pointer font-bold"
          @click="removeQuantityFromCart(product)"
        >
          -
        </div>
        <div class="py-1">{{ product.quantity }}</div>
        <div
          class="py-1 px-3 bg-gray-300 rounded cursor-pointer font-bold"
          @click="addQuantityToCart(product)"
        >
          +
        </div>
      </div>
      <div class="md:w-1/5 text-center py-1 font-bold sm:w-full">X</div>
      <div class="md:w-2/5 bg-gray-300 mr-2 rounded sm:w-full">
        <div class="text-right mr-2 py-1 font-bold sm:text-center">
          {{ product.price }}
        </div>
      </div>
    </div>
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
    addQuantityToCart(product) {
      this.eventBus.emit("addToCart", product);
    },

    removeQuantityFromCart(product) {
      this.$emit("removeQuantityFromCart", product);
    },

    removeFromCart(product) {
      this.$emit("remove", product);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>