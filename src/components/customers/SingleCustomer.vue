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
      {{ customer.name }}
    </th>
    <td class="px-6 py-4">{{ customer.phone }}</td>
    <td class="px-6 py-4">
      <span v-if="customer.email">{{ customer.email }}</span>
      <span v-else> No email found.</span>
    </td>
    <td class="px-6 py-4 float-right space-x-3 items-center content-end">
      <button
        class="font-medium text-white py-2 px-3 bg-sky-500 rounded"
        @click.prevent="editCustomer(customer.id)"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        class="font-medium text-white py-2 px-3 bg-red-500 rounded"
        @click.prevent="deleteCustomer(customer.id)"
      >
        <i class="fas fa-trash"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
    },
  },

  methods: {
    // edit customer
    editCustomer(customerID) {
      this.$store
        .dispatch("getSingleCustomer", customerID)
        .then((response) => {
          this.eventBus.emit("openEditModal", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // delete customer
    deleteCustomer(customerID) {
      this.$store
        .dispatch("deleteCustomer", customerID)
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
          this.$emit("customerDeleted", customerID);
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