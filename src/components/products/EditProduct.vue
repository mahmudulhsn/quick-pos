<template>
  <div
    v-show="openEditModal"
    class="
      bg-black bg-opacity-50
      fixed
      inset-0
      overflow-hidden
      flex
      justify-center
      items-center
      text-white text-center
      z-50
    "
  >
    <div class="bg-teal-800 px-4 py-6 rounded shadow-2xl">
      <div
        class="
          w-full
          flex
          justify-between
          items-center
          space-x-4
          border-b-2 border-gray-400
          pb-5
        "
      >
        <h4 class="font-bold text-2xl">Edit Product</h4>
        <span
          @click="closeModal"
          class="cursor-pointer px-3 py-1 bg-red-700 rounded hover:bg-red-900"
        >
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>
      <div class="w-full px-5">
        <form @submit.prevent="updateProduct()">
          <!-- input start -->
          <div class="from-group w-full">
            <label for="name" class="w-full align-start">
              <span class="py-2 float-left text-md font-bold"
                >Product Name: *</span
              >
            </label>
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:shadow-outline focus:outline-2
                outline-blue-500/60
              "
              type="text"
              placeholder="Product Name"
              v-model="product.name"
            />
          </div>
          <!-- input end -->

          <!-- input start -->
          <div class="from-group w-full">
            <label for="name" class="w-full align-start">
              <span class="py-2 float-left text-md font-bold"
                >Product Price: *
              </span>
            </label>
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:shadow-outline focus:outline-2
                outline-blue-500/60
              "
              type="text"
              placeholder="Product Price"
              v-model="product.price"
            />
          </div>
          <!-- input end -->

          <!-- input start -->
          <div class="from-group w-full">
            <label for="name" class="w-full align-start">
              <span class="py-2 float-left text-md font-bold"
                >Product Quantity: *
              </span>
            </label>
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:shadow-outline focus:outline-2
                outline-blue-500/60
              "
              type="text"
              placeholder="Product Quantity"
              v-model="product.quantity"
            />
          </div>
          <!-- input end -->

          <!-- button starts -->
          <div
            class="
              from-group
              w-full
              flex
              justify-center
              items-center
              mt-5
              space-x-4
              justify-between
            "
          >
            <button type="reset" class="py-2 px-3 bg-red-500 rounded">
              Cancel
            </button>

            <button type="submit" class="py-2 px-3 bg-blue-500 rounded">
              Update
            </button>
          </div>
          <!-- button ends -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    openEditModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      product: {},
    };
  },
  //   mounted() {
  //     this.getSingleProduct();
  //   },
  created() {
    this.eventBus.on("openEditModal", (productDetails) => {
      this.product = productDetails;
    });
  },
  methods: {
    closeModal() {
      this.eventBus.emit("closeEditModal");
    },
    updateProduct() {
      const updateProductDetails = {
        productID: this.product.id,
        updateInfo: this.product,
      };
      this.$store
        .dispatch("updateProduct", updateProductDetails)
        .then((response) => {
          console.log(response.data);
          this.$emit("productUpdated", response.data.data);
          // this.product = {};

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
            title: response.data.message,
          });

          this.closeModal();
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