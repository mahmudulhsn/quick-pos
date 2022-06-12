<template>
  <tr
    class="
      bg-white
      border-b
      dark:bg-gray-800 dark:border-gray-700
      hover:bg-gray-50
      dark:hover:bg-gray-600
    "
  >
    <!-- <td class="w-4 p-4">{{ product.id }}</td> -->
    <th
      scope="row"
      class="
        px-6
        py-4
        font-medium
        text-gray-900
        dark:text-white
        whitespace-nowrap
      "
    >
      {{ product.name }}
    </th>
    <td class="px-6 py-4">{{ product.price }}</td>
    <td class="px-6 py-4">{{ product.quantity }}</td>
    <td class="px-6 py-4 float-right space-x-3 items-center content-end">
      <button
        class="font-medium text-white py-2 px-3 bg-sky-500 rounded"
        @click.prevent="editProduct(product.id)"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        class="font-medium text-white py-2 px-3 bg-red-500 rounded"
        @click.prevent="deleteProduct(product.id)"
      >
        <i class="fas fa-trash"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    // edit product
    editProduct(productID) {
      this.$store
        .dispatch("getSingleProduct", productID)
        .then((response) => {
          this.eventBus.emit("openEditModal", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // delete product
    deleteProduct(productID) {
      this.$store
        .dispatch("deleteProduct", productID)
        .then((response) => {
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
            title: response.message,
          });
          this.$emit("productDeleted", productID);
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