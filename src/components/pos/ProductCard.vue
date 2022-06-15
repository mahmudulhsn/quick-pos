<template>
  <div class="w-4/6 bg-gray-200 shadow-xl rounded">
    <div class="mx-2">
      <div
        class="
          product-title
          py-3
          border-b-2 border-gray-500
          flex
          justify-between
        "
      >
        <h1 class="text-center font-bold text-xl">
          All Products ({{ products.length }})
        </h1>
        <div class="text-center">
          <input
            type="text"
            placeholder="Search here..."
            class="
              appearance-none
              border
              rounded
              w-full
              py-1
              px-3
              text-gray-700
              leading-tight
              focus:shadow-outline focus:outline-2
              outline-blue-500/60
            "
            v-model="search"
          />
        </div>
      </div>
      <div
        class="
          product-details
          my-3
          grid
          lg:grid-cols-3 lg:gap-3
          md:grid-cols-2 md:gap-2
          sm:grid-cols-2 sm:gap-2
          text-center
        "
      >
        <div v-for="(product, index) in filteredProducts" :key="index">
          <!-- single product -->
          <SingleProduct :product="product" />
          <!-- single product -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleProduct from "./SingleProduct.vue";
export default {
  components: { SingleProduct },
  data() {
    return {
      search: "",
      products: [],
    };
  },

  mounted() {
    this.getAllProducts();
  },

  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    getAllProducts() {
      this.$store
        .dispatch("getProducts")
        .then((response) => {
          this.products = response.data;
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