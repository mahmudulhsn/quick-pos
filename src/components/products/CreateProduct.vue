<template>
  <div
    v-show="isOpenModal"
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
          <h4 class="font-bold text-2xl">Create New Product</h4>
          <span
            @click="closeModal"
            class="cursor-pointer px-3 py-1 bg-red-700 rounded hover:bg-red-900"
          >
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div class="w-full px-5">
          <form
            method="post"
            @submit.prevent="addProduct"
            enctype="multipart/form-data"
          >
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
                Submit
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
export default {
  props: {
    isOpenModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      product: {
        name: "",
        price: "",
        quantity: "",
        image: null,
      },
      preview: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("modalClose");
    },
    addProduct() {
      let formData = new FormData();
      formData.append("image", this.product.image);
      formData.append("name", this.product.name);
      formData.append("price", this.product.price);
      formData.append("quantity", this.product.quantity);
      this.$store
        .dispatch("createProduct", formData)
        .then((response) => {
          this.$emit("newProductCreated", response);
          this.product = {};
          this.closeModal();
          this.reset();

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
            title: "Product Added Successfully",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
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