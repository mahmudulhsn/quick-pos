<template>
  <div
    v-show="isOpenModal"
    class="
      bg-black bg-opacity-50
      absolute
      inset-0
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
        <h4 class="font-bold text-2xl">Create New Product</h4>
        <span
          @click="closeModal"
          class="cursor-pointer px-3 py-1 bg-red-700 rounded hover:bg-red-900"
        >
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>
      <div class="w-full px-5">
        <form action="" method="post">
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
</template>

<script>
export default {
  props: {
    isOpenModal: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("modalClose");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>