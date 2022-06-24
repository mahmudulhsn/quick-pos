<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-400">
      <div class="flex p-4">
        <div class="relative mt-1 w-1/2">
          <label for="table-search" class="sr-only">Search</label>
          <div
            class="
              absolute
              inset-y-0
              left-0
              flex
              items-center
              pl-3
              pointer-events-none
            "
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-80
              pl-10
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            placeholder="Search for items"
            v-model="search"
          />
        </div>
        <div class="w-1/2">
          <button
            class="
              float-right
              px-5
              py-2
              bg-blue-500
              text-white
              rounded
              hover:bg-indigo-500
              ease-out
              duration-300
            "
            @click="openModal"
          >
            Create new Product
          </button>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
          <tr>
            <!-- <th scope="col" class="p-4">#SL</th> -->
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">Image</th>
            <!-- <th scope="col" class="px-6 py-3">Category</th> -->
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody v-for="(product, index) in filteredProducts" :key="index">
          <SingleProduct :product="product" @productDeleted="deleteProduct" />
        </tbody>
      </table>
    </div>

    <!-- modal -->
    <CreateProduct
      :isOpenModal="isModalOpen"
      @modalClose="closeModal"
      @newProductCreated="createdNewProduct"
    />
    <!-- end model -->

    <!-- edit modal -->
    <EditProduct
      :openEditModal="openEditModal"
      @productUpdated="productUpdated"
    />
    <!-- end edit model -->
  </div>
</template>

<script>
import CreateProduct from "../components/products/CreateProduct.vue";
import SingleProduct from "../components/products/SingleProduct.vue";
import EditProduct from "../components/products/EditProduct.vue";
export default {
  components: {
    CreateProduct,
    SingleProduct,
    EditProduct,
  },
  data() {
    return {
      isModalOpen: false,
      openEditModal: false,
      search: "",
      products: [],
      product: {},
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
  created() {
    this.eventBus.on("openEditModal", (product) => {
      this.product = product.product;
      this.openEditModal = true;
    });
    this.eventBus.on("closeEditModal", () => {
      this.openEditModal = false;
    });
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
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
    createdNewProduct(product) {
      // this.products.push(product);
      this.products.unshift(product);
    },
    productUpdated(updatedProduct) {
      const item = updatedProduct;
      this.products = this.products.map((x) => (x.id === item.id ? item : x));
      // this.products.push(product);
      // this.products.unshift(product);
    },
    deleteProduct(productID) {
      this.products = this.products.filter((data) => data.id != productID);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>