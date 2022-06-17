<template>
  <div
    v-show="openEditModal"
    class="
      bg-black bg-opacity-50
      fixed
      inset-0
      overflow-x-hidden
      justify-center
      items-center
      text-white text-center
      z-50
    "
  >
    <div class="w-1/2 mx-auto mt-10">
      <div class="bg-gray-800 px-4 py-6 rounded shadow-2xl">
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
          <form @submit.prevent="updateProduct()" enctype="multipart/form-data">
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
              <!-- error message -->
              <ErrorMessage v-if="nameValidation" :message="nameValidation" />
              <!-- error message -->
            </div>
            <!-- input end -->

            <!-- input start -->
            <div class="from-group w-full">
              <label for="name" class="w-full align-start">
                <span class="py-2 float-left text-md font-bold"
                  >Product Image: *
                </span>
              </label>
              <input
                ref="product_image"
                type="file"
                accept="image/*"
                @change="previewImage"
                class="
                  bg-white
                  appearance-none
                  border
                  text-white
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:shadow-outline focus:outline-2
                  outline-blue-500/60
                "
                id="my-file"
              />

              <div class="col-md-5 offset-md-1">
                <div class="form-group">
                  <div class="border p-2 mt-3">
                    <p class="mb-2">
                      Preview Here:
                      <span
                        v-if="preview"
                        @click="reset"
                        class="cursor-pointer bg-red-800 rounded px-2 py-1"
                        >Clear</span
                      >
                    </p>
                    <span v-if="preview">
                      <img :src="preview" class="img-fluid" />
                    </span>
                  </div>
                </div>
              </div>
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
              <!-- error message -->
              <ErrorMessage v-if="priceValidation" :message="priceValidation" />
              <!-- error message -->
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
              <!-- error message -->
              <ErrorMessage
                v-if="quantityValidation"
                :message="quantityValidation"
              />
              <!-- error message -->
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

              <button
                type="submit"
                class="py-2 px-3 bg-blue-500 rounded"
                :class="{ 'bg-gray-500': !isValidated }"
                :disabled="!isValidated"
              >
                Update
              </button>
            </div>
            <!-- button ends -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "../validation/ErrorMessage.vue";
export default {
  components: {
    ErrorMessage,
  },
  props: {
    openEditModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      product: {
        id: "",
        name: "",
        price: "",
        quantity: "",
        image: null,
      },
      preview: null,
      errors: {},
    };
  },
  computed: {
    nameValidation() {
      if (this.product.name == "" || this.product.name == null) {
        this.errors.name = "Name field is required!";
      } else {
        this.errors.name = null;
      }

      return this.errors.name;
    },

    priceValidation() {
      if (this.product.price == "" || this.product.price == null) {
        this.errors.price = "Price field is required!";
      } else if (isNaN(this.product.price)) {
        this.errors.price = "Price field must be a number!";
      } else {
        this.errors.price = null;
      }
      return this.errors.price;
    },

    quantityValidation() {
      if (this.product.quantity == "" || this.product.quantity == null) {
        this.errors.quantity = "Quantity field is required!";
      } else if (isNaN(this.product.quantity)) {
        this.errors.quantity = "Quantity field must be a number!";
      } else {
        this.errors.quantity = null;
      }
      return this.errors.quantity;
    },

    isValidated() {
      if (
        this.errors.quantity === null &&
        this.errors.price === null &&
        this.errors.name === null
      ) {
        this.errors = {};
      }
      const isEmpty = Object.keys(this.errors).length === 0;

      return isEmpty;
    },
  },
  //   mounted() {
  //     this.getSingleProduct();
  //   },
  created() {
    this.eventBus.on("openEditModal", (productDetails) => {
      this.product.id = productDetails.id;
      this.product.name = productDetails.name;
      this.product.price = productDetails.price;
      this.product.quantity = productDetails.quantity;
      this.preview = productDetails.thumbnail_url;
    });
  },
  methods: {
    // validation
    // validated() {
    //   if (
    //     this.errors.quantity === null &&
    //     this.errors.price === null &&
    //     this.errors.name === null
    //   ) {
    //     this.errors = {};
    //   }
    //   const isEmpty = Object.keys(this.errors).length === 0;

    //   return isEmpty;
    // },

    // close modal
    closeModal() {
      this.eventBus.emit("closeEditModal");
    },

    // update product
    updateProduct() {
      // if (this.validated()) {
      const formData = new FormData();
      formData.append("image", this.product.image);
      formData.append("name", this.product.name);
      formData.append("price", this.product.price);
      formData.append("quantity", this.product.quantity);
      formData.append("_method", "put");

      const updateProductDetails = {
        productID: this.product.id,
        updateInfo: formData,
      };

      this.$store
        .dispatch("updateProduct", updateProductDetails)
        .then((response) => {
          this.$emit("productUpdated", response.data.data);
          // this.product = {};
          this.reset();
          this.closeModal();

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
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },

    // image preview
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.product.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    // reset
    reset() {
      this.product.image = null;
      this.preview = null;
      this.$refs.product_image.value = null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>